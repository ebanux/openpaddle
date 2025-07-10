import React from 'react';
import { BaseAfterPaymentPageProps, EventTicketConfirmedQRAPData, EventTicketSalesPageLinkConfig, StripeCustomField, BasePageLinkConfig } from '../../types';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { QRCodeCanvas } from 'qrcode.react';
import AuthenticityBadge from '../../components/common/AuthenticityBadge';

const EventTicketConfirmedQRDisplay: React.FC<BaseAfterPaymentPageProps<EventTicketConfirmedQRAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const cardTitle = templateData.title || "Ticket Confirmed!";
  const pageConfig = sessionData.pageConfig as EventTicketSalesPageLinkConfig;
  const eventName = pageConfig?.eventTitle || "Your Event";

  // Mock function to format date/time from sessionData if available
  const formatEventDateTime = () => {
    if (!pageConfig?.eventDate || !pageConfig?.eventTime) return "Date & Time TBD";
    try {
      const date = new Date(pageConfig.eventDate + 'T' + pageConfig.eventTime + 'Z'); // Assume UTC
      return date.toLocaleString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName:'short' });
    } catch {
      return `${pageConfig.eventDate} at ${pageConfig.eventTime}`;
    }
  };
  const eventDateTime = formatEventDateTime();
  const eventLocation = pageConfig?.eventLocation || "Venue TBD";
  
  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                         theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                         theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                         theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                         'text-blue-600';

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full text-center`}>
        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6 mx-auto ${theme.buttonPrimaryClass.replace('text-white','bg-opacity-20').replace('text-slate-900','bg-opacity-20').replace('text-green-900','bg-opacity-20')} ${accentColorClass.replace('text-','bg-')} bg-opacity-20`}>
            <i className={`material-icons-round !text-4xl ${accentColorClass}`}>qr_code_2</i>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-2`}>{cardTitle}</h1>
        <p className="opacity-90 mb-6 whitespace-pre-line">{templateData.mainMessage}</p>

        {pageConfig.accessControl?.showQRCode && (
            <div className="mb-6">
                <div className="flex items-center justify-center gap-x-3 mb-2">
                    <p className="font-semibold text-lg opacity-95">{templateData.qrCodeInfoText}</p>
                    <AuthenticityBadge status={sessionData.verificationStatus} />
                </div>
                <p className="text-xs text-slate-500 mb-4 -mt-1">
                    {sessionData.verificationStatus === 'verified'
                    ? "This ticket's authenticity is secured and can be publicly verified."
                    : "This ticket's authenticity proof is being generated."}
                </p>
                <div className={`w-40 h-40 sm:w-48 sm:h-48 bg-white mx-auto my-4 p-2 flex items-center justify-center rounded-lg border-2 ${theme.inputBorderClass || 'border-slate-300'}`}>
                    <QRCodeCanvas value={sessionData.accessCode || sessionData.sessionId} size={170} />
                </div>
                <Button onClick={() => {}} className={theme.buttonPrimaryClass} size="lg" fullWidth disabled>
                    Redeem Ticket (Preview)
                </Button>
            </div>
        )}

        {templateData.showEventDetails && (
          <div className={`p-4 rounded-md mb-6 ${theme.inputBgClass || 'bg-slate-50'} border ${theme.inputBorderClass || 'border-slate-200'}`}>
            <h3 className={`text-lg font-semibold mb-2 ${accentColorClass}`}>{eventName}</h3>
            <p className="text-sm opacity-80"><strong>When:</strong> {eventDateTime}</p>
            <p className="text-sm opacity-80"><strong>Where:</strong> {eventLocation}</p>
          </div>
        )}

        {/* Display Custom Fields if enabled */}
        {templateData.showSubmittedCustomFields && sessionData.submittedCustomFields && Object.keys(sessionData.submittedCustomFields).length > 0 && (
          <div className={`mb-6 pt-4 border-t ${theme.inputBorderClass || 'border-slate-300'}`}>
            <h3 className="text-md font-semibold opacity-90 mb-2">Ticket Holder Information:</h3>
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

        {templateData.additionalInstructions && (
          <div className="text-sm opacity-80 mb-6">
            <h4 className="font-semibold">Important Information:</h4>
            <p className="whitespace-pre-line">{templateData.additionalInstructions}</p>
          </div>
        )}
        
        <p className="text-xs opacity-60 text-center mt-6">
          Booking ID (Simulated): {sessionData.sessionId} (Mode: {environment.toUpperCase()})
        </p>
      </Card>
    </div>
  );
};

export default EventTicketConfirmedQRDisplay;
