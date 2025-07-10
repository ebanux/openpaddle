
import React from 'react';
import { Template, MonetizationUseCase, AfterPaymentTemplate } from '../../types';

interface TemplateSelectorCardProps {
  useCase: MonetizationUseCase; 
  templates: (Template<any> | AfterPaymentTemplate<any>)[];
  onRequestPreview: (template: Template<any> | AfterPaymentTemplate<any>) => void;
}

const TemplateSelectorCard: React.FC<TemplateSelectorCardProps> = ({
  templates,
  onRequestPreview,
}) => {
  if (!templates || templates.length === 0) {
    return (
      <div className="p-4 text-center text-slate-500 bg-slate-50 rounded-lg shadow-inner">
        No templates available for this page type.
      </div>
    );
  }

  return (
    <div className="flex space-x-3 overflow-x-auto pb-2 -mx-1 px-1">
      {templates.map((template) => {
        const isFromScratch = template.name.toLowerCase().includes('from scratch');
        return (
          <button
            key={template.id}
            onClick={() => onRequestPreview(template)} // Pass the full template object
            className={`text-left p-3 rounded-lg border transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 hover:shadow-lg
              w-44 h-full flex flex-col flex-shrink-0 
              ${isFromScratch 
                ? 'border-dashed border-blue-500 bg-white hover:bg-blue-50' 
                : 'border-slate-300 bg-white hover:border-blue-400 hover:bg-slate-50'
              }
            `}
            aria-label={`Select template: ${template.name}`}
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className={`w-8 h-8 rounded-md flex items-center justify-center text-lg shrink-0 ${template.previewColorClass} ${template.previewIconColorClass}`}>
                <i className="material-icons-round text-xl">{template.previewIcon}</i>
              </div>
              <h3 className="font-semibold text-xs text-slate-700 flex-grow leading-tight">{template.name}</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 line-clamp-3 flex-grow">{template.description}</p>
          </button>
        );
      })}
    </div>
  );
};

export default TemplateSelectorCard;
