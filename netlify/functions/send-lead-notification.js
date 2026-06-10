exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
          return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
          const { name, email, businessType, phone, readyIn30, offer } = JSON.parse(event.body);

      const res = await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                        'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                        from: 'Freshtrax Leads <noreply@getfreshtrax.com>',
                        to: 'getfreshtrax@gmail.com',
                        reply_to: email,
                        subject: `New Lead: ${name} - ${businessType}`,
                        html: `
                                  <h2>New Lead Submission</h2>
                                            <p><strong>Name:</strong> ${name}</p>
                                                      <p><strong>Email:</strong> ${email}</p>
                                                                <p><strong>Business Type:</strong> ${businessType}</p>
                                                                          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                                                                                    <p><strong>Ready in 30 days:</strong> ${readyIn30 ? 'Yes' : 'No'}</p>
                                                                                              <p><strong>Offer:</strong> ${offer}</p>
                                                                                                        <p><strong>Downloaded PDF:</strong> Yes</p>
                                                                                                                `,
              }),
      });

      if (!res.ok) {
              const error = await res.text();
              throw new Error(error);
      }

      return {
              statusCode: 200,
              body: JSON.stringify({ success: true, message: 'Notification sent' }),
      };
    } catch (error) {
          console.error('Error sending email:', error);
          return {
                  statusCode: 500,
                  body: JSON.stringify({ success: false, error: 'Failed to send notification' }),
          };
    }
};
