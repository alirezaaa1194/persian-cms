import React, { useContext, useEffect, useState } from "react";
import { ProductformContext } from "../../Contexts/ProductformContext.jsx";
import "./Products.css";
import DeleteModal from "../../components/DeleteModal/DeleteModal.jsx";
import DetailModal from "../../components/DetailModal/DetailModal.jsx";
import EditModal from "../../components/EditModal/EditModal.jsx";
import ProductTabel from "../../components/Products/ProductTable/ProductTabel.jsx";
import AddProductForm from "../../components/Products/AddProductForm/AddProductForm.jsx";
import useFetch from "../../Hooks/useFetch.js";
import Erroebox from "../../components/Errorbox/Errorbox.jsx";
import Textinput from "../../components/Textinput/Textinput.jsx";
import { BagIcon, TomanIcon } from "../../Svg/Svg.jsx";
import { createClient } from "@supabase/supabase-js";
import { HomeContext } from "../../Contexts/HomeContext.jsx";
import Loader from "../../components/Loader/Loader.jsx";

// Create a single supabase client for interacting with your database
const supabase = createClient("https://tzibzsgoopiyqnojmoqg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6aWJ6c2dvb3BpeXFub2ptb3FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQyMTY1NjIsImV4cCI6MjAxOTc5MjU2Mn0.3ckNRmW8L-8vGWv4f-xiwilabKZD6I01NoxkHes0Ykc");

