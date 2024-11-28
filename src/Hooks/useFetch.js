import  { useEffect, useState } from "react";

export default function useFetch(api) {
  const [data, setData] = useState([]);

  const getDatas = async () => {
    const res = await fetch(api);
    const datas = await res.json();

    setData(datas);
  };

  useEffect(() => {
    getDatas();
  }, []);

  return [data];
}