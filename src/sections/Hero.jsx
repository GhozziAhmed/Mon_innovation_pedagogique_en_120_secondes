import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-[#4AADCE] w-full py-10 md:py-20 px-8 md:px-10 lg:px-20 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
      <div className="w-full md:w-1/2 flex flex-col text-center md:text-left gap-10 mb-10 md:mb-0">
        <h1 className="text-5xl lg:text-6xl leading-13 lg:leading-17 font-semibold text-white">
          {t("hero.title.part1")}{" "}
          <span className="text-[#FCA413]">{t("hero.title.part3")}</span>
          <br /> {t("hero.title.part2")}
          <br /> {t("hero.title.part4")}{" "}
          <span className="text-[#FCA413]">{t("hero.title.part5")}</span>
        </h1>
        <p className="text-white text-lg lg:text-xl">{t("hero.description")}</p>
        <div className="flex gap-2 w-full justify-center md:justify-start">
          <Link
            to="/participation"
            className="py-2 px-6 cursor-pointer rounded-full text-white bg-[#FCA413]"
          >
            {t("hero.buttons.participate")}
          </Link>
          <Link
            to="/vote"
            className="py-2 px-6 cursor-pointer rounded-full text-white border border-[#FCA413]"
          >
            {t("hero.buttons.vote")}
          </Link>
        </div>
      </div>
      <div className="relative">
        <video
          width="640"
          height="360"
          controls
          className="relative z-10 w-200 max-w-full"
        >
          <source src="/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="hidden md:block size-50 bg-[#FCA413] absolute -left-3 -bottom-3"></div>
        <div className="hidden md:block size-50 bg-[#FCA413] absolute -right-3 -top-3"></div>
        <div className="hidden md:block size-25 bg-white absolute -right-1 -bottom-1"></div>
      </div>
    </div>
  );
};

export default Hero;
