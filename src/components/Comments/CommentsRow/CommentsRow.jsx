import React from "react";
import { Suspense } from "react";
const CommentsRow = ({ comment, allUsers, allProducts, onShowComment, onShowDeleteModal, onShowAcceptModal, onShowEditModal, onShowAnswerModal }) => {
  let mainUser = allUsers.find((user) => user.id === comment.userID);
  let mainProduct = allProducts.find((product) => product.id === comment.productID);

  return (
    <>
      <div className="flex lg:grid lg:grid-cols-7 gap-y-7 gap-x-3">
        <div className="w-[120px] lg:w-auto lg:col-span-1 shrink-0 flex items-center justify-center">{mainUser ? mainUser?.firstname : <span className="text-black/50">درحال بارگیری...</span>}</div>
        <div className="w-[120px] lg:w-auto lg:col-span-1 shrink-0 flex items-center justify-center">{mainProduct?.title}</div>
        <div className="w-[120px] lg:w-auto lg:col-span-1 shrink-0 flex items-center justify-center gap-1">
          <button className="bg-blue hover:bg-blue-hover text-white px-2 py-1 rounded-md text-[15px] whitespace-nowrap" onClick={() => onShowComment(comment.id)}>
            دیدن متن
          </button>
        </div>
        <div className="w-[120px] lg:w-auto lg:col-span-1 shrink-0 flex items-center justify-center">{comment.date}</div>
        <div className="w-[120px] lg:w-auto lg:col-span-1 shrink-0 flex items-center justify-center">{comment.hour}</div>
        <div className="col-span-3 w-[230px] lg:w-auto lg:col-span-2 shrink-0  flex items-center justify-center gap-3 pe-5 lg:pe-0">
          <button className="bg-blue hover:bg-blue-hover text-white px-2 py-1 rounded-md text-[15px] whitespace-nowrap" onClick={() => onShowDeleteModal(comment.id)}>
            حذف
          </button>
          <button className="bg-blue hover:bg-blue-hover text-white px-2 py-1 rounded-md text-[15px] whitespace-nowrap" onClick={() => onShowEditModal(comment.id)}>
            ویرایش
          </button>
          <button className="bg-blue hover:bg-blue-hover text-white px-2 py-1 rounded-md text-[15px] whitespace-nowrap" onClick={() => onShowAnswerModal(comment.id)}>
            پاسخ
          </button>
          <button className="bg-blue hover:bg-blue-hover text-white px-2 py-1 rounded-md text-[15px] whitespace-nowrap" onClick={() => onShowAcceptModal(comment.id)}>
            {comment.isAccept ? "رد" : "تایید"}
          </button>
        </div>
      </div>
    </>
  );
};

export default CommentsRow;
