"use client";
import React, { useState, useEffect } from "react";
import {
  fetchAllSport,
  fetchSportDetails,
  createSportMember,
} from "../redux/features/sports/sportSlice.js";
import { useDispatch, useSelector } from "react-redux";
import CardGroup from "../components/CardGroup";
import { useRouter, redirect } from "next/navigation";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner/index.jsx";
import Jumbotron from "../components/Jumbotron/index.jsx";
import { getSearchSport } from "../services/sportService.js";
import NoRecord from "../components/NoRecord/index.jsx";
import Details from "../components/Details/index.jsx";

// export const getSome = cache(async () => {
//   const res = await axios.get("https://...", otherAxiosConfigObject);
//   const data = res.json();
//   return data;
// });

// // On Page (or component)

const SportDetailsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [sportInfo, setSportInfo] = useState(null);
  const [searchData, setSearchData] = useState({
    keyword: "",
    field: "all",
  });
  const [onClickSportPurposeData, setOnClickSportPurposeData] = useState({
    redirect: "true",
    selectedId: null,
  });
  const [clickedToRedirect, setClickedToRedirect] = useState(false);
  const [isMember, setIsMember] = useState(null);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const {
    sportDetails,
    sportIsError,
    sportIsSuccess,
    sportIsLoading,
    sportMessage,
  } = useSelector((state) => state.sports);

  useEffect(() => {
    // handleGetSportAll();

    dispatch(fetchAllSport());
  }, []);

  useEffect(() => {
    if (!user?.user) {
      toast.error("Unauthorized access");

      redirect("/");
    }
  }, [user]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      let getDetailsData = null;
      if (sportDetails?.data) {
        getDetailsData = sportDetails?.data?.data;
      } else {
        const sportDetailsLocSto = JSON.parse(
          localStorage.getItem("sportDetails")
        );
        getDetailsData = sportDetailsLocSto;
      }
      setSportInfo(getDetailsData);
    }

    return () => {
      mounted = false;
    };
  }, [sportDetails]);

  useEffect(() => {
    const member = sportInfo?.student_members?.filter(
      ({ id }) => id === user?.user?.id
    );

    if (member?.length > 0) {
      setIsMember(true);
    }
  }, [sportInfo?.student_members]);

  const handleClickJoin = async (id, student_id) => {
    try {
      const payload = { id, student_id };
      dispatch(createSportMember(payload))
        .then((response) => {
          toast.success("Joined this sport successfully!");

          router.push("/sports");
        })
        .catch((error) => {
          // Handle error
          console.error("Error dispatch createSportMember: ", error);
        });
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Joining failed error: " + error?.message);
    }
  };

  return (
    <div>
      <Jumbotron
        hasSearchInput={false}
        title="Sport Details"
        // subtitle="Detailed Information of this Sport"
      />
      <div className="d-flex justify-content-center align-items-center">
        {sportInfo ? <Details data={sportInfo} /> : <NoRecord />}
      </div>
      <div className="d-flex justify-content-center">
        {isMember ? (
          <strong>You are a member to this sport</strong>
        ) : (
          <button
            onClick={() => handleClickJoin(sportInfo?.id, user?.user?.id)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-xl"
          >
            Join as New Member
          </button>
        )}
      </div>
    </div>
  );
};

export default SportDetailsPage;
