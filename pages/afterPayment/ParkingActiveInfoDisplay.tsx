
import React from 'react';
import { BaseAfterPaymentPageProps, ParkingActiveInfoAPData, ParkingRate, ParkingPageLinkConfig, StripeCustomField } from '../../types';
import { CURRENCY_SYMBOLS } from '../../constants';
import Card from '../../components/common/Card'; // Assuming Card is in components/common
import Button from '../../components/common/Button'; // Assuming Button is in components/common

const ParkingActiveInfoDisplay: React.FC<BaseAfterPaymentPageProps<ParkingActiveInfoAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const currencySymbol = CURRENCY_SYMBOLS[sessionData.paymentDetails.currency] || '$';
  
  const parkingInfo = sessionData.parking; 
  const pageConfig = sessionData.pageConfig as ParkingPageLinkConfig; // Cast for parking specific fields

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
  
  const cardTitle = templateData.title || "Parking Session Details";

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full`}>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-4 text-center ${accentColorClass}`}>{cardTitle}</h1>
        
        <p className="text-center opacity-90 mb-6 whitespace-pre-line">{templateData.mainMessage}</p>

        {parkingInfo && parkingInfo.selectedRate && (
          <div className={`space-y-3 mb-6 p-4 rounded-md ${theme.inputBgClass || 'bg-slate-50'} border ${theme.inputBorderClass || 'border-slate-200'}`}>
            {templateData.showLocationName && pageConfig?.locationName && (
                <div className="flex justify-between">
                    <span className="font-medium opacity-80">Location:</span>
                    <span className="font-semibold">{pageConfig.locationName}</span>
                </div>
            )}
            {templateData.showZoneId && pageConfig?.zoneId && (
                <div className="flex justify-between">
                    <span className="font-medium opacity-80">Zone:</span>
                    <span className="font-semibold">{pageConfig.zoneId}</span>
                </div>
            )}
            {templateData.showOperatorName && pageConfig?.operatorName && (
                <div className="flex justify-between">
                    <span className="font-medium opacity-80">Operator:</span>
                    <span className="font-semibold">{pageConfig.operatorName}</span>
                </div>
            )}
             <div className="flex justify-between">
              <span className="font-medium opacity-80">License Plate:</span>
              <span className="font-semibold">{parkingInfo.licensePlate}</span>
            </div>
            {templateData.showPhoneNumber && parkingInfo.phoneNumber && (
                <div className="flex justify-between">
                    <span className="font-medium opacity-80">Phone:</span>
                    <span className="font-semibold">{parkingInfo.phoneNumber}</span>
                </div>
            )}
            <div className="flex justify-between">
              <span className="font-medium opacity-80">Duration:</span>
              <span className="font-semibold">{parkingInfo.selectedRate.duration}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium opacity-80">Amount Paid:</span>
              <span className="font-semibold">{currencySymbol}{sessionData.paymentDetails.totalAmount.toFixed(2)}</span>
            </div>
             {paymentTime && (
                <div className="flex justify-between">
                    <span className="font-medium opacity-80">Started At:</span>
                    <span className="font-semibold">{paymentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            )}
            {templateData.showEndTime && endTime && (
              <div className={`flex justify-between items-center pt-2 mt-2 border-t ${theme.inputBorderClass || 'border-slate-300'}`}>
                <span className={`font-semibold text-lg ${accentColorClass}`}>Parking Ends:</span>
                <span className={`font-bold text-xl ${accentColorClass}`}>{endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            )}
          </div>
        )}

        {/* Display Custom Fields if enabled */}
        {templateData.showSubmittedCustomFields && sessionData.submittedCustomFields && Object.keys(sessionData.submittedCustomFields).length > 0 && (
          <div className={`mt-4 pt-4 border-t ${theme.inputBorderClass || 'border-slate-300'}`}>
            <h3 className="text-md font-semibold opacity-90 mb-2">Additional Information:</h3>
            <div className="space-y-1 text-sm">
              {Object.entries(sessionData.submittedCustomFields).map(([key, value]) => {
                const fieldConfig = pageConfig.custom_fields?.find(f => f.key === key);
                const label = fieldConfig?.label?.custom || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
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

        {templateData.customNote && (
          <p className="text-sm opacity-80 italic mb-6 text-center">{templateData.customNote}</p>
        )}

        {templateData.showParkingLotRulesLink && templateData.parkingLotRulesLink && (
          <div className="text-center mb-6">
            <a 
              href={templateData.parkingLotRulesLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`inline-block px-4 py-2 rounded-md ${theme.buttonSecondaryClass}`}
            >
              View Parking Lot Rules
            </a>
          </div>
        )}
        
        <p className="text-xs opacity-60 text-center mt-6">
          Session ID: {sessionData.sessionId} (Mode: {environment.toUpperCase()})
        </p>
      </Card>
    </div>
  );
};

export default ParkingActiveInfoDisplay;
