
import React, { useState, useMemo, useEffect } from 'react';
import Modal from './Modal';
import Button from './Button';
import { CURRENCY_SYMBOLS } from '../../constants';

interface ParkingExtendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (hours: number, minutes: number, cost: number) => void;
  baseRatePerHour: number;
  serviceFee?: number;
  currency: string;
  originalEndTime: Date;
  incrementMinutes: number;
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const ParkingExtendModal: React.FC<ParkingExtendModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  baseRatePerHour,
  serviceFee = 0,
  currency,
  originalEndTime,
  incrementMinutes,
}) => {
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    if (isOpen) {
        setHours(1);
        setMinutes(0);
    }
  }, [isOpen]);

  const currencySymbol = CURRENCY_SYMBOLS[currency] || '$';

  const { newEndTime, cost } = useMemo(() => {
    const totalMinutesToAdd = hours * 60 + minutes;
    const newEndTimeValue = new Date(originalEndTime.getTime() + totalMinutesToAdd * 60000);
    const costValue = (baseRatePerHour / 60) * totalMinutesToAdd + serviceFee;
    return { newEndTime: newEndTimeValue, cost: costValue };
  }, [hours, minutes, originalEndTime, baseRatePerHour, serviceFee]);

  const handleTimeChange = (type: 'hours' | 'minutes', delta: number) => {
    if (type === 'hours') {
        setHours(prev => Math.max(0, prev + delta));
    } else {
        let newMinutes = minutes + delta;
        if (newMinutes >= 60) {
            setHours(prev => prev + 1);
            setMinutes(0);
        } else if (newMinutes < 0) {
            if (hours > 0) {
                setHours(prev => prev - 1);
                setMinutes(60 - incrementMinutes);
            } else {
                setMinutes(0);
            }
        } else {
            setMinutes(newMinutes);
        }
    }
  };
  
  const handleConfirmClick = () => {
    if (hours === 0 && minutes === 0) {
        alert("Please select an extension duration.");
        return;
    }
    onConfirm(hours, minutes, cost);
  }

  const Stepper: React.FC<{ label: string; value: number; onDelta: (delta: number) => void; step: number }> = ({ label, value, onDelta, step }) => (
    <div className="flex flex-col items-center">
      <p className="text-sm font-medium text-slate-600 mb-2">{label}</p>
      <button onClick={() => onDelta(step)} className="p-1 w-10 h-10 rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 text-2xl font-light flex items-center justify-center">+</button>
      <input type="text" readOnly value={value} className="w-16 h-12 text-center text-2xl font-bold bg-transparent border-none focus:ring-0" />
      <button onClick={() => onDelta(-step)} className="p-1 w-10 h-10 rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 text-2xl font-light flex items-center justify-center">-</button>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Select time" size="md">
      <div className="space-y-4">
        <div className="flex justify-between items-center text-center py-4">
            <div>
                <p className="text-sm text-slate-500">From today {formatTime(originalEndTime)}</p>
                <i className="material-icons-round text-3xl text-blue-500 my-2">schedule</i>
            </div>
             <div>
                <p className="text-sm text-slate-500">To today</p>
                <p className="text-3xl font-bold text-blue-500">{formatTime(newEndTime)}</p>
            </div>
        </div>
        <div className="flex justify-between items-center text-center -mt-2">
             <div className="text-center w-full">
                <i className="material-icons-round text-3xl text-slate-400">monetization_on</i>
                 <p className="text-3xl font-bold text-slate-700">{currencySymbol}{cost.toFixed(2)}</p>
                 {serviceFee > 0 && <p className="text-xs text-slate-500">Price includes {currencySymbol}{serviceFee.toFixed(2)} in service fee</p>}
            </div>
        </div>
        
        <div className="my-4 p-6 bg-slate-100 rounded-lg flex justify-around">
            <Stepper label="Hours" value={hours} onDelta={(d) => handleTimeChange('hours', d)} step={1}/>
            <Stepper label="Minutes" value={minutes} onDelta={(d) => handleTimeChange('minutes', d)} step={incrementMinutes} />
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            CANCEL
          </Button>
          <Button type="button" onClick={handleConfirmClick} variant="primary">
            BUY MORE TIME
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ParkingExtendModal;
