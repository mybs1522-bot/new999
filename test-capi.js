const SUPABASE_URL = 'https://aexrgtpxyzfxjecozstf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFleHJndHB4eXpmeGplY296c3RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyOTY0MjcsImV4cCI6MjA4Nzg3MjQyN30._ZSmh9iTP3etyGj5XrkEGJtRp9kR8z6jAmLOMesIvkg';

async function testCAPI() {
  console.log('Sending test Purchase event to Meta CAPI Edge Function...');
  
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/meta-capi`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: 'http://localhost:4000/test-capi',
        event_id: 'test_evt_' + Date.now(),
        action_source: 'website',
        user_data: {
          client_ip_address: '127.0.0.1',
          client_user_agent: 'Node.js Test Script'
        },
        custom_data: {
          value: 999,
          currency: 'INR',
          content_name: 'Test Course'
        }
      })
    });

    const result = await response.json();
    console.log('Status Code:', response.status);
    console.log('Response Body:', result);
    
    if (response.ok && result.success) {
      console.log('✅ Test Successful! The event reached Facebook.');
    } else {
      console.error('❌ Test Failed.');
    }
  } catch (error) {
    console.error('❌ Request Error:', error);
  }
}

testCAPI();
