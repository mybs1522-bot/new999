import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const META_CAPI_TOKEN = Deno.env.get('META_CAPI_TOKEN') || 'EAATPMZAuJE64BSp34zVc8EG1dZAZCxQAC1ZCbaGAxe6vDm9fymZC1iOu3ZCau5WmfL9gnYVZAl6V2CwUTCZBwWeEcGSlHt8zSBoHmyljJZCK5hDxmTE5LTH8hRN2OvvhbTrW0urKtpQjMuGk5KShxfMQ63QZAY8noHVgkZABRAklUNkjAuaqLzklaIbgeIiPwHZBh4qTJQZDZD'
const META_PIXEL_ID = Deno.env.get('META_PIXEL_ID') || '907155057168097'

serve(async (req) => {
    // Handle CORS
    if (req.method === 'OPTIONS') {
        return new Response('ok', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
            }
        })
    }

    try {
        if (!META_CAPI_TOKEN) {
            throw new Error('META_CAPI_TOKEN is not configured')
        }

        const body = await req.json()
        const { event_name, event_time, user_data, custom_data, event_id, action_source = 'website', event_source_url } = body

        // Construct standard CAPI payload
        const capiPayload = {
            data: [
                {
                    event_name,
                    event_time: event_time || Math.floor(Date.now() / 1000),
                    action_source,
                    event_source_url,
                    event_id,
                    user_data: {
                        // Include standard user_data fields (IP and UA are recommended but optional if missing)
                        ...user_data
                    },
                    custom_data: custom_data || {}
                }
            ]
        }

        const response = await fetch(`https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events?access_token=${META_CAPI_TOKEN}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(capiPayload)
        })

        const result = await response.json()

        if (!response.ok) {
            throw new Error(result.error?.message || 'Meta CAPI request failed')
        }

        return new Response(JSON.stringify({ success: true, result }), {
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        })
    } catch (error: any) {
        console.error('Error in meta-capi:', error)
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        })
    }
})
