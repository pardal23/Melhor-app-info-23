
import React, { useState, useCallback } from 'react';
import { analyzeHtml } from './services/geminiService';
import type { TechStack } from './types';
import HtmlInput from './components/HtmlInput';
import AnalysisResult from './components/AnalysisResult';
import { GithubIcon } from './components/icons';

const App: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<TechStack | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (!htmlContent.trim()) {
      setError('HTML content cannot be empty.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeHtml(htmlContent);
      setAnalysisResult(result);
    } catch (e) {
      console.error(e);
      setError('Failed to analyze HTML. The content might be invalid or the API call failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [htmlContent]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col font-sans">
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl md:text-2xl font-bold text-cyan-400">
              Tech Stack Analyzer
            </h1>
            <a 
              href="https://github.com/google/generative-ai-docs/tree/main/site/en/gemini-api/docs/get-started/tutorial?app=react" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <GithubIcon className="h-6 w-6" />
            </a>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          <HtmlInput 
            htmlContent={htmlContent}
            setHtmlContent={setHtmlContent}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
          />
          <AnalysisResult 
            result={analysisResult}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>

      <footer className="text-center py-4 text-sm text-gray-500 border-t border-gray-800">
          Powered by the Gemini API
      </footer>
    </div>
  );
};

export default App;
