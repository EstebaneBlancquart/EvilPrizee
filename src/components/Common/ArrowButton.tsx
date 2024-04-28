export default function ArrowButton({
  text,
  onClick,
  className,
}: {
  text?: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`transition-all ease-in-out duration-150 flex items-center justify-start pr-4 gap-2 hover:gap-4 hover:pr-2 ${className}`}
    >
      {text && <span>{text}</span>}
      <span>🡆</span>
    </button>
  );
}
