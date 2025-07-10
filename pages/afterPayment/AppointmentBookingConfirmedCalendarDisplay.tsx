
import React from 'react';
import { BaseAfterPaymentPageProps, AppointmentBookingConfirmedCalendarAPData, AppointmentBookingPageLinkConfig } from '../../types';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const AppointmentBookingConfirmedCalendarDisplay: React.FC<BaseAfterPaymentPageProps<AppointmentBookingConfirmedCalendarAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const cardTitle = templateData.title || "Appointment Confirmed";
  const pageConfig = sessionData.pageConfig as AppointmentBookingPageLinkConfig;
  const serviceName = pageConfig?.serviceTitle || "Your Service";
  
  const appointmentDetails = sessionData.paymentDetails.items[0]?.name || serviceName; 
  const appointmentDateTime = "Details will be confirmed via email shortly.";

  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 'text-blue-600';

  // In a real app, these links would be generated with real event data
  const googleLink = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Your+Appointment&details=Details+about+your+service&location=Online";
  const outlookLink = "https://outlook.live.com/owa/?path=/calendar/action/compose&subject=Your+Appointment&body=Details+about+your+service&location=Online";

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full`}>
        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6 mx-auto ${theme.buttonPrimaryClass.replace('text-white','bg-opacity-20')} ${accentColorClass.replace('text-','bg-')} bg-opacity-20`}>
             <i className={`material-icons-round !text-4xl ${accentColorClass}`}>event_available</i>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-2 text-center`}>{cardTitle}</h1>
        <p className="text-center opacity-90 mb-4 whitespace-pre-line">{templateData.mainMessage}</p>
        <h2 className={`text-xl font-semibold mb-4 text-center ${accentColorClass}`}>{templateData.confirmationHeadline}</h2>
        
        {templateData.showAppointmentDetails && (
          <div className={`p-4 rounded-md mb-6 ${theme.inputBgClass || 'bg-slate-50'} border ${theme.inputBorderClass || 'border-slate-200'}`}>
            <p className="text-md font-medium"><strong>Service:</strong> {appointmentDetails}</p>
            <p className="text-sm opacity-80"><strong>Date & Time:</strong> {appointmentDateTime}</p>
          </div>
        )}

        {templateData.showAddToCalendar && (
          <div className="mb-6 text-center">
            <h3 className="text-md font-semibold opacity-90 mb-3">Add to your calendar:</h3>
            <div className="flex justify-center gap-3">
              <a href={googleLink} target="_blank" rel="noopener noreferrer" className={`px-4 py-2 text-sm rounded-md flex items-center gap-2 ${theme.buttonSecondaryClass}`}>Google</a>
              <a href={outlookLink} target="_blank" rel="noopener noreferrer" className={`px-4 py-2 text-sm rounded-md flex items-center gap-2 ${theme.buttonSecondaryClass}`}>Outlook</a>
            </div>
          </div>
        )}
        
        <p className="text-xs opacity-60 text-center mt-8">
          Booking ID (Simulated): {sessionData.sessionId}
        </p>
      </Card>
    </div>
  );
};

export default AppointmentBookingConfirmedCalendarDisplay;
