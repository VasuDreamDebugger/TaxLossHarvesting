import { useState } from 'react';
import { Info, ChevronUp, ChevronDown } from 'lucide-react';

export const InfoBanner = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-[#EAF2FF] border border-[#BFD4FF] rounded-lg mb-8 overflow-hidden">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-blue-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3 text-[#1E293B]">
          <Info className="w-5 h-5 text-primary-start" />
          <h2 className="font-semibold text-sm">Important Notes & Disclaimers</h2>
        </div>
        <button className="text-text-secondary focus:outline-none">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {isExpanded && (
        <div className="px-12 pb-5 pt-1 text-sm text-[#1E293B] space-y-2">
          <ul className="list-disc pl-4 space-y-1">
            <li>Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.</li>
            <li>Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.</li>
            <li>Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.</li>
            <li>Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.</li>
            <li>Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.</li>
          </ul>
        </div>
      )}
    </div>
  );
};
