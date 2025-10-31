
import React from 'react';
import { AnalyzeIcon } from './icons';

interface HtmlInputProps {
  htmlContent: string;
  setHtmlContent: (content: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

const HtmlInput: React.FC<HtmlInputProps> = ({ htmlContent, setHtmlContent, onAnalyze, isLoading }) => {
  return (
    <div className="flex flex-col bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 h-full">
      <h2 className="text-lg font-semibold mb-4 text-cyan-300">Paste HTML Content</h2>
      <textarea
        value={htmlContent}
        onChange={(e) => setHtmlContent(e.target.value)}
        placeholder="Paste the full HTML source code of a website here..."
        className="flex-grow w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-shadow resize-none font-mono text-sm"
        disabled={isLoading}
      />
      <button
        onClick={onAnalyze}
        disabled={isLoading || !htmlContent}
        className="mt-4 w-full flex items-center justify-center px-4 py-3 bg-cyan-600 text-white font-bold rounded-md hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 disabled:scale-100"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing...
          </>
        ) : (
          <>
            <AnalyzeIcon className="h-5 w-5 mr-2" />
            Analyze Technologies
          </>
        )}
      </button>
    </div>
  );
};

export default HtmlInput;
