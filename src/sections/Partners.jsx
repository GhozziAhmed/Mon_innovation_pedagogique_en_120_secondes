import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { useTranslation } from "react-i18next";

const Partners = () => {
  const {t} = useTranslation();
  const header = t("partners").header;
  const [partners, setPartners] = useState([]);
  useEffect(() => {
    axios
      .get("https://mon-innovation-pedagogique-en-120.onrender.com/api/partners/")
      .then((res) => {
        setPartners(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="w-full px-8 md:px-10 lg:px-20 py-20">
      <h1 className="text-[#004C91] text-3xl text-center font-semibold mb-15">
        {header}
      </h1>
      {partners.length > 0 && (
        <Swiper
          modules={[Autoplay]} // register autoplay
          spaceBetween={30}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          breakpoints={{
            320: { slidesPerView: 2 }, // phones
            640: { slidesPerView: 3 }, // tablets
            1024: { slidesPerView: 5 }, // laptops
            1280: { slidesPerView: 6 }, // big screens
          }}
        >
          {partners.map((p) => (
            <SwiperSlide
              key={p.partenaire_id}
              className="flex items-center justify-center h-24" // fixed height
            >
              <img
                src={p.logo}
                alt={p.nom}
                className="max-h-24 object-contain mx-auto"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Partners;
