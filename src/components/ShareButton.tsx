import { useRef } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

export const ShareButton = () => {
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    try {
      const blob = await window.tatami.api.saveCurrentImage() as Blob;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `drawing-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Failed to download image:', err);
    }
  };

  return (
    <>
      <div
        ref={buttonRef}
        className="relative w-12 h-12 min-w-12 min-h-12 rounded-full p-2 ml-3 cursor-pointer flex items-center justify-center hover:bg-gray-700 transition-colors"
        onClick={handleDownload}
      >
        <ArrowDownTrayIcon className="w-8 h-8 min-w-8 min-h-8 p-1 text-white" />
      </div>
    </>
  );
};