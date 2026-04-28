export async function onRequestPost(context) {
  try {
    const data = await context.request.json();
    const email = data.email;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Here you would integrate with Buttondown, ConvertKit, etc.
    // e.g., fetch('https://api.buttondown.email/v1/subscribers', { ... })
    // using context.env.NEWSLETTER_API_KEY

    return new Response(JSON.stringify({ success: true, message: 'Subscribed successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to process request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
