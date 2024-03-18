"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { redirect } from "next/navigation";
import ProfileAccountInfo from "../components/ProfileAccountInfo";
import { reset } from "../redux/features/auth/authSlice.js";
import EnrollmentDetails from "../components/EnrollmentDetails";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);

  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!user?.user) {
      redirect("/");
    }

    dispatch(reset());
  }, [user, dispatch]);

  useEffect(() => {
    let mounted = true;

    if (user?.user && mounted) {
      setUserData(user?.user);
    }

    return () => {
      mounted = false;
    };
  }, [user]);

  return (
    <>
      <div className="row">
        <div className="col-lg-3 my-5 mx-4 mb-lg-0">
          <ProfileAccountInfo data={userData} />
        </div>
        <div className="col-lg-8 my-5 mx-4 mb-lg-0">
          <div className="mb-4">
            <EnrollmentDetails />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
