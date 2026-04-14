import { serve } from 'https://deno.land/std@0.208.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const DRIVE_LINK = Deno.env.get('DRIVE_LINK') ?? '';

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { email } = await req.json();
    if (!email) throw new Error('email is required');

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? '';
    if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY not set in secrets');
    if (!DRIVE_LINK) throw new Error('DRIVE_LINK not set in secrets — email blocked to prevent sending broken access link');

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'AVADA Courses <hello@archbysha.com>',
        to: [email],
        subject: '🎨 Your Avada Design Bundle — Instant Access Inside',
        html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:system-ui,-apple-system,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:#000000;padding:32px 40px;">
            <p style="margin:0;color:#9ca3af;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">AVADA DESIGN</p>
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:26px;font-weight:900;line-height:1.2;">Your courses are ready. 🎨</h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 20px;color:#374151;font-size:16px;line-height:1.7;">
              Thank you for purchasing the <strong>Avada Design Bundle</strong> — all 12 premium courses are now yours for life.
            </p>

            <!-- Access Box -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;margin-bottom:28px;">
              <tr>
                <td style="padding:24px 28px;">
                  <p style="margin:0 0 6px;color:#6b7280;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">Your Course Library</p>
                  <p style="margin:0 0 20px;color:#111827;font-size:15px;line-height:1.6;">
                    Click the button below to access all 12 courses on Google Drive. <strong>Bookmark this link</strong> — it's your permanent access.
                  </p>
                  <a href="${DRIVE_LINK}"
                     style="display:inline-block;background:#000000;color:#ffffff;font-weight:700;font-size:15px;padding:14px 28px;border-radius:8px;text-decoration:none;letter-spacing:0.01em;">
                    Open Course Library →
                  </a>
                </td>
              </tr>
            </table>

            <!-- Support -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;">
              <tr>
                <td style="padding:18px 22px;">
                  <p style="margin:0 0 12px;color:#166534;font-size:13px;font-weight:700;">Need help? We're here for you.</p>
                  <a href="https://wa.me/919198747810" style="display:inline-block;background:#25D366;color:#ffffff;font-weight:700;font-size:14px;padding:12px 24px;border-radius:8px;text-decoration:none;">
                    💬 Chat on WhatsApp
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:20px 40px;border-top:1px solid #e5e7eb;">
            <p style="margin:0;color:#9ca3af;font-size:12px;">
              © 2026 Avada Design. You're receiving this because you purchased the Avada Design Bundle.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message ?? 'Resend API error');
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('[send-access-email]', err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
