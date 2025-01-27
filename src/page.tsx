/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useEffect, useState } from 'react';
import { CanvasControls } from './components/CanvasControls';

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'tatami-canvas': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'paper-width'?: string;
        'paper-height'?: string;
        'paper-color'?: string;
      };
    }
  }
}
  
interface TatamiAPI {
  undo(): unknown;
  redo(): unknown;
  saveCurrentImage(): unknown;
  centerCanvas: () => void;
  zoom: (scale: number, x: number, y: number) => void;
  setBrushSize: (size: number) => void;
  setColor: (color: string) => void;
  clearAll: () => void;
  setBrushOpacity: (opacity: number) => void;
}

interface Tatami {
  api: TatamiAPI;
  utils: {
    limitImageSize(arg0: { url: string; maxSize: number; }): unknown;
    loadAsset(options: { src: string }): Promise<unknown>;
    loadBrushPackage: (options: { url: string }) => void;
    hslToRgb: (h: number, s: number, l: number) => [number, number, number];
    rgbToHex: (rgb: { r: number; g: number; b: number }) => string;
  };
}

declare global {
  interface Window {
    tatami: Tatami;
  }
}

export default function Home() {
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
  const [selectedColor, setSelectedColor] = React.useState('#000000');
  const [selectedBrushSize, setSelectedBrushSize] = React.useState(10);
  const [brushOpacity, setBrushOpacity] = React.useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasDrawnWithColor, setHasDrawnWithColor] = useState(false);

  useEffect(() => {
    setDimensions({
      width: window.innerWidth * window.devicePixelRatio,
      height: window.innerHeight * window.devicePixelRatio
    });
    window.addEventListener("message", launchStuff);

    return () => {
      window.removeEventListener("message", launchStuff);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  interface LaunchMessage extends MessageEvent {
    data: {
      [x: string]: string;
      tatami: string;
    };
  }

  const launchStuff = (e: LaunchMessage) => {
    // console.log(e.data)
    if (e.data.tatami === 'ready') {
      setTimeout(async () => {
        // window.tatami.api.zoom(1.25, window.innerWidth / 2, window.innerHeight / 2);
        // Load brush package
        await window.tatami.utils.loadBrushPackage({
          url: 'https://cdn.sumo.app/brush_packages/brushes/plain_sharp.lzma',
        })
        // Set brush size and color
        await window.tatami.api.setBrushSize(10 * window.devicePixelRatio);
        await window.tatami.api.setColor('#0095ff');
        setIsLoading(false);
      }, 100);
    }
    if (e.data.command === 'layers_changed') {
      setHasDrawnWithColor(true);
      setTimeout(() => setHasDrawnWithColor(false), 100);
    }
  };

  const handleBrushSizeChange = (size: number) => {
    window.tatami.api.setBrushSize(size * window.devicePixelRatio);
    setSelectedBrushSize(size);
  };

  const handleColorChange = (color: string) => {
    window.tatami.api.setColor(color);
    setSelectedColor(color);
  };

  const handleOpacityChange = (opacity: number) => {
    window.tatami.api.setBrushOpacity(opacity);
    setBrushOpacity(opacity);
  };

  const handleClear = () => {
    window.tatami.api.clearAll();
  };

  return (
    <main className="relative w-screen h-screen">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="w-full h-full bg-blue-500 animate-[loading_1s_ease-in-out_infinite]"></div>
            </div>
          </div>
        </div>
      )}
      <div className="fixed top-0 left-0 right-0 bottom-24 z-0">
        <tatami-canvas
          paper-width='1024'
          paper-height='1024'
          paper-color="#ffffff"
        ></tatami-canvas>
      </div>

      <CanvasControls 
        selectedColor={selectedColor}
        selectedBrushSize={selectedBrushSize}
        brushOpacity={brushOpacity}
        onBrushSizeChange={handleBrushSizeChange}
        onOpacityChange={handleOpacityChange}
        onColorChange={handleColorChange}
        onClear={handleClear}
        hasDrawnWithColor={hasDrawnWithColor}
      />
    </main>
  );
}
