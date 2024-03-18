"use client";
import React, { useState, useEffect } from "react";
import {
  fetchAllClub,
  fetchClubDetails,
  createClubMember,
} from "../redux/features/clubs/clubSlice.js";
import { useDispatch, useSelector } from "react-redux";
import CardGroup from "../components/CardGroup";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner/index.jsx";
import Jumbotron from "../components/Jumbotron/index.jsx";
import { getSearchClub } from "../services/clubService.js";
import NoRecord from "../components/NoRecord/index.jsx";
import Details from "../components/Details/index.jsx";
import { joinClubMember } from "../services/clubService.js";

// export const getSome = cache(async () => {
//   const res = await axios.get("https://...", otherAxiosConfigObject);
//   const data = res.json();
//   return data;
// });

// // On Page (or component)

const ClubDetailsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [clubInfo, setClubInfo] = useState(null);
  const [searchData, setSearchData] = useState({
    keyword: "",
    field: "all",
  });
  const [onClickClubPurposeData, setOnClickClubPurposeData] = useState({
    redirect: "true",
    selectedId: null,
  });
  const [clickedToRedirect, setClickedToRedirect] = useState(false);
  const [isMember, setIsMember] = useState(null);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const {
    clubDetails,
    clubIsError,
    clubIsSuccess,
    clubIsLoading,
    clubMessage,
  } = useSelector((state) => state.clubs);

  useEffect(() => {
    // handleGetClubAll();

    dispatch(fetchAllClub());
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
      if (clubDetails?.data) {
        getDetailsData = clubDetails?.data?.data;
      } else {
        const clubDetailsLocSto = JSON.parse(
          localStorage.getItem("clubDetails")
        );
        getDetailsData = clubDetailsLocSto;
      }
      setClubInfo(getDetailsData);
    }

    return () => {
      mounted = false;
    };
  }, [clubDetails]);

  useEffect(() => {
    const member = clubInfo?.student_members?.filter(
      ({ id }) => id === user?.user?.id
    );

    if (member?.length > 0) {
      setIsMember(true);
    }
  }, [clubInfo?.student_members]);

  const handleClickJoin = async (id, student_id) => {
    try {
      const payload = { id, student_id };
      dispatch(createClubMember(payload))
        .then((response) => {
          toast.success("Joined this club successfully!");

          router.push("/clubs");
        })
        .catch((error) => {
          // Handle error
          console.error("Error dispatch createClubMember: ", error);
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
        title="Club Details"
        // subtitle="Detailed Information of this Club"
      />
      <div className="d-flex justify-content-center align-items-center">
        {clubInfo ? <Details data={clubInfo} /> : <NoRecord />}
      </div>
      <div className="d-flex justify-content-center">
        {isMember ? (
          <strong>You are a member to this club</strong>
        ) : (
          <button
            onClick={() => handleClickJoin(clubInfo?.id, user?.user?.id)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-xl"
          >
            Join as New Member
          </button>
        )}
      </div>
    </div>
  );
};

export default ClubDetailsPage;
