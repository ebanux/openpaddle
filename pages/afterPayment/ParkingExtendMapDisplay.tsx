

import React, { useState } from 'react';
import { BaseAfterPaymentPageProps, ParkingExtendMapAPData, ParkingPageLinkConfig, MonetizationUseCase, StripeLineItem } from '../../types';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { CURRENCY_SYMBOLS } from '../../constants';
import ParkingExtendModal from '../../components/common/ParkingExtendModal';

const ParkingExtendMapDisplay: React.FC<BaseAfterPaymentPageProps<ParkingExtendMapAPData>> = ({ sessionData, templateData, theme, environment, onInitiateCheckout }) => {
  const [isExtendModalOpen, setIsExtendModalOpen] = useState(false);
  const cardTitle = templateData.title || "Parking Session";
  const currencySymbol = CURRENCY_SYMBOLS[sessionData.paymentDetails.currency] || '$';

  const parkingInfo = sessionData.parking;
  const pageConfig = sessionData.pageConfig as ParkingPageLinkConfig;
  
  let paymentTime: Date | null = null;
  let endTime: Date | null = null;

  if (parkingInfo && parkingInfo.selectedRate) {
    paymentTime = new Date(sessionData.paymentDetails.paymentTimestamp);
    endTime = new Date(paymentTime.getTime() + parkingInfo.selectedRate.hours * 60 * 60 * 1000);
  }
  
  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                         theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                         theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                         theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                         'text-blue-600';

  const handleExtendParking = () => {
    setIsExtendModalOpen(true);
  };

  const handleConfirmExtension = (hours: number, minutes: number, cost: number) => {
    setIsExtendModalOpen(false);
    if (!onInitiateCheckout) {
      alert(`(Simulated) Extending parking by ${hours}h ${minutes}m for a cost of ${currencySymbol}${cost.toFixed(2)}.`);
      return;
    }
    const lineItem: StripeLineItem = {
      price_data: {
        currency: sessionData.paymentDetails.currency,
        unit_amount: Math.round(cost * 100),
        product_data: {
          name: `Parking Extension (${hours}h ${minutes}m)`,
          description: `Extending parking for plate: ${sessionData.parking?.licensePlate}`
        }
      },
      quantity: 1
    };
    onInitiateCheckout([lineItem], MonetizationUseCase.PARKING_SESSION, { isExtension: true });
  };

  return (
    <>
      <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
        <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full`}>
          <h1 className={`text-2xl sm:text-3xl font-bold mb-4 text-center ${accentColorClass}`}>{cardTitle}</h1>
          <p className="text-center opacity-90 mb-6 whitespace-pre-line">{templateData.mainMessage}</p>

          {parkingInfo && parkingInfo.selectedRate && (
            <div className={`space-y-2 mb-4 p-3 rounded-md ${theme.inputBgClass || 'bg-slate-50'} border ${theme.inputBorderClass || 'border-slate-200'}`}>
              <div className="flex justify-between text-sm"><span>License Plate:</span> <span className="font-medium">{parkingInfo.licensePlate}</span></div>
              <div className="flex justify-between text-sm"><span>Ends At:</span> <span className="font-medium">{endTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || 'N/A'}</span></div>
            </div>
          )}

          {templateData.mapEmbedUrl ? (
            <div className="mb-6 aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border border-slate-300">
              <iframe
                src={templateData.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Parking Location Map"
              ></iframe>
            </div>
          ) : (
            <div className={`mb-6 p-4 rounded-md text-center ${theme.inputBgClass || 'bg-slate-100'} border ${theme.inputBorderClass || 'border-slate-200'}`}>
              <p className="opacity-70 text-sm">Map preview would appear here if configured.</p>
            </div>
          )}
          
          {templateData.locationHelpText && (
              <p className="text-sm opacity-80 text-center mb-4">{templateData.locationHelpText}</p>
          )}

          <Button onClick={handleExtendParking} fullWidth className={theme.buttonPrimaryClass}>
            {templateData.extendButtonText}
          </Button>
          
          <p className="text-xs opacity-60 text-center mt-6">
            Session ID: {sessionData.sessionId} (Mode: {environment.toUpperCase()})
          </p>
        </Card>
      </div>

      {parkingInfo && endTime && (
        <ParkingExtendModal
          isOpen={isExtendModalOpen}
          onClose={() => setIsExtendModalOpen(false)}
          onConfirm={handleConfirmExtension}
          baseRatePerHour={pageConfig.baseRatePerHour || 0}
          serviceFee={pageConfig.serviceFee || 0}
          currency={sessionData.paymentDetails.currency}
          originalEndTime={endTime}
          incrementMinutes={pageConfig.durationIncrementMinutes || 15}
        />
      )}
    </>
  );
};

export default ParkingExtendMapDisplay;
