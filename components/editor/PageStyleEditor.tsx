
import React from 'react';
import { PageStyle } from '../../types';
import { THEMES, ThemeDefinition } from '../../constants';

interface PageStyleEditorProps {
  currentStyle: PageStyle;
  onStyleChange: (newStyle: PageStyle) => void;
}

const PageStyleEditor: React.FC<PageStyleEditorProps> = ({ currentStyle, onStyleChange }) => {
  const handleThemeChange = (themeId: string) => {
    onStyleChange({ ...currentStyle, theme: themeId });
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Select Page Theme</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {THEMES.map((theme: ThemeDefinition) => {
          const isSelected = currentStyle.theme === theme.id;
          const ringColor = theme.buttonPrimaryClass.includes('sky') ? 'ring-sky-500' :
                            theme.buttonPrimaryClass.includes('cyan') ? 'ring-cyan-500' :
                            theme.buttonPrimaryClass.includes('red') ? 'ring-red-500' :
                            theme.buttonPrimaryClass.includes('lime') ? 'ring-lime-500' :
                            theme.buttonPrimaryClass.includes('stone') ? 'ring-stone-500' :
                            'ring-blue-500';
          return (
            <button
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
              className={`w-full p-3 border rounded-lg text-left transition-all duration-150 ease-in-out focus:outline-none 
                          ${isSelected 
                              ? `ring-2 ring-offset-1 ${ringColor} shadow-xl scale-105` 
                              : 'hover:shadow-md'
                          }
                          ${theme.bgClass} ${theme.textClass} /* Apply theme preview to the button itself */
              `}
              aria-pressed={isSelected}
            >
              <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{theme.name}</span>
                  {isSelected && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
                           className={`w-5 h-5 ${theme.buttonPrimaryClass.includes('text-white') ? 'text-white' : 
                                               theme.buttonPrimaryClass.includes('text-slate-900') ? 'text-slate-900' : 
                                               theme.buttonPrimaryClass.includes('text-green-900') ? 'text-green-900' : 
                                               theme.buttonPrimaryClass.includes('text-amber-50') ? 'text-amber-50' : 
                                               ringColor.replace('ring-','text-')}`}>
                          <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.06 0l4-5.5Z" clipRule="evenodd" />
                      </svg>
                  )}
              </div>
              <div className="mt-2 text-xs opacity-80">
                Example Card & Button:
              </div>
              <div className={`mt-1 p-2 rounded-md ${theme.cardBgClass} shadow-inner text-xs`}>
                <span className={`${theme.textClass} opacity-90`}>Card Content</span>
                <div className={`mt-1 py-0.5 px-1.5 rounded ${theme.buttonPrimaryClass} text-center text-xs`}>
                   Primary Btn
                </div>
              </div>
            </button>
          );
        })}
      </div>
       <p className="mt-4 text-xs text-slate-500">
        The selected theme will apply to the page preview on the right. Form input styles may also change.
      </p>
    </div>
  );
};

export default PageStyleEditor;
