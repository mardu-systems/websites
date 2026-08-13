import type { PayloadEmailAdapter, SendEmailOptions } from 'payload';
import { sendEmail, type SendEmailInput } from './email';

type SendEmailImplementation = (message: SendEmailInput) => Promise<void>;

const getEmailAddress = (value: unknown): string | undefined => {
  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'object' && value !== null && 'address' in value) {
    const { address } = value;
    return typeof address === 'string' ? address : undefined;
  }

  return undefined;
};

const normalizeAddressList = (value: unknown): string | string[] | undefined => {
  if (!Array.isArray(value)) {
    return getEmailAddress(value);
  }

  const addresses = value
    .map(getEmailAddress)
    .filter((address): address is string => Boolean(address));

  return addresses.length > 0 ? addresses : undefined;
};

const getMessageContent = (message: SendEmailOptions) => {
  const html = typeof message.html === 'string' ? message.html : undefined;
  const text = typeof message.text === 'string' ? message.text : undefined;

  if (!html && !text) {
    throw new Error('Payload email must contain HTML or text content.');
  }

  return { html, text };
};

const getDefaultSender = () => {
  const configuredSender = process.env.EMAIL_FROM?.trim() ?? '';
  const addressMatch = configuredSender.match(/<([^>]+)>/);
  const defaultFromAddress = addressMatch?.[1]?.trim() || configuredSender || 'noreply@mardu.de';
  const configuredName = addressMatch ? configuredSender.slice(0, addressMatch.index).trim() : '';
  const defaultFromName = configuredName.replace(/^"|"$/g, '') || 'Mardu GmbH';

  return { defaultFromAddress, defaultFromName };
};

export const createPayloadEmailAdapter = (
  sendEmailImplementation: SendEmailImplementation = sendEmail,
): PayloadEmailAdapter => {
  return () => {
    const { defaultFromAddress, defaultFromName } = getDefaultSender();

    return {
      defaultFromAddress,
      defaultFromName,
      name: 'resend',
      sendEmail: async (message) => {
        const subject = typeof message.subject === 'string' ? message.subject : '';
        const to = normalizeAddressList(message.to);

        if (!subject) {
          throw new Error('Payload email must contain a subject.');
        }

        if (!to) {
          throw new Error('Payload email must contain at least one recipient.');
        }

        await sendEmailImplementation({
          ...getMessageContent(message),
          subject,
          to,
        });
      },
    };
  };
};
