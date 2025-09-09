import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const NewsDetails = () => {
  const { id } = useParams();
  console.log(id);
  const [article, setArticle] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/news/${id}`)
      .then((res) => {
        console.log(res.data);
        setArticle(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="px-4 md:px-6 lg:px-20 relative top-20 py-20">
      <div className="mb-10">
        <Link to="/" className="text-xl text-[#004C91]">
          <FontAwesomeIcon icon={faChevronLeft} />
          Retourner
        </Link>
      </div>
      <div>
        <img src={article.image_url} alt="" />
        <div className="mt-5">
          <div className="mb-5 space-y-1">
            <h1 className="text-3xl font-semibold">{article.titre}</h1>
            <span className="text-zinc-700">
              {article.date_publication?.substring(0, 10)}
            </span>
          </div>
          <h2 className="text-xl mb-5">{article.description}</h2>
          <p>{article.contenu}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
