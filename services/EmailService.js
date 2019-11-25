const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const debug = require('debug')('app:email-service');
const chalk = require('chalk');
const boom = require('@hapi/boom');
const {
    confirmationEmail, logo, banner, changeEmail,
} = require('../utils/marketing/email-templates');
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
        this.from = emailUser;
        this.subject = 'Confirmación de correo para dplay';
        this.dplayLogo = 'dplay@logo.dd';
        this.dplayBanner = 'dplay@banner.dd';
    }

    confirmationMailOptions(url) {
        return {
            from: this.from,
            subject: this.subject,
            html: confirmationEmail(url, this.dplayLogo, this.dplayBanner),
            attachments: [
                {
                    filename: 'logo.png',
                    path: logo,
                    cid: this.dplayLogo,
                },
                {
                    filename: 'banner.png',
                    path: banner,
                    cid: this.dplayBanner,
                },
            ],
        };
    }

    changeEmailOptions(url) {
        return {
            from: this.from,
            subject: this.subject,
            html: changeEmail(url, this.dplayLogo, this.dplayBanner),
            attachments: [
                {
                    filename: 'logo.png',
                    path: logo,
                    cid: this.dplayLogo,
                },
                {
                    filename: 'banner.png',
                    path: banner,
                    cid: this.dplayBanner,
                },
            ],
        };
    }

    async sendRegistrationEmail(email) {
        try {
            const tokenobj = { email };
            const tokenparams = { };
            const token = jwt.sign(tokenobj, emailSecret, tokenparams);
            const url = `${apiUrl}/api/auth/confirmation/${token}`;
            await this.transporter.sendMail({ ...this.confirmationMailOptions(url), to: email });
            debug(`${chalk.yellow(`Email sent to: ${email}`)}`);
        } catch (error) {
            debug(error.response);
            throw boom.conflict('Hubo un error tratando de confirmar tu correo, intenta más tarde');
        }
    }

    async sendChangeEmail(email, id) {
        try {
            const tokenobj = { email, id };
            const tokenparams = { };
            const token = jwt.sign(tokenobj, emailSecret, tokenparams);
            const url = `${apiUrl}/api/users/change-email/${token}`;
            await this.transporter.sendMail({ ...this.changeEmailOptions(url), to: email });
            debug(`${chalk.yellow(`Email sent to: ${email}`)}`);
        } catch (error) {
            debug(error.response);
            throw boom.conflict('Hubo un error tratando de confirmar tu correo, intenta más tarde');
        }
    }
}

module.exports = EmailService;
