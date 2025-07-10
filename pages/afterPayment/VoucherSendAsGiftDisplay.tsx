import React, { useState } from 'react';
import { BaseAfterPaymentPageProps, VoucherSendAsGiftAPData } from '../../types';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { VoucherPageLinkConfig } from '../../types';

const VoucherSendAsGiftDisplay: React.FC<BaseAfterPaymentPageProps<VoucherSendAsGiftAPData>> = ({ sessionData, templateData, theme, environment, adminData }) => {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const cardTitle = templateData.title || "Send Gift";
  const voucherId = sessionData.voucherDetails?.voucherId;
  const voucher = voucherId ? adminData?.vouchers.find(v => v.id === voucherId) : undefined;
  const pageConfig = sessionData.pageConfig as VoucherPageLinkConfig;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (recipientEmail && voucher) {
      console.log(`(Simulated) Sending voucher ${voucher.code} to ${recipientEmail} with message: "${personalMessage}"`);
      setIsSent(true);
    }
  };

  if (!voucher) {
    return <div className="p-4 text-center">Voucher details not found.</div>;
  }
  
  const originalCustomFields = sessionData.submittedCustomFields;

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full`}>
        <h1 className="text-2xl font-bold text-center mb-2">{templateData.headline}</h1>
        <p className="opacity-80 mt-2 mb-6 text-center">{templateData.mainMessage}</p>

        {isSent ? (
          <div className="p-4 rounded-lg bg-green-100 border border-green-200 text-green-800 text-center">
            <p className="font-bold">Gift card sent to {recipientEmail}!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-center opacity-90">{templateData.sendPrompt}</p>
            <div>
              <label htmlFor="recipient-email" className="block text-sm font-medium text-slate-700">{templateData.recipientEmailLabel}</label>
              <input
                type="email"
                id="recipient-email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className={`w-full p-2 border rounded-md ${theme.inputBorderClass}`}
                required
              />
            </div>
            <div>
              <label htmlFor="personal-message" className="block text-sm font-medium text-slate-700">{templateData.messageLabel}</label>
              <textarea
                id="personal-message"
                rows={3}
                value={personalMessage}
                onChange={(e) => setPersonalMessage(e.target.value)}
                className={`w-full p-2 border rounded-md ${theme.inputBorderClass}`}
              />
            </div>
            <Button type="submit" fullWidth className={theme.buttonPrimaryClass}>
              {templateData.sendButtonText}
            </Button>
          </form>
        )}
        
        {templateData.showSubmittedCustomFields && originalCustomFields && Object.keys(originalCustomFields).length > 0 && (
          <div className={`mt-6 pt-4 border-t ${theme.inputBorderClass || 'border-slate-300'}`}>
            <h3 className="text-md font-semibold opacity-90 mb-2">Original Gift Details:</h3>
            <div className="space-y-1 text-sm">
              {Object.entries(originalCustomFields).map(([key, value]) => {
                const fieldConfig = pageConfig.custom_fields?.find(f => f.key === key);
                const label = fieldConfig?.label?.custom || key;
                return (
                  <div key={key} className="flex justify-between">
                    <span className="font-medium opacity-80">{label}:</span>
                    <span className="font-semibold text-right">{String(value)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </Card>
    </div>
  );
};

export default VoucherSendAsGiftDisplay;
