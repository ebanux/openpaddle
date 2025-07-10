

import React, { useState, useEffect } from 'react';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { SchemaProperty } from '../../types';
import Modal from '../common/Modal';
import Button from '../common/Button';

interface AIGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (newValue: string) => void;
  config: SchemaProperty['aiGenConfig'];
  fieldLabel: string;
  contextValue?: string;
  currentValue?: string;
}

const Spinner: React.FC = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const AIGenerationModal: React.FC<AIGenerationModalProps> = ({
  isOpen,
  onClose,
  onGenerate,
  config,
  fieldLabel,
  contextValue,
  currentValue,
}) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
        let basePrompt = '';
        if (config?.type === 'text') {
            basePrompt = `Generate a compelling and creative ${fieldLabel.toLowerCase()}`;
            if (contextValue) {
                basePrompt += ` with the subject "${contextValue}"`;
            }
            basePrompt += '.';
        } else if (config?.type === 'image') {
            basePrompt = `A high-quality, professional photo of ${contextValue || `an image for "${fieldLabel}"`}.`;
            if (currentValue) {
                basePrompt = currentValue;
            }
        }
        setPrompt(basePrompt);
    }
  }, [isOpen, config, fieldLabel, contextValue, currentValue]);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);
    
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      setError("API_KEY is not configured in the environment. AI features are disabled.");
      setIsLoading(false);
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey });

      if (config?.type === 'text') {
        const response: GenerateContentResponse = await ai.models.generateContent({
          model: 'gemini-2.5-flash-preview-04-17',
          contents: prompt,
        });
        const text = response.text?.trim();
        if (text) {
          setGeneratedContent(text);
        } else {
          throw new Error("Received an empty response from the AI.");
        }
      } else if (config?.type === 'image') {
        const response = await ai.models.generateImages({
          model: 'imagen-3.0-generate-002',
          prompt: prompt,
          config: { numberOfImages: 1, outputMimeType: 'image/jpeg' },
        });
        
        if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image.imageBytes) {
          const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
          const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
          setGeneratedContent(imageUrl);
        } else {
          throw new Error("The AI did not return a valid image.");
        }
      }
    } catch (e: any) {
      console.error("AI Generation Error:", e);
      setError(e.message || "An unexpected error occurred while generating content.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = () => {
    if (generatedContent) {
      onGenerate(generatedContent);
    }
    handleClose();
  };

  const handleClose = () => {
    setPrompt('');
    setGeneratedContent(null);
    setError(null);
    setIsLoading(false);
    onClose();
  };


  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={`Generate ${fieldLabel} with AI`}>
      <div className="space-y-4">
        <div>
          <label htmlFor="ai-prompt" className="block text-sm font-medium text-slate-700 mb-1">
            Your Prompt
          </label>
          <textarea
            id="ai-prompt"
            rows={4}
            className="mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={config?.promptHint || 'Enter your instructions for the AI...'}
          />
        </div>
        
        <Button onClick={handleGenerate} disabled={isLoading || !prompt} fullWidth>
          {isLoading ? <Spinner /> : `✨ Generate ${config?.type === 'image' ? 'Image' : 'Text'}`}
        </Button>
        
        {error && (
          <div className="p-3 bg-red-100 border border-red-200 text-red-700 text-sm rounded-md">
            <strong>Error:</strong> {error}
          </div>
        )}

        {generatedContent && (
          <div className="p-3 border-t border-slate-200">
            <h4 className="font-semibold text-slate-700 mb-2">Result:</h4>
            {config?.type === 'text' ? (
              <div className="p-3 bg-slate-100 rounded-md text-sm text-slate-800 whitespace-pre-wrap max-h-60 overflow-y-auto">
                {generatedContent}
              </div>
            ) : (
              <img src={generatedContent} alt="AI generated content" className="rounded-lg shadow-md max-w-full max-h-64 mx-auto" />
            )}
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleAccept} disabled={!generatedContent || isLoading}>
            Accept & Use
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AIGenerationModal;
