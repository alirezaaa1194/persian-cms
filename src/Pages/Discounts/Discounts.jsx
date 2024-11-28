import React, { useContext, useEffect } from 'react'
import { HomeContext } from '../../Contexts/HomeContext';

export default function Discounts() {


  const mainContext = useContext(HomeContext);

  useEffect(() => {
    mainContext.setIsOpenSidebar(false);
  }, []);

  return (
    <div>Discounts</div>
  )
}
