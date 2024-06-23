const axios = require('axios');

exports.handler = async (event, context) => {
    const { firstName, lastName, email, age, background, field, html, css, js, python, java, php, msg } = JSON.parse(event.body);

    const skills = [html, css, js, python, java, php].filter(skill => skill).join(', ');

    const templateParams = {
        from_name: `${firstName} ${lastName}`,
        from_email: email,
        message: msg,
        age: age,
        education: background,
        field_of_interest: field,
        programming_skills: skills
    };

    const data = {
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_USER_ID,
        template_params: templateParams,
    };

    try {
        const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', data);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to send email' }),
        };
    }
};
