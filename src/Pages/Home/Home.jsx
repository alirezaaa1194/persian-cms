import React, { useContext, useEffect } from "react";
import { HomeContext } from "../../Contexts/HomeContext";

export default function Home() {
  const mainContext = useContext(HomeContext);

  useEffect(() => {
    mainContext.setIsOpenSidebar(false);
  }, []);
  return <div>Home</div>;
}
