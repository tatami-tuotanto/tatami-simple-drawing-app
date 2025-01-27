interface ColorButtonProps {
  color: string;
  isSelected: boolean;
  onClick: () => void;
}

export const ColorButton = ({ color, isSelected, onClick }: ColorButtonProps) => {
  return (
    <div
      className={`rounded-full p-5 m-2 cursor-pointer`}
      style={{
        backgroundColor: color,
        border: isSelected ? '3px solid #fff' : '3px solid #666',
      }}
      onClick={onClick}
    ></div>
  );
}; 