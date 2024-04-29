export default function Modal({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-8">
      <div className="bg-black bg-opacity-80  text-white p-8 rounded relative w-full max-w-96">
        <button onClick={onClose} className="absolute top-0 right-2 text-lg">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
