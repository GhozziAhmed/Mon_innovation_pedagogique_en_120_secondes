import {
  faFilter,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Vote = () => {
  const [candidatures, setCandidatures] = useState([]);
  const [filteredCandidatures, setFilteredCandidatures] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/candidatures?edition_id=1")
      .then((res) => {
        console.log(res.data);
        setCandidatures(res.data);
        setFilteredCandidatures(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
  const [filter, setFilter] = useState("Filter");
  useEffect(() => {
    const sortedResults = [...candidatures];
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
  }, [filter]);
  const [filterDropdown, setFilterDropdown] = useState(false);
  return (
    <div className="px-4 md:px-6 lg:px-20 relative top-20 py-20">
      <h1 className="text-4xl font-semibold">
        BIENVENUE,VOTER POUR VOTRE MEUILLEUR CONDIDAT
      </h1>
      <div className="flex flex-col gap-5 md:gap-0 md:flex-row md:justify-between mt-10">
        <div className="flex w-full items-stretch">
          <input
            type="text"
            className="border-3 border-r-0 w-full md:w-1/2 px-4 py-2 focus:outline-0"
            placeholder="Cherchez Un Candidat"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-black text-white px-4 border-3 border-black">
            <FontAwesomeIcon icon={faFilter} />
          </button>
        </div>

        <div
          className="w-full py-2 md:py-0 md:w-50 relative flex justify-between items-center px-2 border gap-5 cursor-pointer"
          onClick={() => setFilterDropdown(!filterDropdown)}
        >
          {filter}
          <FontAwesomeIcon icon={faChevronDown} />
          {filterDropdown && (
            <div className="absolute bg-white top-full outline w-full z-10 left-0">
              {filters.map((f) => (
                <div
                  key={f}
                  className="p-2 cursor-pointer hover:bg-zinc-200"
                  onClick={() => {
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-20 gap-5">
        {filteredCandidatures &&
          filteredCandidatures.map((c, i) => (
            <div key={i} className="p-2 bg-zinc-100 shadow rounded">
              <img src="/vote.png" alt="" />

              <div className="py-4 px-2">
                <div className="flex justify-between items-center">
                  <span>
                    {c.nom} {c.prenom}
                  </span>
                  <div className="flex gap-2">
                    <Link
                      to={`/vote/${c.candidature_id}`}
                      className="border-2 border-zinc-800 text-zinc-800 py-1 px-3 rounded cursor-pointer"
                    >
                      Plus
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Vote;
