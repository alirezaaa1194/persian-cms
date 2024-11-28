import React, { useContext, useEffect } from "react";
import { createPortal } from "react-dom";

export default function EditModal({ isOpenEditModal, onClose, editModalSubmitAction, scale = 100, children }) {
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
    <div className={`w-full h-screen fixed z-[11] top-0 right-0 flex items-center justify-center  ${isOpenEditModal ? "opacity-100 visible" : "opacity-0 invisible"}`}>
      <div className="w-full h-full bg-black/50 fixed top-0 left-0 z-[-1]" onClick={onClose}></div>
      <div className={`w-[90%] max-w-[400px] rounded-[10px] bg-white shadow-primary p-5 flex flex-col gap-5 scale-[${scale}%]`}>
        <h3 className="text-2xl text-center">اطلاعات جدید را وارد نمایید</h3>
        {children}
        <button className="w-full bg-blue hover:bg-blue-hover text-white text-xl px-4 py-1 rounded-md" onClick={editModalSubmitAction}>
          ثبت اطلاعات جدید
        </button>
      </div>
    </div>,
    document.getElementById("modal-parent")
  );
}
