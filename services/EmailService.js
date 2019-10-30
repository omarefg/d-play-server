const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const debug = require('debug')('app:email-service');
const chalk = require('chalk');
const boom = require('@hapi/boom');
const { config } = require('../config');

const {
    apiUrl,
    emailSecret,
    emailUser,
    emailPass,
} = config;


class EmailService {
    constructor() {
        this.emailAuth = { user: emailUser, pass: emailPass };
        this.transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: this.emailAuth,
        });
        this.from = 'omarefg@hotmail.com';
        this.subject = 'Confirmación de correo para dplay';
    }

    mailOptions(url) {
        return {
            from: this.from,
            subject: this.subject,
            html: `
                <h1>Confirmación de correo para dplay</h1>
                <p>¡Hola! Somos Omar y Jorge, los creadores de dplay.</p>
                <p>¡Felicidades! Eres parte de la mejor comunidad de música.</p>
                <p>Nos encanta que seas parte de nuestro equipo.</p>
                <p>Solo falta confirmar tu correo para que disfrutes de la mejor música.</p>
                <p>Hazlo ingresando en el siguiente <a href="${url}">enlace</a> por favor.</p>
            `,
        };
    }

    async sendRegistrationEmail(email) {
        try {
            const tokenobj = { email };
            const tokenparams = { };
            const token = jwt.sign(tokenobj, emailSecret, tokenparams);
            const url = `${apiUrl}/api/auth/confirmation/${token}`;
            await this.transporter.sendMail({ ...this.mailOptions(url), to: email });
            debug(`${chalk.yellow(`Email sent to: ${email}`)}`);
        } catch (error) {
            debug(error.response);
            throw boom.conflict('Hubo un error tratando de confirmar tu correo, intenta más tarde');
        }
    }
}

module.exports = EmailService;
