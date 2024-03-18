"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { reset } from "../redux/features/auth/authSlice.js";
import LoginForm from "../components/LoginForm";
//

const LoginPage = () => {
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess || user?.user?.accessToken) {
      redirect("/");
    }

    dispatch(reset());
  }, [user, isSuccess, dispatch]);
  return (
    <>
      <LoginForm />
    </>
  );
};

export default LoginPage;
