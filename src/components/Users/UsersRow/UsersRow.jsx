import React from "react";
import { Suspense } from "react";
const CommentsRow = ({ user, onShowDeleteModal, onShowDetailModal, onShowEditModal }) => {
  // let mainUser = allUsers.find((user) => user.id === comment.userID);
  // let mainProduct = allProducts.find((product) => product.id === comment.productID);

  return (
    <>
      <div className="flex lg:grid lg:grid-cols-6 gap-y-6 gap-x-3">
        <div className="w-[120px] lg:w-auto shrink-0 flex items-center justify-center lg:col-span-1">
          {user.firstname} {user.lastname}
        </div>
        <div className="w-[120px] lg:w-auto shrink-0 flex items-center justify-center lg:col-span-1">{user.username}</div>
        <div className="w-[120px] lg:w-auto shrink-0 flex items-center justify-center gap-1 lg:col-span-1">{user.password}</div>
        <div className="w-[120px] lg:w-auto shrink-0 flex items-center justify-center lg:col-span-1">{user.phone}</div>
        <div className="w-[120px] lg:w-auto shrink-0 flex items-center justify-center lg:col-span-1">{user.email}</div>
        <div className="w-[230px] lg:w-auto shrink-0  flex items-center justify-center lg:col-span-1 gap-3 pe-5 lg:pe-0">
          <button className="bg-blue hover:bg-blue-hover text-white px-2 py-1 rounded-md text-[15px] whitespace-nowrap" onClick={() => onShowDeleteModal(user.id)}>
            حذف
          </button>
          <button className="bg-blue hover:bg-blue-hover text-white px-2 py-1 rounded-md text-[15px] whitespace-nowrap" onClick={() => onShowDetailModal(user.id)}>
            حزییات
          </button>
          <button className="bg-blue hover:bg-blue-hover text-white px-2 py-1 rounded-md text-[15px] whitespace-nowrap" onClick={() => onShowEditModal(user.id)}>
            ویرایش
          </button>
        </div>
      </div>
    </>
  );
};

export default CommentsRow;
