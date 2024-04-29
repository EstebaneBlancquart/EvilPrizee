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
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10.605"
          height="15.555"
          fill="white"
        >
          <path d="m2.828 15.555 7.777-7.779L2.828 0 0 2.828l4.949 4.948L0 12.727l2.828 2.828z" />
        </svg>
      </span>
    </button>
  );
}
