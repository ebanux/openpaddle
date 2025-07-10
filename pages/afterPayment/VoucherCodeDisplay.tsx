
import React, { useState } from 'react';
import { BaseAfterPaymentPageProps, VoucherCodeDisplayAPData, Voucher } from '../../types';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { QRCodeCanvas } from 'qrcode.react';

const VoucherCodeDisplay: React.FC<BaseAfterPaymentPageProps<VoucherCodeDisplayAPData>> = ({ sessionData, templateData, theme, environment, adminData }) => {
  const [copied, setCopied] = useState(false);
  const cardTitle = templateData.title || "Your Gift Card";

  const voucherId = sessionData.voucherDetails?.voucherId;
  const voucher = voucherId ? adminData?.vouchers.find(v => v.id === voucherId) : undefined;

  if (!voucher) {
    return (
        <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center justify-center`}>
            <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full text-center`}>
                <p>Error: Could not find voucher details.</p>
            </Card>
        </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(voucher.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full`}>
        <div className="text-center">
            <h1 className="text-2xl font-bold">{templateData.headline}</h1>
            <p className="opacity-80 mt-2 mb-6">{templateData.mainMessage}</p>
        </div>
        
        <div className="p-4 rounded-lg bg-white/80 border-2 border-dashed border-blue-400 text-center">
            <p className="text-sm text-slate-600">Your gift card code:</p>
            <div className="my-2 flex items-center justify-center gap-4">
                <p className="text-2xl font-bold font-mono tracking-widest text-blue-600">{voucher.code}</p>
                <Button size="sm" onClick={handleCopy} className={theme.buttonSecondaryClass}>
                    {copied ? 'Copied!' : 'Copy'}
                </Button>
            </div>
            <p className="text-lg font-semibold text-slate-800">Value: ${ (voucher.initialAmount / 100).toFixed(2) }</p>
        </div>
        
        {templateData.showQRCodeForCode && (
            <div className="w-32 h-32 bg-white mx-auto my-6 p-2 flex items-center justify-center rounded-lg border">
                <QRCodeCanvas value={voucher.code} size={112} />
            </div>
        )}

        <p className="text-sm opacity-90 mt-6 text-center">{templateData.instructions}</p>
        
        <p className="text-xs opacity-60 text-center mt-8">
          Session ID: {sessionData.sessionId} (Mode: {environment.toUpperCase()})
        </p>
      </Card>
    </div>
  );
};

export default VoucherCodeDisplay;
