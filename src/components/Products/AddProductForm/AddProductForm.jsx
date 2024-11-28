import React, { useContext, useState } from "react";
import Textinput from "../../Textinput/Textinput";
import { ProductIcon } from "../../../Svg/Svg";
import { ProductformContext } from "../../../Contexts/ProductformContext";

import { createClient } from "@supabase/supabase-js";
import Notification from "../../Notification/Notification";
import { HomeContext } from "../../../Contexts/HomeContext";

// Create a single supabase client for interacting with your database
const supabase = createClient("https://tzibzsgoopiyqnojmoqg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6aWJ6c2dvb3BpeXFub2ptb3FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQyMTY1NjIsImV4cCI6MjAxOTc5MjU2Mn0.3ckNRmW8L-8vGWv4f-xiwilabKZD6I01NoxkHes0Ykc");

export default function AddProductForm() {
  const productContext = useContext(ProductformContext);
  const notificationContext = useContext(HomeContext);

  const [newProductTitle, setNewProductTitle] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductCount, setNewProductCount] = useState("");
  const [newProductImg, setNewProductImg] = useState("");
  const [newProductPopularity, setNewProductPopularity] = useState("");
  const [newProductSale, setNewProductSale] = useState("");
  const [newProductColor, setNewProductColor] = useState("");

  const emptyFields = () => {
    setNewProductTitle("");
    setNewProductPrice("");
    setNewProductCount("");
    setNewProductImg("");
    setNewProductPopularity("");
    setNewProductSale("");
    setNewProductColor("");
  };

  const getAllProducts = async () => {
    // fetch(`http://localhost:3000/api/products`)
    //   .then((res) => res.json())
    //   .then((data) => productContext.setAllProducts(data));

    let { data: products, error } = await supabase.from("products").select("*");
    productContext.setAllProducts(products);
    emptyFields();
  };

  const createProductHandler = async () => {
    // fetch(`http://localhost:3000/api/products`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     title: newProductTitle,
    //     price: newProductPrice,
    //     count: newProductCount,
    //     img: newProductImg,
    //     popularity: newProductPopularity,
    //     sale: newProductSale,
    //     colors: newProductColor,
    //   }),
    // }).then(() => {
    //   getAllProducts();
    // });

    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          title: newProductTitle,
          price: newProductPrice,
          count: newProductCount,
          img: newProductImg,
          popularity: newProductPopularity,
          sale: newProductSale,
          colors: newProductColor,
        },
      ])
      .select("*");

    if (error) {
      notificationContext.setNotificationMsg("خطا در ثبت محصول");
      notificationContext.setNotificationStatus(false);
    } else {
      notificationContext.setNotificationMsg("محصول با موفقیت اضافه شد");
      notificationContext.setNotificationStatus(true);
      getAllProducts();
    }
  };

  return (
    <div className="flex flex-col rounded-[20px] p-5 gap-4 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Textinput icon={<ProductIcon />} placeholder={"نام محصول را وارد کنید"} value={newProductTitle} onChange={setNewProductTitle} />
        <Textinput icon={<ProductIcon />} placeholder={"قیمت محصول را وارد کنید"} value={newProductPrice} onChange={setNewProductPrice} />
        <Textinput icon={<ProductIcon />} placeholder={"موجودی محصول را وارد کنید"} value={newProductCount} onChange={setNewProductCount} />
        <Textinput icon={<ProductIcon />} placeholder={"آدرس عکس محصول را وارد کنید"} value={newProductImg} onChange={setNewProductImg} />
        <Textinput icon={<ProductIcon />} placeholder={"میزان محبوبیت محصول را وارد کنید"} value={newProductPopularity} onChange={setNewProductPopularity} />
        <Textinput icon={<ProductIcon />} placeholder={"میزان فروش محصول را وارد کنید"} value={newProductSale} onChange={setNewProductSale} />
        <Textinput icon={<ProductIcon />} placeholder={"تعداد رنگ بندی محصول را وارد کنید"} value={newProductColor} onChange={setNewProductColor} />
      </div>
      <button className="self-end bg-blue hover:bg-blue-hover text-white px-4 py-2 rounded-[10px] text-[1.1rem]" onClick={createProductHandler}>
        ثبت محصول
      </button>
    </div>
  );
}
