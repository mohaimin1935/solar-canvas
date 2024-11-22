import { CableIcon, CopyIcon, EraserIcon, HandIcon, MousePointer2Icon } from "lucide-react";
import { cn } from "../lib/utils";

const tools = [
  {
    name: "select",
    icon: <MousePointer2Icon className="size-4" />,
  },
  {
    name: "hand",
    icon: <HandIcon className="size-4" />,
  },
  {
    name: "copy",
    icon: <CopyIcon className="size-4" />,
  },
  {
    name: "erase",
    icon: <EraserIcon className="size-4" />,
  },
  {
    name: "wire",
    icon: <CableIcon className="size-4" />,
  }
]

export const Toolbar = ({ mode, setMode }) => {
  return (
    <div className="absolute left-2 inset-y-0 flex items-center">
      <div className="p-1 rounded bg-gray-100 flex flex-col items-center gap-1">
      {tools.map((tool, index) => (
        <div 
          key={index} 
          className={cn(
            "p-2 rounded bg-slate-100 hover:bg-slate-300 transition-colors duration-100 cursor-pointer",
            mode===tool.name && "bg-slate-300"
          )} 
            onClick={(e) => { 
              e.stopPropagation(); 
              setMode(tool.name);
            }}
          >
        {tool.icon}
      </div>
    ))}
      </div>
    </div>
  );
};
