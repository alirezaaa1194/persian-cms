import React, { useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes.jsx";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header.jsx";
import { HomeContext } from "./Contexts/HomeContext.jsx";
import Notification from "./components/Notification/Notification.jsx";
import { createPortal } from "react-dom";

export default function App() {
  let router = useRoutes(routes);

  // states
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [notificationStatus, setNotificationStatus] = useState(false);

  return (
    <HomeContext.Provider value={{ setIsOpenSidebar, notificationMsg, setNotificationMsg, notificationStatus, setNotificationStatus }}>
      <div className="flex mx-auto max-w-[1440px] relative overflow-hidden">
        <Notification />

        <Sidebar isOpen={isOpenSidebar} onToggle={() => setIsOpenSidebar(false)} />
        <div className={`${isOpenSidebar ? "pr-[30px] translate-x-[-215px]" : "translate-x-0 px-[15px]"} min-h-screen w-full relative lg:translate-x-0 px-[15px] lg:pr-[260px] lg:pl-[30px] lg:overflow-auto`}>
          {isOpenSidebar &&
            createPortal(
              <div
                className="w-full h-screen fixed right-0 top-0 z-[9] bg-black/50  lg:hidden"
                onClick={() => {
                  setIsOpenSidebar(false);
                }}
              ></div>,
              document.body
            )}
          <Header onToggle={() => setIsOpenSidebar(true)} />
          <main>{router}</main>
        </div>
      </div>
    </HomeContext.Provider>
  );
}
