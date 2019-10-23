const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const debug = require('debug');
const chalk = require('chalk');
const { config } = require('../config');

const {
    apiUrl,
    emailSecret,
    emailUser,
    emailPassword,
} = config;

const emailAuth = {
    user: emailUser,
    pass: emailPassword,
};

const transporter = nodemailer.createTransport({ service: 'hotmail', emailAuth });


const mailOptions = (url) => ({
    from: 'omarefg@hotmail.com',
    subject: 'Confirmación de correo para dplay',
    html: `
    <h1>Confirmación de correo para dplay</h1>
    <p>¡Hola! Somos Omar y Jorge, los creadores de dplay.</p>
    <p>¡Felicidades! Eres parte de la mejor comunidad de música.</p>
    <p>Nos encanta que seas parte de nuestro equipo.</p>
    <p>Solo falta confirmar tu correo para que disfrutes de la mejor música.</p>
    <p>Hazlo ingresando en el siguiente <a href="${url}">enlace</a> por favor.</p>
    `,
});

const sendRegistrationEmail = (email) => new Promise((resolve, rejected) => {
    const sendEmail = (error, emailToken) => {
        if (error) {
            rejected(error);
        }
        const url = `${apiUrl}/api/auth/confirmation/${emailToken}`;
        transporter
            .sendMail({ ...mailOptions(url), to: email })
            .then(() => debug(`${chalk.green(`Email sent to: ${email}`)}`))
            .catch((mailError) => {
                rejected(mailError);
            });
    };
    const tokenobj = { email };
    const tokenparams = { };
    jwt.sign(tokenobj, emailSecret, tokenparams, sendEmail);
    resolve();
});

module.exports = {
    mailOptions,
    sendRegistrationEmail,
};
