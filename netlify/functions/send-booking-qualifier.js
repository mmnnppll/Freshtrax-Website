exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
          return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
          const { name, email, venueType, traffic, reason } = JSON.parse(event.body);

      const res = await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                        'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                        from: 'Freshtrax Leads <onboarding@resend.dev>',
                        to: 'getfreshtrax@gmail.com',
                        subject: `Booking qualifier: ${name} — ${venueType}`,
                        html: `
                                  <h2>Book-a-Call Qualifier</h2>
                                  <p><strong>Name:</strong> ${name}</p>
                                  <p><strong>Email:</strong> ${email}</p>
                                  <p><strong>Venue type:</strong> ${venueType}</p>
                                  <p><strong>Daily foot traffic:</strong> ${traffic}</p>
                                  <p><strong>#1 goal:</strong> ${reason || 'Not selected'}</p>
                                  <p>They were handed the calendar link after submitting — watch for the booking confirmation.</p>
                                `,
              }),
      });

      if (!res.ok) {
              const error = await res.text();
              throw new Error(error);
      }

      return {
              statusCode: 200,
              body: JSON.stringify({ success: true, message: 'Qualifier sent' }),
      };
    } catch (error) {
          console.error('Error sending booking qualifier:', error);
          return {
                  statusCode: 500,
                  body: JSON.stringify({ success: false, error: 'Failed to send qualifier' }),
          };
    }
};
