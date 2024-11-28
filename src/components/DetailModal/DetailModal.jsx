// import React, { Children, useContext, useEffect } from "react";
// import { createPortal } from "react-dom";
// import { TomanIcon } from "../../Svg/Svg";
// import useFetch from "../../Hooks/useFetch";

// export default function DetailModal({ contextName, detailModalCloseAction, children }) {
//   const myContext = useContext(contextName);

//   useEffect(() => {
//     const hideModal = (e) => {
//       if (e.keyCode === 27) {
//         myContext.setIsShowDetailModal(false);
//       }
//     };
//     window.addEventListener("keydown", (e) => hideModal(e));

//     return () => window.removeEventListener("keydown", (e) => hideModal(e));
//   });

//   return createPortal(
//     <div className={`w-full h-screen fixed z-[11] top-0 right-0 flex items-center justify-center bg-black/50 ${myContext.isShowDetailModal ? "opacity-100 visible" : "opacity-0 invisible"}`}>
//       <div className="w-[90%] max-w-[500px] rounded-[10px] bg-white shadow-primary p-5 flex flex-col gap-2">
//         {children}

//         <button className="bg-red-600 hover:bg-red-700 text-white text-xl px-4 py-1 rounded-md self-end" onClick={detailModalCloseAction}>
//           بستن
//         </button>
//       </div>
//     </div>,
//     document.getElementById("modal-parent")
//   );
// }


import React, {  useEffect } from "react";
import { createPortal } from "react-dom";

export default function DetailModal({ isOpenDetailModal, onClose, children }) {

  useEffect(() => {
    const hideModal = (e) => {
      if (e.keyCode === 27) {
        onClose()
      }
    };
    window.addEventListener("keydown", (e) => hideModal(e));

    return () => window.removeEventListener("keydown", (e) => hideModal(e));
  });

  return createPortal(
    <div className={`w-full h-screen fixed z-[11] top-0 right-0 flex items-center justify-center  ${isOpenDetailModal ? "opacity-100 visible" : "opacity-0 invisible"}`}>
      <div className="w-full h-full bg-black/50 fixed top-0 left-0 z-[-1]" onClick={onClose}></div>

      <div className="w-[90%] max-w-[500px] rounded-[10px] bg-white shadow-primary p-5 flex flex-col gap-2">
        {children}

        <button className="bg-red-600 hover:bg-red-700 text-white text-xl px-4 py-1 rounded-md self-end" onClick={onClose}>
          بستن
        </button>
      </div>
    </div>,
    document.getElementById("modal-parent")
  );
}
