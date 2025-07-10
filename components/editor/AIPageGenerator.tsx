
import React, { useState } from 'react';
import Button from '../common/Button';

interface AIPageGeneratorProps {
  onGenerate: (prompt: string) => void;
}

const AIPageGenerator: React.FC<AIPageGeneratorProps> = ({ onGenerate }) => {
  const [prompt, setPrompt] = useState('');

  const handleGenerateClick = () => {
    if (prompt.trim()) {
      onGenerate(prompt.trim());
    }
  };

  return (
    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-dashed border-blue-300 rounded-xl shadow-inner space-y-3">
      <h2 className="text-md font-bold text-slate-800">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
          Generate with AI
        </span>
      </h2>
      <p className="text-xs text-slate-600">
        Describe the page you want to create, and let AI build it for you.
      </p>
      <div>
        <textarea
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'Create a page to sell tickets for a local bake sale fundraiser'"
          className="w-full p-2 text-sm border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <Button
        onClick={handleGenerateClick}
        variant="primary"
        fullWidth
        disabled={!prompt.trim()}
      >
        ✨ Generate Page
      </Button>
    </div>
  );
};

export default AIPageGenerator;
