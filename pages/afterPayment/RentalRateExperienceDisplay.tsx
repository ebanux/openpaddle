import React, { useState } from 'react';
import { BaseAfterPaymentPageProps, RentalRateExperienceAPData } from '../../types';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const StarRating: React.FC<{ rating: number; onRatingChange: (rating: number) => void }> = ({ rating, onRatingChange }) => {
  return (
    <div className="flex justify-center space-x-2 text-4xl">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRatingChange(star)}
          className={`transition-colors duration-150 ${star <= rating ? 'text-yellow-400' : 'text-slate-300 hover:text-yellow-300'}`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const RentalRateExperienceDisplay: React.FC<BaseAfterPaymentPageProps<RentalRateExperienceAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const cardTitle = templateData.title || "Rate Your Experience";
  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 'text-blue-600';

  const handleSubmit = () => {
    console.log({ rating, feedback });
    setSubmitted(true);
  };

  if (submitted) {
    return (
        <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
            <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full text-center`}>
                 <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6 mx-auto ${theme.buttonPrimaryClass.replace('text-white','bg-opacity-20')} ${accentColorClass.replace('text-','bg-')} bg-opacity-20`}>
                    <i className={`material-icons-round !text-4xl ${accentColorClass}`}>check_circle</i>
                </div>
                <h1 className={`text-2xl font-bold`}>Thank You!</h1>
                <p className="opacity-90 mt-2">Your feedback has been submitted.</p>
            </Card>
        </div>
    )
  }

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full`}>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-2 text-center`}>{cardTitle}</h1>
        <p className="text-center opacity-90 mb-6 whitespace-pre-line">{templateData.mainMessage}</p>

        <h2 className={`text-xl font-semibold mb-4 text-center ${accentColorClass}`}>{templateData.ratingHeadline}</h2>

        <div className="mb-6">
          <StarRating rating={rating} onRatingChange={setRating} />
        </div>
        
        <div className="mb-6">
          <label htmlFor="feedback-text" className="block text-sm font-medium text-slate-700 mb-1">
            {templateData.feedbackPrompt}
          </label>
          <textarea
            id="feedback-text"
            rows={3}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className={`w-full p-2 border rounded-md shadow-sm ${theme.inputBgClass || 'bg-slate-100'} ${theme.inputBorderClass || 'border-slate-300'}`}
            placeholder="Tell us more..."
          />
        </div>

        <Button fullWidth onClick={handleSubmit} className={theme.buttonPrimaryClass}>
          Submit Feedback
        </Button>
        
        <p className="text-xs opacity-60 text-center mt-8">
          Rental ID: {sessionData.sessionId}
        </p>
      </Card>
    </div>
  );
};

export default RentalRateExperienceDisplay;
