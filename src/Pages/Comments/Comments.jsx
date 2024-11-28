import React, { useContext, useEffect, useState } from "react";
import Errorbox from "../../components/Errorbox/Errorbox";
import CommentsTable from "../../components/Comments/CommentsTable/CommentsTable";
import { createClient } from "@supabase/supabase-js";
import Loader from "../../components/Loader/Loader";
import { HomeContext } from "../../Contexts/HomeContext";

const supabase = createClient("https://tzibzsgoopiyqnojmoqg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6aWJ6c2dvb3BpeXFub2ptb3FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQyMTY1NjIsImV4cCI6MjAxOTc5MjU2Mn0.3ckNRmW8L-8vGWv4f-xiwilabKZD6I01NoxkHes0Ykc");

export default function Comments() {
  const mainContext = useContext(HomeContext);
  const [isLoad, setIsLoad] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const [mainComment, setMainComment] = useState({});
  
  const getComments = async () => {
    let { data: comments, error } = await supabase.from("comments").select("*");
    if (error) {
      setIsLoad(true);
    } else {
      setIsLoad(true);
      setAllComments(comments);
    }
  };
  
  useEffect(() => {
    mainContext.setIsOpenSidebar(false);
    getComments();
  }, []);
  return <div>{isLoad ? <CommentsTable comments={allComments} getComments={getComments} /> : <Loader/> }</div>;
}
