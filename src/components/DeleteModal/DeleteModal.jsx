import React, { useContext, useEffect } from "react";
import { createPortal } from "react-dom";

export default function DeleteModal({ id, isOpenDeleteModal, onClose, action, children }) {
  useEffect(() => {
    const hideModal = (e) => {
      if (e.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener("keydown", (e) => hideModal(e));
    return () => window.removeEventListener("keydown", (e) => hideModal(e));
  });

  return createPortal(
    <div className={`w-full h-screen fixed z-[11] top-0 right-0 flex items-center justify-center ${isOpenDeleteModal ? "opacity-100 visible" : "opacity-0 invisible"}`}>
      <div className="w-full h-full bg-black/50 fixed top-0 left-0 z-[-1]" onClick={onClose}></div>
      <div className="w-[90%] max-w-[500px] rounded-[10px] bg-white shadow-primary p-5">
        {children}
        <div className=" flex justify-end gap-2 mt-8">
          <button className="bg-blue hover:bg-blue-hover text-white text-xl px-4 py-1 rounded-md" onClick={() => action(id)}>
            بله
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white text-xl px-4 py-1 rounded-md" onClick={onClose}>
            خیر
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-parent")
  );
}
