"use client";
import { useState, useEffect } from "react";

export default function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowContent(true), 10);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Button to open modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Open Modal
      </button>

      {/* Modal overlay */}
      {isOpen && (
        <div
          className={`fixed inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
            showContent ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        >
          {/* Modal content */}
          <div
            className={`bg-white p-6 rounded-2xl shadow-lg w-80 text-center transform transition-all duration-300 ${
              showContent ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <h2 className="text-xl font-semibold mb-4">Emergent Window</h2>
            <p>This is your animated popup 👋</p>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
