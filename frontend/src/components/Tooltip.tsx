import type { ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export const Tooltip = ({
  children,
  content,
  position = "top",
  className = "whitespace-nowrap",
}: TooltipProps) => {
  const getPositionClasses = () => {
    switch (position) {
      case "top":
        return "bottom-full left-1/2 -translate-x-1/2 mb-2";
      case "bottom":
        return "top-full left-1/2 -translate-x-1/2 mt-2";
      case "left":
        return "right-full top-1/2 -translate-y-1/2 mr-2";
      case "right":
        return "left-full top-1/2 -translate-y-1/2 ml-2";
      default:
        return "bottom-full left-1/2 -translate-x-1/2 mb-2";
    }
  };

  const getArrowClasses = () => {
    switch (position) {
      case "top":
        return "bottom-[-4px] left-1/2 -translate-x-1/2";
      case "bottom":
        return "top-[-4px] left-1/2 -translate-x-1/2";
      case "left":
        return "right-[-4px] top-1/2 -translate-y-1/2";
      case "right":
        return "left-[-4px] top-1/2 -translate-y-1/2";
      default:
        return "bottom-[-4px] left-1/2 -translate-x-1/2";
    }
  };

  return (
    <div className="relative group inline-flex items-center justify-center">
      {children}
      <div
        className={`absolute z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs rounded-md py-1.5 px-3 shadow-lg pointer-events-none ${className} ${getPositionClasses()}`}
      >
        {content}
        <div
          className={`absolute w-2.5 h-2.5 bg-gray-900 transform rotate-45 ${getArrowClasses()}`}
        ></div>
      </div>
    </div>
  );
};
