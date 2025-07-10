
import React, { useState } from 'react';
import { BaseAfterPaymentPageProps, FundraisingUpdatesSignupAPData } from '../../types';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const FundraisingUpdatesSignupDisplay: React.FC<BaseAfterPaymentPageProps<FundraisingUpdatesSignupAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const cardTitle = templateData.title || "Stay Updated";
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                         theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                         theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                         theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                         'text-blue-600';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log(`(Simulated) Subscribing ${email} to updates.`);
      setIsSubscribed(true);
    }
  };

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full text-center`}>
        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6 mx-auto ${theme.buttonPrimaryClass.replace('text-white','bg-opacity-20').replace('text-slate-900','bg-opacity-20').replace('text-green-900','bg-opacity-20')} ${accentColorClass.replace('text-','bg-')} bg-opacity-20`}>
            <i className={`material-icons-round !text-4xl ${accentColorClass}`}>mail</i>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-2`}>{cardTitle}</h1>
        <p className="opacity-90 mb-6 whitespace-pre-line">{templateData.mainMessage}</p>

        <h2 className={`text-xl font-semibold mb-3 ${accentColorClass}`}>{templateData.signupHeadline}</h2>
        {templateData.signupBlurb && (
            <p className="text-sm opacity-80 mb-6">{templateData.signupBlurb}</p>
        )}

        {templateData.showEmailSignupForm && !isSubscribed && (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 ${theme.inputBgClass || 'bg-slate-50'} ${theme.inputTextClass || ''} ${theme.inputBorderClass || 'border-slate-300'}`}
              required
            />
            <Button type="submit" fullWidth className={theme.buttonPrimaryClass}>
              {templateData.formButtonText || "Subscribe"}
            </Button>
          </form>
        )}

        {isSubscribed && (
             <div className="p-4 rounded-lg bg-green-100 text-green-800 border border-green-200">
                <p className="font-semibold">Thank you for subscribing!</p>
            </div>
        )}

        <p className="text-xs opacity-60 text-center mt-8">
          Transaction ID (Simulated): {sessionData.sessionId} (Mode: {environment.toUpperCase()})
        </p>
      </Card>
    </div>
  );
};

export default FundraisingUpdatesSignupDisplay;
