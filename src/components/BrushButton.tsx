interface BrushButtonProps {
  size: number;
  padding: string;
  isSelected: boolean;
  onClick: () => void;
}

export const BrushButton = ({ size, padding, isSelected, onClick }: BrushButtonProps) => {
  return (
    <div
      className={`rounded-full ${padding} m-2 cursor-pointer`}
      style={{
        backgroundColor: '#000000',
        border: isSelected ? '3px solid #fff' : '3px solid #666',
      }}
      onClick={onClick}
      title={`Brush size: ${size}px`}
    ></div>
  );
}; 