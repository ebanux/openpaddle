import { EmailTemplate, PageSessionData } from './types';
import { CURRENCY_SYMBOLS } from './constants';

export const generateRandomId = (length = 10) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const generatePageId = (length = 6) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const renderEmailContent = (template: EmailTemplate, sessionData: PageSessionData, tenantSubdomain: string): { subject: string; body: string } => {
    let subject = template.subject;
    let body = template.body;

    const sessionUrl = `/u/${tenantSubdomain}/${sessionData.pageConfig.pageSlug}/s/${sessionData.sessionId}`;
    const fullSessionLink = `${window.location.origin}${sessionUrl}`;

    const customerName = (sessionData.submittedCustomFields as any)?.attendee_name || (sessionData.submittedCustomFields as any)?.customer_name || 'Valued Customer';
    
    const currencySymbol = CURRENCY_SYMBOLS[sessionData.paymentDetails.currency] || '$';
    const totalAmountFormatted = `${currencySymbol}${sessionData.paymentDetails.totalAmount.toFixed(2)}`;

    const replacements: Record<string, string> = {
        '{{page_name}}': sessionData.pageConfig.pageSlug || 'your page',
        '{{customer_name}}': customerName,
        '{{session_link}}': fullSessionLink,
        '{{total_amount}}': totalAmountFormatted,
    };

    for (const placeholder in replacements) {
        const regex = new RegExp(placeholder.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
        subject = subject.replace(regex, replacements[placeholder]);
        body = body.replace(regex, replacements[placeholder]);
    }

    return { subject, body };
}

export const formatCurrency = (amount: number, currency: string = 'USD') => 
    `${CURRENCY_SYMBOLS[currency] || '$'}${amount.toFixed(2)}`;
