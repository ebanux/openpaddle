
import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  expiryTimestamp: string;
  onExpire: () => void;
  className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ expiryTimestamp, onExpire, className }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(expiryTimestamp) - +new Date();
    let timeLeft = {
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (newTimeLeft.hours === 0 && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        if (+new Date(expiryTimestamp) - +new Date() < 1000) {
            onExpire();
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [
    String(timeLeft.hours).padStart(2, '0'),
    String(timeLeft.minutes).padStart(2, '0'),
    String(timeLeft.seconds).padStart(2, '0')
  ];

  const hasExpired = timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <div className={className}>
      {hasExpired ? <span>Expired!</span> : <span>{timerComponents.join(':')}</span>}
    </div>
  );
};

export default CountdownTimer;
