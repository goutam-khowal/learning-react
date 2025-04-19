import React from "react";

function CartSideBar({ isOpen, setIsOpen }) {
  function onClose() {
    setIsOpen(false);
  }

  return (
    <>
      {/* Overlay to capture clicks outside the sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#00000055] bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Cart sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-125 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Sidebar header */}
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#131921]">
              Your Cart ({10})
            </h2>
            <button
              className="text-[#131921] hover:text-[#FF9900]"
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          {/* Cart items */}
          <div className="flex-grow overflow-y-auto py-4 border-t border-b">
            <p className="text-gray-600 italic">Your cart is currently empty</p>
            {/* Cart items would be mapped here */}
          </div>

          {/* Cart summary */}
          <div className="mt-4">
            <div className="flex justify-between py-2">
              <span>Subtotal:</span>
              <span>₹0</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Shipping:</span>
              <span>₹0</span>
            </div>
            <div className="flex justify-between py-2 font-bold">
              <span>Total:</span>
              <span>₹0</span>
            </div>
            <button className="w-full bg-[#FF9900] hover:bg-[#e88e00] text-white py-2 mt-4 rounded">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartSideBar;
