export default function ArrowButton({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="transition-all ease-in-out duration-150 flex items-center justify-start pr-4 gap-2 hover:gap-4 hover:pr-2"
    >
      <span>{text}</span>
      <span>🡆</span>
    </button>
  );
}
