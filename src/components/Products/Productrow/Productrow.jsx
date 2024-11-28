import React, { memo, useContext } from "react";
import { TomanIcon } from "../../../Svg/Svg";
import { ProductformContext } from "../../../Contexts/ProductformContext";
const Productrow = ({ product, onOpenDetailModal, onOpenDeleteModal, onOpenEditModal }) => {
  const ProductContext = useContext(ProductformContext);

  const detailModalInfoHandler = () => {
    ProductContext.setMainProduct(product);
    // ProductContext.setIsShowDetailModal(true);
    onOpenDetailModal();
  };

  const deleteProductHandler = () => {
    ProductContext.setMainProduct(product);
    onOpenDeleteModal();
  };

  const editProductHandler = () => {
    ProductContext.setMainProduct(product);
    onOpenEditModal();

    // set edit modal inputs value
    ProductContext.setProductNewTitle(product.title);
    ProductContext.setProductNewPrice(product.price);
    ProductContext.setProductNewCount(product.count);
    ProductContext.setProductNewImg(product.img);
    ProductContext.setProductNewPopularity(product.popularity);
    ProductContext.setProductNewSale(product.sale);
    ProductContext.setProductNewColor(product.color || 0);
  };

  return (
    <div className="flex lg:grid lg:grid-cols-6 gap-3">
      <div className="w-[120px] shrink-0 lg:w-auto flex items-center justify-center">
        <img src={product.img ? `./public/images/product-images/${product.img}` : "./public/images/non-image.png"} className="w-32" alt="" />
      </div>
      <div className="w-[120px] shrink-0 lg:w-auto flex items-center justify-center">{product.title}</div>
      <div className="w-[120px] shrink-0 lg:w-auto flex items-center justify-center gap-1">
        {product.price.toLocaleString()} <TomanIcon />
      </div>
      <div className="w-[120px] shrink-0 lg:w-auto flex items-center justify-center">{product.count}</div>
      <div className="w-[220px] shrink-0 lg:w-auto lg:col-span-2 flex items-center justify-center gap-3 pe-5 lg:pe-0">
        <button className="bg-blue hover:bg-blue-hover text-white px-2 py-1 rounded-md text-[15px] whitespace-nowrap" onClick={detailModalInfoHandler}>
          جزیات
        </button>
        <button className="bg-blue hover:bg-blue-hover text-white px-2 py-1 rounded-md text-[15px] whitespace-nowrap" onClick={deleteProductHandler}>
          حذف
        </button>
        <button className="bg-blue hover:bg-blue-hover text-white px-2 py-1 rounded-md text-[15px] whitespace-nowrap" onClick={editProductHandler}>
          ویرایش
        </button>
      </div>
    </div>
  );
};

export default Productrow;
