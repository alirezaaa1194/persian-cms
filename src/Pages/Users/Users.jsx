import { createClient } from "@supabase/supabase-js";
import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import UsersTable from "../../components/Users/UsersTable/UsersTable";
import { HomeContext } from "../../Contexts/HomeContext";

const supabase = createClient("https://tzibzsgoopiyqnojmoqg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6aWJ6c2dvb3BpeXFub2ptb3FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQyMTY1NjIsImV4cCI6MjAxOTc5MjU2Mn0.3ckNRmW8L-8vGWv4f-xiwilabKZD6I01NoxkHes0Ykc");

export default function Users() {
  const mainContext = useContext(HomeContext);

  useEffect(() => {
    mainContext.setIsOpenSidebar(false);
  }, []);
  const [users, setUser] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const getUsers = async () => {
    let { data: users, error } = await supabase.from("users").select("*");
    setUser(users);
    setIsLoad(true);
  };
  useEffect(() => {
    getUsers();
  }, []);
  return <UsersTable users={users} getUsers={getUsers} isLoad={isLoad} />;
}
