
import React from 'react';
import type { TechStack, TechCategory } from '../types';
import Loader from './Loader';
import TechCard from './TechCard';

interface AnalysisResultProps {
  result: TechStack | null;
  isLoading: boolean;
  error: string | null;
}

const categoryTitles: Record<TechCategory, string> = {
    contentManagementSystem: 'Content Management System',
    serverSideLanguages: 'Server-side Languages',
    clientSideLanguages: 'Client-side Languages',
    jsLibraries: 'JavaScript Libraries',
    reverseProxyServices: 'Reverse Proxy / CDN',
    dnsProvider: 'DNS Provider',
    sslCertificateAuthorities: 'SSL Certificate Authorities',
    trafficAnalysisTools: 'Traffic Analysis Tools',
    advertisingNetworks: 'Advertising Networks',
    tagManagers: 'Tag Managers',
    siteElements: 'Site Elements',
    structuredDataFormats: 'Structured Data Formats',
    imageFormats: 'Image File Formats',
    topLevelDomain: 'Top Level Domain',
    contentLanguage: 'Content Language',
};

const orderedCategories: TechCategory[] = [
    'contentManagementSystem',
    'serverSideLanguages',
    'clientSideLanguages',
    'jsLibraries',
    'reverseProxyServices',
    'dnsProvider',
    'sslCertificateAuthorities',
    'trafficAnalysisTools',
    'advertisingNetworks',
    'tagManagers',
    'siteElements',
    'structuredDataFormats',
    'imageFormats',
    'topLevelDomain',
    'contentLanguage',
];


const AnalysisResult: React.FC<AnalysisResultProps> = ({ result, isLoading, error }) => {
  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (error) {
      return <div className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</div>;
    }

    if (!result) {
      return (
        <div className="text-center text-gray-400">
          <p className="text-lg">Results will be displayed here.</p>
          <p className="text-sm">Paste some HTML and click "Analyze" to begin.</p>
        </div>
      );
    }
    
    const categoriesWithData = orderedCategories.filter(
        (key) => result[key] && result[key]!.length > 0
    );

    if (categoriesWithData.length === 0) {
        return <div className="text-center text-gray-400">No technologies could be identified from the provided HTML.</div>
    }

    return (
      <div className="space-y-6">
        {categoriesWithData.map((key) => (
          <TechCard 
            key={key}
            title={categoryTitles[key]}
            technologies={result[key]!}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-4 text-cyan-300">Analysis Results</h2>
      <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
        {renderContent()}
      </div>
    </div>
  );
};

export default AnalysisResult;
