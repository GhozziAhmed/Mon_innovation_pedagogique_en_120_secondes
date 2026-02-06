import { faFilter, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import NewsCardSkeleton from "../components/NewsCardSkeleton";

const Vote = () => {
  const { t } = useTranslation();
  const [candidatures, setCandidatures] = useState([]);
  const [filteredCandidatures, setFilteredCandidatures] = useState([]);
  const [phase, setPhase] = useState("");
  const [nationality, setNationality] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const filterDropdownRef = useRef(null);

  const fetchData = () => {
    setIsLoading(true);
    axios
      .get("http://localhost:5000/api/candidatures?edition_id=1&statut=preselectionnee")
      .then((res) => {
        setCandidatures(res.data);
        setFilteredCandidatures(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    axios
      .get("http://localhost:5000/api/phases/current-phase")
      .then((res) => {
        setPhase(res.data.phase.phase_name);
      })
      .catch((err) => {
        toast.error(err.response.data.error, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: true,
        });
      });
    axios
      .get("http://ip-api.com/json")
      .then((res) => {
        setNationality(res.data.country);
      })
      .catch((err) => console.log(err));
  }, []);

  const [search, setSearch] = useState("");
  useEffect(() => {
    const results = candidatures.filter(
      (c) =>
        c.nom?.toUpperCase().includes(search.toUpperCase()) ||
        c.prenom?.toUpperCase().includes(search.toUpperCase())
    );
    setFilteredCandidatures(results);
  }, [search, candidatures]);

  const filters = ["A-Z", "Z-A"];
  const [filter, setFilter] = useState(t("vote.filter"));
  useEffect(() => {
    let sortedResults = [...candidatures];
    if (filter === "A-Z") {
      sortedResults.sort((a, b) => a.nom.localeCompare(b.nom));
    } else if (filter === "Z-A") {
      sortedResults.sort((a, b) => b.nom.localeCompare(a.nom));
    }

    const finalResults = sortedResults.filter(
      (c) =>
        c.nom?.toUpperCase().includes(search.toUpperCase()) ||
        c.prenom?.toUpperCase().includes(search.toUpperCase())
    );

    setFilteredCandidatures(finalResults);
  }, [filter, candidatures, search]);

  const [filterDropdown, setFilterDropdown] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target)
      ) {
        setFilterDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen relative top-20 bg-gray-100 py-7 px-4 md:px-6 lg:px-20">
      {phase && phase === "Vote public" ? (
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#004c91] text-center md:text-left mb-8">
            {t("vote.heading")}
          </h1>
          <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 mb-10">
            <div className="flex w-full md:w-1/2">
              <input
                type="text"
                className="w-full px-4 py-2 border-2 border-gray-300 border-r-0 rounded-l-lg focus:outline-none focus:border-[#004c91] transition-all"
                placeholder={t("vote.searchPlaceholder")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="bg-[#004c91] text-white px-4 py-2 flex items-center rounded-r-lg">
                <FontAwesomeIcon icon={faFilter} />
              </div>
            </div>

            <div
              className="w-full md:w-auto relative cursor-pointer"
              onClick={() => setFilterDropdown(!filterDropdown)}
              ref={filterDropdownRef}
            >
              <div className="flex justify-between items-center px-4 py-2 border-2 border-gray-300 rounded-lg bg-white hover:border-[#004c91] transition-colors">
                <span>{filter}</span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`ml-2 transition-transform duration-300 ${
                    filterDropdown ? "rotate-180" : ""
                  }`}
                />
              </div>
              {filterDropdown && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg z-10 border border-gray-200 overflow-hidden animate-slide-down">
                  {filters.map((f) => (
                    <div
                      key={f}
                      className="p-3 hover:bg-gray-100 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFilter(f);
                        setFilterDropdown(false);
                      }}
                    >
                      {f}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <NewsCardSkeleton />
              <NewsCardSkeleton />
              <NewsCardSkeleton />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredCandidatures.length > 0 ? (
                filteredCandidatures.map((c) => (
                  <div
                    key={c.candidature_id}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                  >
                    <img
                      src="/vote.png"
                      alt="Candidate"
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-5 flex flex-col items-center text-center">
                      <h2 className="text-xl font-bold text-[#004c91] mb-2">
                        {c.nom} {c.prenom}
                      </h2>
                      <Link
                        to={`/vote/${c.candidature_id}`}
                        className="py-2 px-6 rounded-full font-semibold border-2 border-[#fca413] text-[#fca413] hover:bg-[#fca413] hover:text-white transition-colors duration-300"
                      >
                        {t("vote.readMore")}
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 text-lg py-10">
                  {t("vote.noCandidates")}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center px-4">
          <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-200">
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#004c91] mb-5">
              {phase === "Selection finale"
                ? t("vote.unsupportedPage.heading")
                : t("vote.comingSoon.heading")}
            </h1>
            <h2 className="text-lg md:text-xl font-light text-gray-700">
              {phase
                ? phase === "Selection finale"
                  ? t("vote.unsupportedPage.message")
                  : t("vote.comingSoon.message", { phase })
                : t("vote.comingSoon.pausedMessage")}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vote;
