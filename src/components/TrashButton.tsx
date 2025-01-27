export const TrashButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      className={`fixed right-4 top-4 z-20 opacity-30 hover:opacity-100 p-2 rounded-full m-2 cursor-pointer flex items-center justify-center`}
      onClick={onClick}
    >
      <svg color="#ffffff" viewBox="0 0 256 256" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
        <rect fill="none" height="256" width="256"/>
        <path d="M64,112V40a8,8,0,0,1,8-8H184a8,8,0,0,1,8,8v72" fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
        <line fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" x1="96" x2="112" y1="64" y2="64"/>
        <path d="M216,112a88,88,0,0,1-176,0Z" fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
        <path d="M93.6,193l-4.3,29.9a8,8,0,0,0,7.9,9.1h61.6a8,8,0,0,0,7.9-9.1L162.4,193" fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
      </svg>
    </div>
  );
}; 