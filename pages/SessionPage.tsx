
import React, { useEffect } from 'react';
import { PageSessionData, SessionStatus, MonetizationUseCase, EventTicketSalesPageLinkConfig, ParkingPageLinkConfig } from '../types';
import { THEMES } from '../constants';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { QRCodeCanvas } from 'qrcode.react';
import CountdownTimer from '../components/common/CountdownTimer';
import AuthenticityBadge from '../components/common/AuthenticityBadge';
import { useTranslation } from '../i18n/I18nContext';

interface SessionPageProps {
  session: PageSessionData;
  onUpdateSession: (sessionId: string, newStatus: SessionStatus) => void;
}

const SessionPage: React.FC<SessionPageProps> = ({ session, onUpdateSession }) => {
  const { t } = useTranslation();
  const theme = THEMES.find(t => t.id === session.pageConfig.pageStyle.theme) || THEMES[0];
  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                         theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                         theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                         theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                         'text-blue-600';

  // Automatically transition parking sessions from PAID to ACTIVE
  useEffect(() => {
    if (session.status === SessionStatus.PAID && session.useCase === MonetizationUseCase.PARKING_SESSION) {
      onUpdateSession(session.sessionId, SessionStatus.ACTIVE);
    }
  }, [session.status, session.useCase, session.sessionId, onUpdateSession]);


  const renderPaidTicketView = () => {
    const pageConfig = session.pageConfig as EventTicketSalesPageLinkConfig;
    const eventName = pageConfig?.eventTitle || "Your Event";
    const attendeeName = (session.submittedCustomFields as any)?.attendee_name;

    const formatEventDateTime = () => {
        if (!pageConfig?.eventDate || !pageConfig?.eventTime) return "Date & Time TBD";
        try {
            const date = new Date(pageConfig.eventDate + 'T' + pageConfig.eventTime + 'Z'); // Assume UTC
            return date.toLocaleString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' });
        } catch {
            return `${pageConfig.eventDate} at ${pageConfig.eventTime}`;
        }
    };
    const eventDateTime = formatEventDateTime();
    const eventLocation = pageConfig?.eventLocation || "Venue TBD";

    return (
        <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full text-center`}>
            <div className="flex justify-center items-center gap-4 mb-2">
                 <h1 className="text-2xl font-bold">{t('sessionPage.ticketTitle', { eventName })}</h1>
                 <AuthenticityBadge status={session.verificationStatus} />
            </div>
            
            {attendeeName && (
                <p className="font-semibold text-lg opacity-90 mb-2">{t('sessionPage.holder', { name: attendeeName })}</p>
            )}

            <p className="opacity-80 mb-6">{t('sessionPage.prompt')}</p>

            <div className={`p-4 rounded-md mb-6 ${theme.inputBgClass || 'bg-slate-50'} border ${theme.inputBorderClass || 'border-slate-200'} text-left`}>
                <p className="text-sm opacity-80 mb-1"><strong>{t('sessionPage.when')}</strong> {eventDateTime}</p>
                <p className="text-sm opacity-80"><strong>{t('sessionPage.where')}</strong> {eventLocation}</p>
            </div>

            <div className={`w-48 h-48 bg-white mx-auto my-4 p-2 flex items-center justify-center rounded-lg border-2 ${theme.inputBorderClass || 'border-slate-300'}`}>
                <QRCodeCanvas value={session.sessionId} size={170} />
            </div>

            {session.accessCode && (
              <div className="text-center mb-4">
                  <a href={`/verify/${session.accessCode}`} target="_blank" rel="noopener noreferrer" className={`text-sm hover:underline ${accentColorClass}`}>
                    {t('sessionPage.verify')}
                    <i className="material-icons-round text-sm align-middle ml-1">open_in_new</i>
                  </a>
              </div>
            )}
            
            <Button onClick={() => onUpdateSession(session.sessionId, SessionStatus.REDEEMED)} className={theme.buttonPrimaryClass} size="lg" fullWidth>
                {t('sessionPage.redeem')}
            </Button>
        </Card>
    );
  };
  
  const renderActiveParkingView = () => {
     const pageConfig = session.pageConfig as ParkingPageLinkConfig;
     const expiresAt = session.timer?.expiresAt;
     if (!expiresAt) return <p>Parking session is active, but expiry time is missing.</p>;

     return (
        <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full text-center`}>
            <h1 className="text-2xl font-bold mb-2">{t('sessionPage.parkingTitle')}</h1>
            <p className="opacity-80 mb-4">{t('sessionPage.location')} {pageConfig.locationName || 'N/A'}</p>
            <p className="opacity-80 mb-4">{t('sessionPage.plate')} {session.parking?.licensePlate || 'N/A'}</p>
            <div className={`p-4 rounded-lg my-4 ${theme.inputBgClass || 'bg-slate-50'}`}>
                <p className="text-sm opacity-80">{t('sessionPage.timeRemaining')}</p>
                <CountdownTimer 
                    expiryTimestamp={expiresAt}
                    onExpire={() => onUpdateSession(session.sessionId, SessionStatus.EXPIRED)}
                    className={`text-4xl font-bold tracking-wider my-2 ${accentColorClass}`}
                />
            </div>
             <p className="text-xs opacity-60">Your session will automatically expire when the timer runs out.</p>
        </Card>
     );
  };

  const renderGenericStateView = (title: string, message: string) => (
    <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full text-center`}>
      <div className="flex justify-center items-center gap-4 mb-2">
         <h1 className={`text-2xl font-bold ${accentColorClass}`}>{title}</h1>
         <AuthenticityBadge status={session.verificationStatus} />
      </div>
      <p className="opacity-90">{message}</p>
      <p className="text-xs opacity-60 mt-4">Session ID: {session.sessionId}</p>
    </Card>
  );

  const renderContent = () => {
    switch (session.status) {
      case SessionStatus.PAID:
        if (session.useCase === MonetizationUseCase.EVENT_TICKET_SALES) {
          return renderPaidTicketView();
        }
        return renderGenericStateView(t('sessionPage.genericSuccess'), t('sessionPage.genericPrepare'));

      case SessionStatus.ACTIVE:
         if (session.useCase === MonetizationUseCase.PARKING_SESSION) {
            return renderActiveParkingView();
         }
         return renderGenericStateView(t('sessionPage.genericActive'), t('sessionPage.genericActiveMessage'));
        
      case SessionStatus.REDEEMED:
        return renderGenericStateView(t('sessionPage.redeemedMessage'), "This ticket has already been used.");
        
      case SessionStatus.EXPIRED:
        return renderGenericStateView(t('sessionPage.expiredMessage'), "This session has expired.");

      case SessionStatus.CANCELLED:
        return renderGenericStateView(t('sessionPage.cancelledMessage'), "This session was cancelled.");
        
      default:
        return renderGenericStateView(t('sessionPage.statusTitle'), t('sessionPage.statusMessage', { status: session.status }));
    }
  };

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center justify-center`}>
      {renderContent()}
    </div>
  );
};

export default SessionPage;
