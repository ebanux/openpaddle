import React from 'react';
import { BaseAfterPaymentPageProps, VoucherCorporateBrandedAPData, Voucher } from '../../types';
import Card from '../../components/common/Card';

const VoucherCorporateBrandedDisplay: React.FC<BaseAfterPaymentPageProps<VoucherCorporateBrandedAPData>> = ({ sessionData, templateData, theme, environment, adminData }) => {
  const cardTitle = templateData.title || "Corporate Voucher";
  const voucherId = sessionData.voucherDetails?.voucherId;
  const voucher = voucherId ? adminData?.vouchers.find(v => v.id === voucherId) : undefined;
  const companyName = sessionData.submittedCustomFields?.company_name || "A Valued Partner";

  if (!voucher) {
    return <div className="p-4 text-center">Voucher details not found.</div>;
  }

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full`}>
        <div className="text-center">
            <h1 className="text-2xl font-bold">{templateData.headline}</h1>
            <p className="opacity-80 mt-2 mb-6">{templateData.mainMessage}</p>
        </div>

        <div className="p-6 rounded-lg bg-white shadow-lg border border-slate-200">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-xs text-slate-500">{templateData.companyNameLabel}</p>
                    <p className="text-lg font-semibold text-slate-800">{String(companyName)}</p>
                </div>
                <div className="text-right">
                    <p className="text-sm font-bold text-blue-600">GIFT CARD</p>
                    <p className="text-2xl font-bold text-slate-900">${(voucher.initialAmount / 100).toFixed(2)}</p>
                </div>
            </div>
            <div className="w-full h-px bg-slate-200 my-4"></div>
            <p className="text-sm text-slate-600 mb-1">Redemption Code:</p>
            <p className="text-xl font-bold font-mono tracking-widest text-slate-700 bg-slate-100 p-2 rounded text-center">{voucher.code}</p>
            <p className="text-xs text-slate-500 mt-4">{templateData.issuedByLabel} {sessionData.pageConfig.pageSlug}</p>
        </div>
      </Card>
    </div>
  );
};

export default VoucherCorporateBrandedDisplay;
