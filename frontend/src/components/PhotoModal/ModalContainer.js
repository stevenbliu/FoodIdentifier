import { useState } from "react";

const FoodIdentifier = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-6">
      <button onClick={() => setIsOpen(true)} className="bg-blue-500 text-white p-2 rounded">
        Identify Food
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2>Upload Food Image</h2>
            <input type="file" />
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};
