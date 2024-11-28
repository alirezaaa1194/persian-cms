import React, { memo, useContext, useEffect, useState } from "react";
import Errorbox from "../../Errorbox/Errorbox";
import UserRow from "../UsersRow/UsersRow";
import { createClient } from "@supabase/supabase-js";
import DetailModal from "../../DetailModal/DetailModal";
import DeleteModal from "../../DeleteModal/DeleteModal";
import EditModal from "../../EditModal/EditModal";
import { HomeContext } from "../../../Contexts/HomeContext";
import Textinput from "../../Textinput/Textinput";
import { BagIcon } from "../../../Svg/Svg";
import Loader from "../../Loader/Loader";

const supabase = createClient("https://tzibzsgoopiyqnojmoqg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6aWJ6c2dvb3BpeXFub2ptb3FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQyMTY1NjIsImV4cCI6MjAxOTc5MjU2Mn0.3ckNRmW8L-8vGWv4f-xiwilabKZD6I01NoxkHes0Ykc");

const UsersTable = ({ users, getUsers, isLoad }) => {
  const notificationContext = useContext(HomeContext);

  const [mainUser, setMainUser] = useState({});
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  //////////////////////////////////////////////////////////////////////
  const [userNewFirstName, setUserNewFirstName] = useState("");
  const [userNewLastName, setUserNewLastName] = useState("");
  const [userNewUserName, setUserNewUserName] = useState("");
  const [userNewPassword, setUserNewPassword] = useState("");
  const [userNewEmail, setUserNewEmail] = useState("");
  const [userNewPhone, setUserNewPhone] = useState("");
  const [userNewScore, setUserNewScore] = useState("");
  const [userNewBuy, setUserNewBuy] = useState("");
  const [userNewCity, setUserNewCity] = useState("");
  const [userNewAddress, setUserNewAddress] = useState("");

  const findMainUser = (id) => {
    setMainUser(() => users.find((user) => user.id === id));
  };

  const deleteModalSubmitAction = async () => {
    const { error } = await supabase.from("users").delete().eq("id", mainUser?.id);

    if (!error) {
      getUsers();
      setIsOpenDeleteModal(false);
      notificationContext.setNotificationMsg("کاربر با موفقیت حذف شد");
      notificationContext.setNotificationStatus(true);
    } else {
      setIsOpenDeleteModal(false);
      notificationContext.setNotificationMsg("خطا در حذف کاربر");
      notificationContext.setNotificationStatus(false);
    }
  };

  const editModalSubmitAction = async () => {
    const { data, error } = await supabase
      .from("users")
      .update({
        firstname: userNewFirstName,
        lastname: userNewLastName,
        username: userNewUserName,
        password: userNewPassword,
        email: userNewEmail,
        phone: userNewPhone,
        score: userNewScore,
        buy: userNewBuy,
        city: userNewCity,
        address: userNewAddress,
      })
      .eq("id", mainUser?.id)
      .select();

    if (!error) {
      getUsers();
      setIsOpenEditModal(false);
      notificationContext.setNotificationMsg("کاربر با موفقیت ویرایش شد");
      notificationContext.setNotificationStatus(true);
    } else {
      setIsOpenEditModal(false);
      notificationContext.setNotificationMsg("خطا در ویرایش کاربر");
      notificationContext.setNotificationStatus(false);
    }
  };

  useEffect(() => {
    setUserNewFirstName(mainUser.firstname);
    setUserNewLastName(mainUser.lastname);
    setUserNewUserName(mainUser.username);
    setUserNewPassword(mainUser.password);
    setUserNewEmail(mainUser.email);
    setUserNewPhone(mainUser.phone);
    setUserNewScore(mainUser.score);
    setUserNewBuy(mainUser.buy);
    setUserNewCity(mainUser.city);
    setUserNewAddress(mainUser.address);
  }, [mainUser]);

  if (!isLoad) {
    return <Loader />;
  }
  return users.length ? (
    <>
      <div className="product-tabel flex flex-col rounded-[20px] p-5 gap-4 bg-white overflow-x-auto">
        <div className="flex flex-col gap-5">
          <div className="flex lg:grid lg:grid-cols-6 gap-3">
            <div className="w-[120px] shrink-0 lg:w-auto flex items-center justify-center font-bold col-span-1">نام و نام خانوادگی</div>
            <div className="w-[120px] shrink-0 lg:w-auto flex items-center justify-center font-bold col-span-1">نام کاربری</div>
            <div className="w-[120px] shrink-0 lg:w-auto flex items-center justify-center font-bold col-span-1">رمز عبور</div>
            <div className="w-[120px] shrink-0 lg:w-auto flex items-center justify-center font-bold col-span-1">شماره تماس</div>
            <div className="w-[120px] shrink-0 lg:w-auto flex items-center justify-center font-bold col-span-1">ایمیل</div>
            <div className="w-[230px] shrink-0 lg:w-auto flex items-center justify-center col-span-1 pe-5 lg:pe-0"></div>
          </div>

          {users.map((user) => (
            <UserRow
              user={user}
              onShowDeleteModal={(id) => {
                findMainUser(id);
                setIsOpenDeleteModal(true);
              }}
              onShowDetailModal={(id) => {
                findMainUser(id);
                setIsOpenDetailModal(true);
              }}
              onShowEditModal={(id) => {
                findMainUser(id);
                setIsOpenEditModal(true);
              }}
            />
          ))}
        </div>
      </div>

      
      <DeleteModal id={mainUser?.id} isOpenDeleteModal={isOpenDeleteModal} onClose={() => setIsOpenDeleteModal(false)} action={deleteModalSubmitAction}>
        آیا کاربر را حذف میکنید؟
      </DeleteModal>

      <DetailModal isOpenDetailModal={isOpenDetailModal} onClose={() => setIsOpenDetailModal(false)}>
        <div className="grid grid-cols-5 gap-x-5">
          <div className="text-center font-bold">شهر</div>
          <div className="text-center font-bold col-span-2">آدرس</div>
          <div className="text-center font-bold">امتیاز</div>
          <div className="text-center font-bold">میزان خرید</div>
        </div>
        <div className="grid grid-cols-5 gap-x-5">
          <div className="text-center ">{mainUser.city}</div>
          <div className="text-center col-span-2">{mainUser.address}</div>
          <div className="text-center ">{mainUser.score}</div>
          <div className="text-center ">{(+mainUser.buy).toLocaleString()}</div>
        </div>
      </DetailModal>

      <EditModal isOpenEditModal={isOpenEditModal} onClose={() => setIsOpenEditModal(false)} scale={85} editModalSubmitAction={editModalSubmitAction}>
        <Textinput icon={<BagIcon />} placeholder="نام کوچک جدید کاربر را وارد نمایید" value={userNewFirstName} onChange={setUserNewFirstName} />
        <Textinput icon={<BagIcon />} placeholder="نام خانوادگی جدید کاربر را وارد نمایید" value={userNewLastName} onChange={setUserNewLastName} />
        <Textinput icon={<BagIcon />} placeholder="نام کاربری جدید کاربر را وارد نمایید" value={userNewUserName} onChange={setUserNewUserName} />
        <Textinput icon={<BagIcon />} placeholder="پسورد جدید کاربر را وارد نمایید" value={userNewPassword} onChange={setUserNewPassword} />
        <Textinput icon={<BagIcon />} placeholder="ایمیل جدید کاربر را وارد نمایید" value={userNewEmail} onChange={setUserNewEmail} />
        <Textinput icon={<BagIcon />} placeholder="شماره تماس جدید کاربر را وارد نمایید" value={userNewPhone} onChange={setUserNewPhone} />
        <Textinput icon={<BagIcon />} placeholder="امتیاز جدید کاربر را وارد نمایید" value={userNewScore} onChange={setUserNewScore} />
        <Textinput icon={<BagIcon />} placeholder="میزان خرید جدید کاربر را وارد نمایید" value={userNewBuy} onChange={setUserNewBuy} />
        <Textinput icon={<BagIcon />} placeholder="شهر جدید کاربر را وارد نمایید" value={userNewCity} onChange={setUserNewCity} />
        <Textinput icon={<BagIcon />} placeholder="آدرس جدید کاربر را وارد نمایید" value={userNewAddress} onChange={setUserNewAddress} />
      </EditModal>
    </>
  ) : (
    <Errorbox msg="هیچ کاربری وجود ندارد" />
  );
};

export default UsersTable;
