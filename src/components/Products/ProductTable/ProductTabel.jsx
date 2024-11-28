import React, { memo } from "react";
import Productrow from "../Productrow/Productrow";

const ProductTabel = memo(({ products, onOpenDetailModal, onOpenDeleteModal, onOpenEditModal }) => {
  return (
    <div className="product-tabel flex flex-col rounded-[20px] p-5 gap-4 bg-white overflow-x-auto">
      <div className="flex flex-col gap-3">
        {/* product tabel header */}
        <div className="flex lg:grid lg:grid-cols-6 gap-3">
          <div className="w-[120px] shrink-0 lg:w-auto flex items-center justify-center font-bold">عکس</div>
          <div className="w-[120px] shrink-0 lg:w-auto flex items-center justify-center font-bold">اسم</div>
          <div className="w-[120px] shrink-0 lg:w-auto flex items-center justify-center font-bold">قیمت</div>
          <div className="w-[120px] shrink-0 lg:w-auto flex items-center justify-center font-bold">موجودی</div>
          <div className="w-[220px] shrink-0 lg:w-auto flex items-center justify-center col-span-2 pe-5 lg:pe-0"></div>
        </div>

        {/* product tabel body */}
        {/* <div className="lg:grid lg:grid-cols-6 lg:gap-y-7 gap-x-3"> */}
        {products.map((product) => (
          <Productrow product={product} key={product.id} onOpenDetailModal={onOpenDetailModal} onOpenDeleteModal={onOpenDeleteModal} onOpenEditModal={onOpenEditModal} />
        ))}
        {/* </div> */}
      </div>
    </div>

    // <div className="product-tabel flex flex-col rounded-[20px] p-5 gap-4 bg-white overflow-x-auto">
    //     <div className="flex flex-col gap-5">
    //       <div className="flex lg:grid lg:grid-cols-8 gap-3">
    //         <div className="w-[120px] shrink-0 lg:w-auto flex items-center justify-center font-bold">نام کاربر</div>
    //         <div className="w-[120px] shrink-0 lg:w-auto flex items-center justify-center font-bold">محصول</div>
    //         <div className="w-[120px] shrink-0 lg:w-auto flex items-center justify-center font-bold">کامنت</div>
    //         <div className="w-[120px] shrink-0 lg:w-auto flex items-center justify-center font-bold">تاریخ</div>
    //         <div className="w-[120px] shrink-0 lg:w-auto flex items-center justify-center font-bold">ساعت</div>
    //         <div className="w-[230px] shrink-0 lg:w-auto flex items-center justify-center col-span-3"></div>
    //       </div>

    //       {comments.map((comment) => (
    //         <CommentsRow
    //           comment={comment}
    //           allUsers={allUsers}
    //           allProducts={allProducts}
    //           onShowComment={(id) => {
    //             findMainComment(id);
    //             setIsOpenDetailModal(true);
    //           }}
    //           onShowDeleteModal={(id) => {
    //             findMainComment(id);
    //             setIsOpenDeleteModal(true);
    //           }}
    //           onShowAcceptModal={(id) => {
    //             findMainComment(id);
    //             setIsOpenAcceptModal(true);
    //           }}
    //           onShowEditModal={(id) => {
    //             findMainComment(id);
    //             setIsOpenEditModal(true);
    //           }}
    //           onShowAnswerModal={(id) => {
    //             findMainComment(id);
    //             setIsOpenAnswerModal(true);
    //           }}
    //         />
    //       ))}
    //     </div>
    //   </div>
  );
});

export default ProductTabel;
