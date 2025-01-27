import { BrushControls } from './BrushControls';
import { TrashButton } from './TrashButton';
import { ShareButton } from './ShareButton';
import { ColorBar } from './ColorBar';
import { UndoRedoButtons } from './UndoRedoButtons';

interface CanvasControlsProps {
  selectedColor: string;
  selectedBrushSize: number;
  brushOpacity: number;
  hasDrawnWithColor: boolean;
  onBrushSizeChange: (size: number) => void;
  onOpacityChange: (opacity: number) => void;
  onColorChange: (color: string) => void;
  onClear: () => void;
}

export const CanvasControls = ({
  selectedBrushSize,
  brushOpacity,
  hasDrawnWithColor,
  onBrushSizeChange,
  onOpacityChange,
  onColorChange,
  onClear,
}: CanvasControlsProps) => {

  return (
    <>
      <UndoRedoButtons />
      
      <div className="fixed h-24 bottom-0 w-full px-4 p-4 flex justify-start md:justify-center items-center bg-slate-900 border-t border-slate-600">
        <BrushControls 
          size={selectedBrushSize}
          opacity={brushOpacity}
          onSizeChange={onBrushSizeChange}
          onOpacityChange={onOpacityChange}
        />
        <ColorBar 
          onColorChange={onColorChange} 
          hasDrawnWithColor={hasDrawnWithColor}
        />
        <ShareButton />
      </div>

      <TrashButton onClick={onClear} />
    </>
  );
};