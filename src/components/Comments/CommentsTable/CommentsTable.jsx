import React, { lazy, Suspense, memo, useContext, useEffect, useState } from "react";
import Errorbox from "../../Errorbox/Errorbox";
import { createClient } from "@supabase/supabase-js";
import CommentsRow from "../CommentsRow/CommentsRow";
// const CommentsRow = lazy(() => import("../CommentsRow/CommentsRow"));
import DetailModal from "../../DetailModal/DetailModal";
import DeleteModal from "../../DeleteModal/DeleteModal";
import EditModal from "../../EditModal/EditModal";
import { HomeContext } from "../../../Contexts/HomeContext";

const supabase = createClient("https://tzibzsgoopiyqnojmoqg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6aWJ6c2dvb3BpeXFub2ptb3FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQyMTY1NjIsImV4cCI6MjAxOTc5MjU2Mn0.3ckNRmW8L-8vGWv4f-xiwilabKZD6I01NoxkHes0Ykc");

const CommentsTable = memo(({ comments, getComments }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [mainComment, setMainComment] = useState({});

  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenAcceptModal, setIsOpenAcceptModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [editInputValue, setEditInputValue] = useState("");
  const [isOpenAnswerModal, setIsOpenAnswerModal] = useState(false);
  const [answerInputValue, setAnswerInputValue] = useState("");

  const notificationContext = useContext(HomeContext);

  const getUsers = async () => {
    let { data: users, error } = await supabase.from("users").select("*");

    if (error) {
    } else {
      setAllUsers(users);
    }
  };

  const getProducts = async () => {
    let { data: products, error } = await supabase.from("products").select("*");

    if (error) {
    } else {
      setAllProducts(products);
    }
  };

  const findMainComment = (commentId) => {
    let mainComment = comments.find((comment) => comment.id === commentId);
    setMainComment(mainComment);
    ////////////////////////////////////
    setAnswerInputValue(mainComment.answer_body || "");
    setEditInputValue(mainComment.body);
  };

  const deleteModalSubmitAction = async (commentId) => {
    const { error } = await supabase.from("comments").delete().eq("id", commentId);
    if (!error) {
      getComments();
      setIsOpenDeleteModal(false);
      notificationContext.setNotificationMsg("کامنت با موفقیت حذف شد");
      notificationContext.setNotificationStatus(true);
    } else {
      getComments();
      setIsOpenDeleteModal(false);
      notificationContext.setNotificationMsg("خطا درحذف کامنت");
      notificationContext.setNotificationStatus(false);
    }
  };

  const acceptModalSubmitAction = async (commentId) => {
    const { data, error } = await supabase.from("comments").update({ isAccept: !mainComment.isAccept }).eq("id", commentId).select();
    if (!error) {
      getComments();
      setIsOpenAcceptModal(false);
      notificationContext.setNotificationMsg(`کامنت با وفقیت ${mainComment.isAccept ? "رد" : "تایید"} شد`);
      notificationContext.setNotificationStatus(true);
    } else {
      setIsOpenAcceptModal(false);
      notificationContext.setNotificationMsg(`خطا در ${mainComment.isAccept ? "رد" : "تایید"} کامنت`);
      notificationContext.setNotificationStatus(true);
    }
  };

  const editModalSubmitAction = async () => {
    const { data, error } = await supabase.from("comments").update({ body: editInputValue }).eq("id", mainComment.id).select();
    if (!error) {
      getComments();
      setIsOpenEditModal(false);
      notificationContext.setNotificationMsg(`کامنت با وفقیت ویرایش شد`);
      notificationContext.setNotificationStatus(true);
    } else {
      setIsOpenEditModal(false);
      notificationContext.setNotificationMsg(`خطا در ویرایش کامنت`);
      notificationContext.setNotificationStatus(false);
    }
  };

  const answerModalSubmitAction = async () => {
    const { data, error } = await supabase.from("comments").update({ answer_body: answerInputValue }).eq("id", mainComment.id).select();
    if (!error) {
      getComments();
      setIsOpenAnswerModal(false);
      notificationContext.setNotificationMsg(`پاسخ با موفقیت ثبت شد`);
      notificationContext.setNotificationStatus(true);
    } else {
      setIsOpenAnswerModal(false);
      notificationContext.setNotificationMsg(`خطا در ثبت پاسخ`);
      notificationContext.setNotificationStatus(false);
    }
  };

  useEffect(() => {
    getUsers();
    getProducts();
  }, []);

  return comments?.length ? (
    <>
      <div className="product-tabel flex flex-col rounded-[20px] p-5 gap-4 bg-white overflow-x-auto">
        <div className="flex flex-col gap-5">
          <div className="flex lg:grid lg:grid-cols-7 gap-3">
            <div className="w-[120px] shrink-0 lg:w-auto flex items-center justify-center font-bold">نام کاربر</div>
            <div className="w-[120px] shrink-0 lg:w-auto flex items-center justify-center font-bold">محصول</div>
            <div className="w-[120px] shrink-0 lg:w-auto flex items-center justify-center font-bold">کامنت</div>
            <div className="w-[120px] shrink-0 lg:w-auto flex items-center justify-center font-bold">تاریخ</div>
            <div className="w-[120px] shrink-0 lg:w-auto flex items-center justify-center font-bold">ساعت</div>
            <div className="w-[230px] shrink-0 lg:w-auto flex items-center justify-center col-span-2 pe-5 lg:pe-0"></div>
          </div>

          {comments.map((comment) => (
            <CommentsRow
              comment={comment}
              allUsers={allUsers}
              allProducts={allProducts}
              onShowComment={(id) => {
                findMainComment(id);
                setIsOpenDetailModal(true);
              }}
              onShowDeleteModal={(id) => {
                findMainComment(id);
                setIsOpenDeleteModal(true);
              }}
              onShowAcceptModal={(id) => {
                findMainComment(id);
                setIsOpenAcceptModal(true);
              }}
              onShowEditModal={(id) => {
                findMainComment(id);
                setIsOpenEditModal(true);
              }}
              onShowAnswerModal={(id) => {
                findMainComment(id);
                setIsOpenAnswerModal(true);
              }}
            />
          ))}
        </div>
      </div>

      <DetailModal isOpenDetailModal={isOpenDetailModal} onClose={() => setIsOpenDetailModal(false)}>
        <p className="text-xl">{mainComment.body}</p>
      </DetailModal>

      <DeleteModal id={mainComment.id} isOpenDeleteModal={isOpenDeleteModal} onClose={() => setIsOpenDeleteModal(false)} action={deleteModalSubmitAction}>
        آیا کامنت را حذف میکنید؟
      </DeleteModal>

      {/* for accept Comment */}
      <DeleteModal id={mainComment.id} isOpenDeleteModal={isOpenAcceptModal} onClose={() => setIsOpenAcceptModal(false)} action={acceptModalSubmitAction}>
        آیا کامنت را {mainComment.isAccept ? "رد" : "تایید"} میکنید؟
      </DeleteModal>

      {/* for edit comment body */}
      <EditModal isOpenEditModal={isOpenEditModal} onClose={() => setIsOpenEditModal(false)} editModalSubmitAction={editModalSubmitAction}>
        <textarea className="w-full min-h-32 p-3 resize-none outline-none border border-blue/50 rounded-md focus:border-blue" value={editInputValue} onChange={(e) => setEditInputValue(e.target.value)}></textarea>
      </EditModal>

      {/* for answer to comment */}
      <EditModal isOpenEditModal={isOpenAnswerModal} onClose={() => setIsOpenAnswerModal(false)} editModalSubmitAction={answerModalSubmitAction}>
        <div className="p-4 rounded-lg bg-blue/10">
          <p>{mainComment.body}</p>
          <div className="pr-4 mt-2">
            <textarea placeholder="پاسخ" className="w-full min-h-32 p-3 resize-none outline-none border border-blue/50 rounded-md focus:border-blue" value={answerInputValue} onChange={(e) => setAnswerInputValue(e.target.value)}></textarea>
          </div>
        </div>
      </EditModal>
    </>
  ) : (
    <Errorbox msg="هیچ کامنتی وجود ندارد" />
  );
});

export default CommentsTable;
