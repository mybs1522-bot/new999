/**
 * Shopify Admin API Service with Auto-Refreshing 24-Hour Token Management
 * Store: sskebe-j9.myshopify.com
 */

const SHOPIFY_SHOP = (import.meta as any).env?.VITE_SHOPIFY_SHOP || 'sskebe-j9.myshopify.com';
const SHOPIFY_CLIENT_ID = (import.meta as any).env?.VITE_SHOPIFY_CLIENT_ID || '';
const SHOPIFY_CLIENT_SECRET = (import.meta as any).env?.VITE_SHOPIFY_CLIENT_SECRET || '';
const API_VERSION = '2024-04';

let cachedToken: string | null = null;
let tokenExpiresAt = 0;

/**
 * Automatically retrieves or refreshes the 24-hour Admin API access token using client_credentials grant.
 */
export async function getShopifyAccessToken(): Promise<string> {
  const now = Date.now();

  // Return cached token if valid (with 5-minute safety margin)
  if (cachedToken && now < tokenExpiresAt - 5 * 60 * 1000) {
    return cachedToken;
  }

  const response = await fetch(`https://${SHOPIFY_SHOP}/admin/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: SHOPIFY_CLIENT_ID,
      client_secret: SHOPIFY_CLIENT_SECRET,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Shopify Token Exchange Failed (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  cachedToken = data.access_token;
  tokenExpiresAt = now + (data.expires_in || 86400) * 1000;

  return cachedToken;
}

/**
 * Execute a Shopify GraphQL query or mutation
 */
export async function shopifyGraphQL<T = any>(query: string, variables: Record<string, any> = {}): Promise<T> {
  const token = await getShopifyAccessToken();

  const response = await fetch(`https://${SHOPIFY_SHOP}/admin/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Shopify GraphQL Request Failed (${response.status}): ${errorText}`);
  }

  const result = await response.json();
  if (result.errors && result.errors.length > 0) {
    throw new Error(`Shopify GraphQL Error: ${JSON.stringify(result.errors)}`);
  }

  return result.data;
}

/**
 * Fetch Shop Details
 */
export async function getShopDetails() {
  const query = `
    query {
      shop {
        id
        name
        email
        myshopifyDomain
        currencyCode
        plan {
          displayName
        }
      }
    }
  `;
  const data = await shopifyGraphQL(query);
  return data.shop;
}

/**
 * Create a Customer in Shopify
 */
export async function createShopifyCustomer(customer: {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  note?: string;
}) {
  const mutation = `
    mutation customerCreate($input: CustomerInput!) {
      customerCreate(input: $input) {
        customer {
          id
          firstName
          lastName
          email
          phone
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  return await shopifyGraphQL(mutation, { input: customer });
}

/**
 * Create an Order in Shopify when course/report is purchased
 */
export async function createShopifyOrder(orderData: {
  customerEmail: string;
  customerPhone?: string;
  customerName?: string;
  lineItems: Array<{ title: string; price: string; quantity: number }>;
  paymentReference?: string;
  totalPrice: string;
}) {
  const nameParts = (orderData.customerName || '').split(' ');
  const firstName = nameParts[0] || 'Seeker';
  const lastName = nameParts.slice(1).join(' ') || '';

  const token = await getShopifyAccessToken();
  const restResponse = await fetch(`https://${SHOPIFY_SHOP}/admin/api/${API_VERSION}/orders.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': token,
    },
    body: JSON.stringify({
      order: {
        email: orderData.customerEmail,
        phone: orderData.customerPhone,
        financial_status: 'paid',
        tags: 'astrology-report, website-direct',
        customer: {
          first_name: firstName,
          last_name: lastName,
          email: orderData.customerEmail,
          phone: orderData.customerPhone,
        },
        line_items: orderData.lineItems.map(item => ({
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
        transactions: orderData.paymentReference ? [
          {
            kind: 'sale',
            status: 'success',
            amount: orderData.totalPrice,
            gateway: 'razorpay',
            authorization: orderData.paymentReference,
          }
        ] : [],
      }
    }),
  });

  return await restResponse.json();
}
