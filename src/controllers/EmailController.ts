import * as sgMail from '@sendgrid/mail';

export interface EmailControllerConfig {
    apiKey: string;
    fromEmail: string;
}

export class EmailController {
    private fromEmail: string;

    constructor(config: EmailControllerConfig) {
        sgMail.setApiKey(config.apiKey);
        this.fromEmail = config.fromEmail;
    }

    async sendEmail(toEmail: string, subject: string, body: string): Promise<void> {
        try {
            await sgMail.send({
                to: toEmail,
                from: this.fromEmail,
                subject,
                text: body,
            });
        } catch (error) {
            console.error(error);
        }
    }
}