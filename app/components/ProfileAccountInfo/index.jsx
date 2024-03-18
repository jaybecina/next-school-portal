"use client";
import React, { useState, useEffect } from "react";

const ProfileAccountInfo = ({ data }) => {
  const [userProfileData, setUserProfileData] = useState(null);

  useEffect(() => {
    let mounted = true;

    if (data && mounted) {
      setUserProfileData(data);
    }

    return () => {
      mounted = false;
    };
  }, [data]);

  return (
    <>
      <div class="bg-white overflow-hidden shadow rounded-lg border">
        <div class="lg:px-0 px-4 py-5 sm:px-6">
          <h4 class="text-lg font-medium text-gray-900">User Profile</h4>
          {/* <h4>
            {userProfileData?.first_name} {userProfileData?.middle_name}{" "}
            {userProfileData?.last_name}
          </h4> */}
          {/* <p class="mt-1 max-w-2xl text-sm text-gray-500">
            This is some information about the user.
          </p> */}
        </div>
        <div class="border-t border-gray-200 lg:px-0 px-4 py-3">
          <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-3 px-0 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Full name:</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 break-normal">
                {userProfileData?.first_name} {userProfileData?.middle_name}{" "}
                {userProfileData?.last_name}
              </dd>
            </div>
            <div class="py-3 px-0 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Email address</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userProfileData?.email}
              </dd>
            </div>
            <div class="py-3 px-0 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Phone number</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userProfileData?.contact_num}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};

export default ProfileAccountInfo;