export default function Products() {
  const notificationContext = useContext(HomeContext);

  // const [allProducts] = useFetch("http://localhost:3000/api/products");
  const [isLoad, setIsLoad] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [mainProduct, setMainProduct] = useState({});
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCount, setProductCount] = useState("");
  const [productImageLink, setProductImageLink] = useState("");
  const [productLover, setProductLover] = useState("");
  const [productSaleCount, setProductSaleCount] = useState("");
  const [productColorCount, setProductColorCount] = useState("");
  // const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  // const [isShowDetailModal, setIsShowDetailModal] = useState(false);
  // const [isShowEditModal, setIsShowEditModal] = useState(false);
  /////////////////////////////////////////////////////////////////////////

  const [productNewTitle, setProductNewTitle] = useState("");
  const [productNewPrice, setProductNewPrice] = useState("");
  const [productNewCount, setProductNewCount] = useState("");
  const [productNewImg, setProductNewImg] = useState("");
  const [productNewPopularity, setProductNewPopularity] = useState("");
  const [productNewSale, setProductNewSale] = useState("");
  const [productNewColor, setProductNewColor] = useState("");

  /////////////////////////////////////////////////////////////////////////
  // for modals
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const getAllProducts = async () => {
    // fetch(`http://localhost:3000/api/products`)
    //   .then((res) => res.json())
    //   .then((data) => setAllProducts(data));

    let { data: products, error } = await supabase.from("products").select("*");
    setAllProducts(products);
    setIsLoad(true);
  };

  useEffect(() => {
    getAllProducts();
    notificationContext.setIsOpenSidebar(false);
  }, []);

  // delete moodal actions
  const deleteModalSubmitAction = async (productId) => {
    // fetch(`http://localhost:3000/api/products/${productId}`, {
    //   method: "DELETE",
    // }).then(() => {
    //   getAllProducts();
    //   setIsShowDeleteModal(false);
    // });

    const { error } = await supabase.from("products").delete().eq("id", productId);
    getAllProducts();
    setIsOpenDeleteModal(false);
    notificationContext.setNotificationMsg("محصول با موفقیت حذف شد");
  };

  const deleteModalCancelAction = () => {
    setIsOpenDeleteModal(false);
  };

  // detail moodal actions
  const detailModalCloseAction = () => {
    setIsOpenDetailModal(false);
  };

  // edit moodal actions
  const editModalSubmitAction = async () => {
    // fetch(`http://localhost:3000/api/products/${mainProduct.id}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     title: productNewTitle,
    //     price: productNewPrice,
    //     count: productNewCount,
    //     img: productNewImg,
    //     popularity: productNewPopularity,
    //     sale: productNewSale,
    //     colors: productNewColor,
    //   }),
    // }).then((res) => {
    //   console.log(res);

    //   setIsShowEditModal(false);
    //   getAllProducts();
    // });

    const { data, error } = await supabase
      .from("products")
      .update({
        title: productNewTitle,
        price: productNewPrice,
        count: productNewCount,
        img: productNewImg,
        popularity: productNewPopularity,
        sale: productNewSale,
        colors: productNewColor,
      })
      .eq("id", mainProduct.id)
      .select();
    if (!error) {
      getAllProducts();
      setIsOpenEditModal(false);
      notificationContext.setNotificationStatus(true);
      notificationContext.setNotificationMsg("محصول با موفقیت ویرایش شد");
    } else {
      getAllProducts();
      setIsOpenEditModal(false);
      notificationContext.setNotificationStatus(false);
      notificationContext.setNotificationMsg("خطا در ویرایش محصول");
    }
  };

  return (
    <ProductformContext.Provider
      value={{
        allProducts,
        setAllProducts,
        mainProduct,
        setMainProduct,
        productName,
        setProductName,
        productPrice,
        setProductPrice,
        productCount,
        setProductCount,
        productImageLink,
        setProductImageLink,
        productLover,
        setProductLover,
        productSaleCount,
        setProductSaleCount,
        productColorCount,
        setProductColorCount,
        // isShowDeleteModal,
        // setIsShowDeleteModal,
        // isShowDetailModal,
        // setIsShowDetailModal,
        // isShowEditModal,
        // setIsShowEditModal,

        productNewTitle,
        setProductNewTitle,
        productNewPrice,
        setProductNewPrice,
        productNewCount,
        setProductNewCount,
        productNewImg,
        setProductNewImg,
        productNewPopularity,
        setProductNewPopularity,
        productNewSale,
        setProductNewSale,
        productNewColor,
        setProductNewColor,
      }}
    >
      {isLoad ? (
        <>
          <div className="flex flex-col gap-5 mt-8">
            <h2 className="text-2xl">افزودن محصول</h2>
            <AddProductForm />

            {allProducts.length ? <ProductTabel products={allProducts} onOpenDetailModal={() => setIsOpenDetailModal(true)} onOpenDeleteModal={() => setIsOpenDeleteModal(true)} onOpenEditModal={() => setIsOpenEditModal(true)} /> : <Erroebox msg="محصولی یافت نشد!" />}
          </div>

          <DeleteModal id={mainProduct.id} title="محصول" isOpenDeleteModal={isOpenDeleteModal} onClose={() => setIsOpenDeleteModal(false)} action={deleteModalSubmitAction}>
            <h2 className="text-2xl">
              آیا از حذف <span className="font-bold">{mainProduct?.title}</span> اطمینان دارید؟
            </h2>
          </DeleteModal>
          <DetailModal isOpenDetailModal={isOpenDetailModal} onClose={() => setIsOpenDetailModal(false)}>
            <div className="grid grid-cols-5 gap-2">
              <div className="flex items-center justify-center font-bold">عکس</div>
              <div className="flex items-center justify-center font-bold">اسم</div>
              <div className="flex items-center justify-center font-bold">قیمت</div>
              <div className="flex items-center justify-center font-bold">موجودی</div>
              <div className="flex items-center justify-center font-bold">محبوبیت</div>
            </div>
            <div className="grid grid-cols-5 gap-2">
              <div className="flex items-center justify-center">
                {/* <img src={`./public/images/product-images/${mainProduct?.img}`} className="w-40" alt="" /> */}
                <img src={mainProduct?.img ? `./public/images/product-images/${mainProduct?.img}` : "./public/images/non-image.png"} className="w-40" alt="" />
              </div>
              <div className="flex items-center justify-center">{mainProduct?.title}</div>
              <div className="flex items-center justify-center gap-x-1 flex-wrap content-center">
                {mainProduct?.price?.toLocaleString()} <TomanIcon />
              </div>
              <div className="flex items-center justify-center">{mainProduct?.count}</div>
              <div className="flex items-center justify-center">{mainProduct?.popularity}</div>
            </div>
          </DetailModal>
          <EditModal isOpenEditModal={isOpenEditModal} onClose={() => setIsOpenEditModal(false)} editModalSubmitAction={editModalSubmitAction}>
            <Textinput icon={<BagIcon />} placeholder="نام جدید محصول را وارد کنید" value={productNewTitle} onChange={setProductNewTitle} />
            <Textinput icon={<BagIcon />} placeholder="قیمت جدید محصول را وارد کنید" value={productNewPrice?.toLocaleString()} onChange={setProductNewPrice} />
            <Textinput icon={<BagIcon />} placeholder="تعداد جدید محصول را وارد کنید" value={productNewCount} onChange={setProductNewCount} />
            <Textinput icon={<BagIcon />} placeholder="آدرس تصویر جدید محصول را وارد کنید" value={productNewImg} onChange={setProductNewImg} />
            <Textinput icon={<BagIcon />} placeholder="تعداد محبوبیت جدید محصول را وارد کنید" value={productNewPopularity} onChange={setProductNewPopularity} />
            <Textinput icon={<BagIcon />} placeholder="تعداد فروش جدید محصول را وارد کنید" value={productNewSale} onChange={setProductNewSale} />
            <Textinput icon={<BagIcon />} placeholder="تعداد رنگ جدید محصول را وارد کنید" value={productNewColor} onChange={setProductNewColor} />
          </EditModal>
        </>
      ) : (
        <Loader />
      )}
    </ProductformContext.Provider>
  );
}
