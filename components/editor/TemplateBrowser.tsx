
import React, { useState } from 'react';
import { Template, MonetizationUseCase } from '../../types';
import { NAV_ITEMS } from '../../constants';
import TemplateSelectorCard from '../common/TemplateSelectorCard';

interface TemplateBrowserProps {
  allTemplates: Template<any>[];
  onRequestTemplatePreview: (template: Template<any>) => void;
}

const TemplateBrowser: React.FC<TemplateBrowserProps> = ({
  allTemplates,
  onRequestTemplatePreview,
}) => {
  const [selectedUseCase, setSelectedUseCase] = useState<MonetizationUseCase>(MonetizationUseCase.FUNDRAISING);

  const templatesForSelectedUseCase = allTemplates.filter(t => t.useCase === selectedUseCase);
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-4">1. Select a Page Type</h3>
        <div className="flex flex-wrap gap-2">
          {NAV_ITEMS.map(navItem => (
            <button
              key={navItem.id}
              type="button"
              onClick={() => setSelectedUseCase(navItem.id)}
              className={`py-2 px-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2
                          ${selectedUseCase === navItem.id 
                            ? 'bg-orange-500 text-white shadow-md' 
                            : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                          }`}
            >
              <i className="material-icons-round text-lg">{navItem.icon}</i>
              <span>{navItem.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-4">2. Choose a Starting Template</h3>
        {templatesForSelectedUseCase.length > 0 ? (
          <TemplateSelectorCard
            useCase={selectedUseCase}
            templates={templatesForSelectedUseCase}
            onRequestPreview={onRequestTemplatePreview}
          />
        ) : (
          <p className="text-slate-500 text-sm p-4 bg-slate-100 rounded-md">No templates found for this page type.</p>
        )}
      </div>
    </div>
  );
};

export default TemplateBrowser;
