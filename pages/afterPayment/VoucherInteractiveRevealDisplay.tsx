import React, { useState } from 'react';
import { BaseAfterPaymentPageProps, VoucherInteractiveRevealAPData, Voucher } from '../../types';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const VoucherInteractiveRevealDisplay: React.FC<BaseAfterPaymentPageProps<VoucherInteractiveRevealAPData>> = ({ sessionData, templateData, theme, environment, adminData }) => {
  const [revealed, setRevealed] = useState(false);

  const cardTitle = templateData.title || "Your Gift";
  const voucherId = sessionData.voucherDetails?.voucherId;
  const voucher = voucherId ? adminData?.vouchers.find(v => v.id === voucherId) : undefined;

  if (!voucher) {
    return <div className="p-4 text-center">Voucher details not found.</div>;
  }

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center justify-center`}>
      <Card className={`${theme.cardBgClass} p-8 shadow-2xl max-w-md w-full text-center`}>
        <h1 className="text-2xl font-bold">{cardTitle}</h1>
        <p className="opacity-80 mt-2 mb-6">{templateData.mainMessage}</p>

        {!revealed ? (
          <div className="my-8">
            <p className="text-lg mb-4">{templateData.revealPrompt}</p>
            <Button onClick={() => setRevealed(true)} size="lg" className={theme.buttonPrimaryClass}>
              {templateData.revealButtonText}
            </Button>
          </div>
        ) : (
          <div className="my-8 transition-all duration-500 animate-fade-in">
            <div className="p-4 rounded-lg bg-white/80 border-2 border-dashed border-blue-400">
              <p className="text-sm text-slate-600">Your gift card code:</p>
              <p className="text-2xl font-bold font-mono tracking-widest text-blue-600 my-2">{voucher.code}</p>
              <p className="text-lg font-semibold text-slate-800">Value: ${(voucher.initialAmount / 100).toFixed(2)}</p>
            </div>
          </div>
        )}
      </Card>
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default VoucherInteractiveRevealDisplay;
