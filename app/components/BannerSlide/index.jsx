import React, { useState, useEffect } from "react";
import {
  fetchAllBannerSlide,
  fetchBannerSlideDetails,
} from "../../redux/features/bannerSlides/bannerSlideSlice.js";
import { useDispatch, useSelector } from "react-redux";
import CardGroup from "../CardGroup";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "../Spinner/index.jsx";
import Jumbotron from "../Jumbotron/index.jsx";
import { getSearchBannerSlide } from "../../services/bannerSlideService.js";
import NoRecord from "../NoRecord/index.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { doSpace } from "@/app/utils/getSpaceImage.js";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const BannerSlide = ({ slides }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [bannerSlideList, setBannerSlideList] = useState(null);
  const [searchData, setSearchData] = useState({
    keyword: "",
    field: "all",
  });
  const [onClickBannerSlidePurposeData, setOnClickBannerSlidePurposeData] =
    useState({
      redirect: "true",
      selectedId: null,
    });
  const [clickedToRedirect, setClickedToRedirect] = useState(false);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const {
    bannerSlides,
    bannerSlideDetails,
    bannerSlideIsError,
    bannerSlideIsSuccess,
    bannerSlideIsLoading,
    bannerSlideMessage,
  } = useSelector((state) => state.bannerSlides);

  useEffect(() => {
    // handleGetBannerSlideAll();

    dispatch(fetchAllBannerSlide());
  }, []);

  // useEffect(() => {
  //   if (!user?.user) {
  //     toast.error("Unauthorized access");

  //     redirect("/");
  //   }
  // }, [user]);

  useEffect(() => {
    const fetchBannerSlideSearch = async (searchData) => {
      const response = await getSearchBannerSlide(
        searchData?.keyword,
        searchData?.field
      );

      setBannerSlideList(response?.data?.data);

      console.log("fetchBannerSlideSearch response: ", response?.data);
    };

    if (searchData?.keyword && searchData?.field) {
      fetchBannerSlideSearch(searchData);
    } else if (
      bannerSlides?.data?.data?.length > 0 &&
      searchData?.keyword === "" &&
      searchData?.field === "all"
    ) {
      setBannerSlideList(bannerSlides?.data?.data);
    } else {
      setBannerSlideList([]);
    }
  }, [searchData, bannerSlides]);

  if (bannerSlideIsLoading) {
    <Spinner />;
  }

  const dropdownSearchArr = ["all", "title", "body"];
  const handleOnClickRedirect = (link) => {
    const redirectURL = link ? `/${link}` : false;

    router.push(redirectURL);
  };

  return (
    <>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {bannerSlideList?.map((slide, index) => (
          <SwiperSlide
            key={`slide-${index}`}
            onClick={() => handleOnClickRedirect(slide?.link)}
            className={slide?.link ? "cursor-pointer" : ""}
          >
            <div className="relative flex items-end">
              <img
                src={slide?.path ? slide?.path : "/img/default-banner.jpg"}
                alt={`Slide ${index}`}
                className="w-full h-[800px] object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center text-white font-bold text-center justify-center">
                <div className="bg-blue-600 opacity-90 p-5">
                  <h2 className="text-6xl text-white mb-4">{slide?.title}</h2>
                  <p className="text-2xl mb-6">{slide?.body}</p>
                  {/* <div className="button-container"> */}
                  {/* <button className="apply-button">
                    {slide.applyButtonText}
                  </button> */}
                  {/* <Button
                    type="primary"
                    shape="round"
                    size="large"
                    className="bg-blue-600"
                  >
                    {slide.applyButtonText}
                  </Button>
                  <Button
                    type="default"
                    shape="round"
                    size="large"
                    className="bg-white ml-4"
                    href="#contact-us-section"
                  >
                    {slide.contactButtonText}
                  </Button> */}
                  {/* </div> */}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default BannerSlide;
