import { ArrowUturnLeftIcon, ArrowUturnRightIcon } from '@heroicons/react/24/outline';

export const UndoRedoButtons = () => {
  const handleUndo = () => {
    window.tatami.api.undo();
  };

  const handleRedo = () => {
    window.tatami.api.redo();
  };

  return (
    <>
      {/* Undo Button */}
      <button
        onClick={handleUndo}
        className="fixed md:left-4 md:top-1/2 md:-translate-y-1/2 left-4 bottom-28 w-12 h-12 rounded-full bg-slate-800 border border-slate-600 opacity-30 hover:opacity-100 transition-opacity flex items-center justify-center"
        title="Undo"
      >
        <ArrowUturnLeftIcon className="w-6 h-6 text-white" />
      </button>

      {/* Redo Button */}
      <button
        onClick={handleRedo}
        className="fixed md:right-4 md:top-1/2 md:-translate-y-1/2 right-4 bottom-28 w-12 h-12 rounded-full bg-slate-800 border border-slate-600 opacity-30 hover:opacity-100 transition-opacity flex items-center justify-center"
        title="Redo"
      >
        <ArrowUturnRightIcon className="w-6 h-6 text-white" />
      </button>
    </>
  );
}; 