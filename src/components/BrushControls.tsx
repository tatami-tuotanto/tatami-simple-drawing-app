import { useState, useRef, useEffect } from 'react';

interface BrushControlsProps {
  size: number;
  opacity: number;
  onSizeChange: (size: number) => void;
  onOpacityChange: (opacity: number) => void;
}

interface BrushType {
  id: string;
  name: string;
  icon: string;
  package: string;
}

const brushTypes: BrushType[] = [
  {
    id: 'marker',
    name: 'Marker Pen',
    icon: '🖊️',
    package: 'https://cdn.sumo.app/brush_packages/brushes/plain_sharp.lzma'
  },
  {
    id: 'ballpoint',
    name: 'Ballpoint Pen',
    icon: '🖋️',
    package: 'https://cdn.sumo.app/brush_packages/pencils/ballpoint.lzma'
  },
  {
    id: 'pencil',
    name: 'Color Pencil',
    icon: '✏️',
    package: 'https://cdn.sumo.app/brush_packages/pencils/pencil.lzma'
  },
  {
    id: 'paint',
    name: 'Oil Paint',
    icon: '🎨',
    package: 'https://cdn.sumo.app/brush_packages/brushes/oil.lzma'
  },
];

export const BrushControls = ({ size, opacity, onSizeChange, onOpacityChange }: BrushControlsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBrush, setSelectedBrush] = useState(brushTypes[0]);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleBrushSelect = async (brush: BrushType) => {
    setSelectedBrush(brush);
    await window.tatami.utils.loadBrushPackage({
      url: brush.package
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <div
        ref={buttonRef}
        className="relative rounded-full w-12 h-12 min-w-12 min-h-12 p-2 mr-3 cursor-pointer flex items-center justify-center hover:bg-gray-700 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-2xl">{selectedBrush.icon}</span>

        {isOpen && (
          <div
            ref={popupRef}
            className="absolute bottom-20 left-0 mb-2 bg-slate-800 rounded-lg p-4 border border-slate-600 shadow-lg min-w-[230px]"
          >
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 justify-center flex-wrap">
                {brushTypes.map((brush) => (
                  <button
                    key={brush.id}
                    onClick={() => handleBrushSelect(brush)}
                    className={`p-2 rounded-lg transition-colors ${
                      selectedBrush.id === brush.id 
                        ? 'bg-slate-600' 
                        : 'hover:bg-slate-700'
                    }`}
                    title={brush.name}
                  >
                    <span className="text-2xl">{brush.icon}</span>
                  </button>
                ))}
              </div>

              <div className="flex flex-col items-center gap-1">
                <label className="text-sm text-gray-100">Size</label>
                <input
                  type="range"
                  min="1"
                  max="256"
                  value={size}
                  onChange={(e) => onSizeChange(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-gray-500 text-sm">{size}px</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <label className="text-sm text-gray-100">Opacity</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={opacity * 100}
                  onChange={(e) => onOpacityChange(Number(e.target.value) / 100)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-gray-500 text-sm">{Math.round(opacity * 100)}%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}; 