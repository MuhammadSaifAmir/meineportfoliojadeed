const axios = require('axios');

exports.handler = async (event, context) => {
  const { template_params } = JSON.parse(event.body);

  const emailJSUrl = 'https://api.emailjs.com/api/v1.0/email/send';

  const emailJSData = {
    service_id: process.env.EMAILJS_SERVICE_ID,
    template_id: process.env.EMAILJS_TEMPLATE_ID,
    user_id: process.env.EMAILJS_USER_ID,
    template_params,
  };

  try {
    const response = await axios.post(emailJSUrl, emailJSData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true }),
      };
    } else {
      return {
        statusCode: response.status,
        body: JSON.stringify({ success: false, error: response.data }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
