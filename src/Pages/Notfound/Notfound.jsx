import React, { useContext, useEffect } from 'react'
import { NotFoundIcon } from '../../Svg/Svg'
import { Link } from 'react-router-dom'
import { HomeContext } from '../../Contexts/HomeContext';

export default function Notfound() {
  const mainContext = useContext(HomeContext);

  useEffect(() => {
    mainContext.setIsOpenSidebar(false);
  }, []);

  return (
    <div className='relative flex flex-col items-center justify-center gap-10'>
      <span className='w-24 h-24 lg:w-48 lg:h-48 bg-blue blur-[100px] absolute left-0 top-0'></span>
      <span className='w-24 h-24 lg:w-48 lg:h-48 bg-yellow-400 blur-[100px] absolute right-0 bottom-0'></span>
      <NotFoundIcon/>
      <h2 className='text-3xl'>متاسفانه صفحه مورد نظر شما پیدا نشد.</h2>
      <Link to="/products" className='px-4 py-2 bg-blue hover:bg-blue-hover text-white rounded-full'>بازگشت به صفحه اصلی</Link>
    </div>
  )
}
