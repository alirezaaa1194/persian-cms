import React, { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./Notification.css";
import { HomeContext } from "../../Contexts/HomeContext";

export default function Notification() {
  const globalContext = useContext(HomeContext);

  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (!!globalContext.notificationMsg) {
      setIsShow(true);
      setTimeout(() => {
        setIsShow(false);
      }, 3000);
    }
  }, [globalContext.notificationMsg]);

  useEffect(() => {
    if (!isShow) {
      setTimeout(() => {
        globalContext.setNotificationMsg("");
      }, 3000);
    }
  }, [isShow]);

  if (globalContext.notificationMsg !== "") {
    return createPortal(
      <div id="notification-bar" className={`text-xl bg-white shadow-primary rounded-md border-b-[3px] border-t-[3px] ${globalContext.notificationStatus ? "border-b-green-500 border-t-green-500" : "border-b-red-500 border-t-red-500"} fixed -left-full top-5 px-4 py-2 z-10 ${isShow ? "left-5" : "-left-full"}`}>
        {globalContext.notificationMsg}
      </div>,
      document.body
    );
  }
}
