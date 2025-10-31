
import React from 'react';
import type { Technology } from '../types';
import { TagIcon } from './icons';

interface TechCardProps {
  title: string;
  technologies: Technology[];
}

const TechCard: React.FC<TechCardProps> = ({ title, technologies }) => {
  if (!technologies || technologies.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-900/50 border border-gray-700 rounded-lg overflow-hidden">
      <h3 className="text-md font-semibold px-4 py-3 bg-gray-800/60 text-cyan-400 border-b border-gray-700">{title}</h3>
      <ul className="divide-y divide-gray-700/50">
        {technologies.map((tech, index) => (
          <li key={index} className="px-4 py-3 flex items-start space-x-3">
            <TagIcon className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-200">
                {tech.name} 
                {tech.version && <span className="ml-2 text-xs font-mono bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">{tech.version}</span>}
              </p>
              {tech.details && <p className="text-sm text-gray-400">{tech.details}</p>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TechCard;
