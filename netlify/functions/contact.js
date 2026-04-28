exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
          return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
          const { name, email, phone, company, inquiryType, message } = JSON.parse(event.body);

      if (!name || !email || !phone || !message) {
              return {
                        statusCode: 400,
                        body: JSON.stringify({ success: false, error: 'Missing required fields' }),
              };
      }

      const res = await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                        'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                        from: 'Freshtrax Contact <onboarding@resend.dev>',
                        to: 'getfreshtrax@gmail.com',
                        reply_to: email,
                        subject: `New Contact Form Submission: ${name} - ${inquiryType}`,
                        html: `
                                  <h2>New Contact Form Submission</h2>
                                            <p><strong>Name:</strong> ${name}</p>
                                                      <p><strong>Email:</strong> ${email}</p>
                                                                <p><strong>Phone:</strong> ${phone}</p>
                                                                          <p><strong>Company/Venue:</strong> ${company || 'Not provided'}</p>
                                                                                    <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
                                                                                              <p><strong>Message:</strong></p>
                                                                                                        <p>${message.replace(/\n/g, '<br>')}</p>
                                                                                                                  <hr>
                                                                                                                            <p><em>Please respond within 1 business day.</em></p>
                                                                                                                                    `,
              }),
      });

      if (!res.ok) {
              const error = await res.text();
              throw new Error(error);
      }

      return {
              statusCode: 200,
              body: JSON.stringify({ success: true, message: 'Message sent successfully' }),
      };
    } catch (error) {
          console.error('Error sending contact email:', error);
          return {
                  statusCode: 500,
                  body: JSON.stringify({ success: false, error: 'Failed to send message' }),
          };
    }
};
