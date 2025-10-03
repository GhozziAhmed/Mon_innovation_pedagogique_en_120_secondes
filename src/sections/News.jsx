import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import NewsCardSkeleton from '../components/NewsCardSkeleton'; // Import the skeleton component

const News = () => {
  const { t } = useTranslation();
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Add a small delay to better showcase the skeleton loader
    setTimeout(() => {
      axios
        .get("https://mon-innovation-pedagogique-en-120.onrender.com/api/news")
        .then((res) => {
          setNews(res.data.slice(0, 3));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1500); // Simulate a network delay of 1.5 seconds
  }, []);

  return (
    <div className="bg-[#454545] py-10 relative">
      <div className="w-full mb-15">
        <div className="bg-[#FCA413] py-3 px-15 rounded-tr-xl rounded-br-xl w-fit">
          <h1 className="text-4xl text-white">
            {t("news.heading")}
          </h1>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-8 md:px-10 lg:px-20 w-full">
        {isLoading ? (
          <>
            {/* Render 3 skeleton cards while loading */}
            <NewsCardSkeleton />
            <NewsCardSkeleton />
            <NewsCardSkeleton />
          </>
        ) : news.length > 0 ? (
          news.map((n) => (
            <div
              key={n.news_id}
              className="bg-white w-80 rounded overflow-hidden max-w-full mx-auto"
            >
              <div className="w-full">
                <img src={n.image_url} alt="" />
              </div>
              <div className="p-5 h-45 flex flex-col justify-between">
                <div>
                  <h2 className="text-center text-xl font-semibold">
                    {n.titre}
                  </h2>
                  <h3 className="text-lg text-zinc-700 text-center">
                    {n.date_publication.substring(0, 10)}
                  </h3>
                  <p className="text-center">{n.description}</p>
                </div>
                <Link
                  to={`/news/${n.news_id}`}
                  className="text-[#004C91] flex items-center gap-1 group"
                >
                  {t("news.readMore")}{" "}
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="transform transition-transform duration-300 group-hover:translate-x-2"
                  />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-white text-xl">
            No news articles found.
          </div>
        )}
      </div>
    </div>
  );
};

export default News;