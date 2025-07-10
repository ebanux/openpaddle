

import React from 'react';
import { BaseAfterPaymentPageProps, AppointmentBookingConfirmedAPData, AppointmentBookingPageLinkConfig, StripeCustomField, BasePageLinkConfig } from '../../types';
import Card from '../../components/common/Card';

const AppointmentBookingConfirmedDisplay: React.FC<BaseAfterPaymentPageProps<AppointmentBookingConfirmedAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const cardTitle = templateData.title || "Appointment Confirmed";
  const pageConfig = sessionData.pageConfig as AppointmentBookingPageLinkConfig;
  const serviceName = pageConfig?.serviceTitle || "Your Service";
  
  // Mock appointment details - in a real app, this might come from payment details or session specific data
  const appointmentDetails = sessionData.paymentDetails.items[0]?.name || serviceName; 
  const appointmentDateTime = "Details will be confirmed via email shortly."; // Placeholder

  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                         theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                         theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                         theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                         'text-blue-600';

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full`}>
        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6 mx-auto ${theme.buttonPrimaryClass.replace('text-white','bg-opacity-20').replace('text-slate-900','bg-opacity-20').replace('text-green-900','bg-opacity-20')} ${accentColorClass.replace('text-','bg-')} bg-opacity-20`}>
             <i className={`material-icons-round !text-4xl ${accentColorClass}`}>event_available</i>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-2 text-center`}>{cardTitle}</h1>
        <p className="text-center opacity-90 mb-4 whitespace-pre-line">{templateData.mainMessage}</p>

        <h2 className={`text-xl font-semibold mb-4 text-center ${accentColorClass}`}>{templateData.confirmationHeadline}</h2>
        
        {templateData.showAppointmentDetails && (
          <div className={`p-4 rounded-md mb-6 ${theme.inputBgClass || 'bg-slate-50'} border ${theme.inputBorderClass || 'border-slate-200'}`}>
            <p className="text-md font-medium"><strong>Service:</strong> {appointmentDetails}</p>
            <p className="text-sm opacity-80"><strong>Date & Time:</strong> {appointmentDateTime}</p>
            {pageConfig?.providerName && (
                 <p className="text-sm opacity-80"><strong>Provider:</strong> {pageConfig.providerName}</p>
            )}
          </div>
        )}
        
        {/* Display Custom Fields if enabled */}
        {templateData.showSubmittedCustomFields && sessionData.submittedCustomFields && Object.keys(sessionData.submittedCustomFields).length > 0 && (
          <div className={`mb-6 pt-4 border-t ${theme.inputBorderClass || 'border-slate-300'}`}>
            <h3 className="text-md font-semibold opacity-90 mb-2">Your Information:</h3>
            <div className="space-y-1 text-sm text-left">
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

        {templateData.whatToExpect && templateData.whatToExpect.length > 0 && (
          <div className="mb-6">
            <h3 className="text-md font-semibold opacity-90 mb-2">What to Expect:</h3>
            <ul className="list-disc list-inside space-y-1 opacity-80 text-sm">
              {templateData.whatToExpect.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {templateData.contactForQuestions && (
          <div className={`mt-4 p-3 rounded-md ${theme.inputBgClass || 'bg-slate-100'} border ${theme.inputBorderClass || 'border-slate-200'} text-sm`}>
            <p className="opacity-80 whitespace-pre-line">{templateData.contactForQuestions}</p>
          </div>
        )}
        
        <p className="text-xs opacity-60 text-center mt-8">
          Booking ID (Simulated): {sessionData.sessionId} (Mode: {environment.toUpperCase()})
        </p>
      </Card>
    </div>
  );
};

export default AppointmentBookingConfirmedDisplay;
