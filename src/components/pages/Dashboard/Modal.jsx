const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center top-0 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 font-2 text-gray-500 hover:text-gray-700"
          >
            &times; {/* This is the "X" symbol */}
          </button>
          {/* Modal Content */}
          {children}
        </div>
      </div>
    );
  };
  
  export default Modal;