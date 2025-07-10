
import React from 'react';
import { BaseAfterPaymentPageProps, AppointmentBookingIntakeFormAPData } from '../../types';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const AppointmentBookingIntakeFormDisplay: React.FC<BaseAfterPaymentPageProps<AppointmentBookingIntakeFormAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const cardTitle = templateData.title || "One Last Step";
  
  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 'text-blue-600';

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full text-center`}>
        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6 mx-auto ${theme.buttonPrimaryClass.replace('text-white','bg-opacity-20')} ${accentColorClass.replace('text-','bg-')} bg-opacity-20`}>
             <i className={`material-icons-round !text-4xl ${accentColorClass}`}>assignment_turned_in</i>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-2`}>{cardTitle}</h1>
        <p className="opacity-90 mb-4 whitespace-pre-line">{templateData.mainMessage}</p>

        <h2 className={`text-xl font-semibold mb-2 ${accentColorClass}`}>{templateData.formHeadline}</h2>
        {templateData.formDescription && (
            <p className="text-sm opacity-80 mb-6">{templateData.formDescription}</p>
        )}
        
        <div className="my-6">
            <a href={templateData.intakeFormUrl || '#'} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className={theme.buttonPrimaryClass}>
                    {templateData.formButtonText}
                </Button>
            </a>
        </div>
        
        <p className="text-xs opacity-60 text-center mt-8">
          Booking ID (Simulated): {sessionData.sessionId}
        </p>
      </Card>
    </div>
  );
};

export default AppointmentBookingIntakeFormDisplay;
