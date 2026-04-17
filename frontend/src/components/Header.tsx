
import { Tooltip } from './Tooltip';

export const Header = () => {
  return (
    <div className="flex flex-col space-y-4 mb-6">
      {/* Top Navbar Simulation */}
      <div className="flex items-center pb-4 border-b border-gray-200 w-full">
        <div className="text-2xl font-bold text-primary-start flex items-center">
          Koin<span className="text-orange-400">X</span>
        </div>
      </div>
      
      {/* Page Title */}
      <div className="flex items-center space-x-4 pt-2">
        <h1 className="text-2xl font-bold text-text-primary">Tax Harvesting</h1>
        <Tooltip 
          content="Tax-loss harvesting is the practice of selling assets at a loss to offset capital gains tax liability. Select assets below that are at a loss to see your potential tax savings." 
          position="right"
          className="w-64 whitespace-normal leading-relaxed"
        >
          <a href="#" className="text-sm text-primary-start hover:underline flex items-center cursor-help">
            How it works?
          </a>
        </Tooltip>
      </div>
    </div>
  );
};
