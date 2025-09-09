import {
  faChevronDown,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const JuryCandidatures = () => {
  const [candidatures, setCandidatures] = useState([]);
  const [filteredCandidatures, setFilteredCandidatures] = useState([]);
  const [search, setSearch] = useState("");
  const filters = ["Tous", "A-Z", "Z-A", "Evaluée", "Non Evaluée"];
  const [filter, setFilter] = useState(filters[0]);
  const [filterDropdown, setFilterDropdown] = useState(false);
  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/jury/assignments/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setCandidatures(res.data);
        setFilteredCandidatures(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const results = candidatures.filter(
      (c) =>
        c.nom?.toUpperCase().includes(search.toUpperCase()) ||
        c.prenom?.toUpperCase().includes(search.toUpperCase())
    );
    setFilteredCandidatures(results);
  }, [search, candidatures]);
  useEffect(() => {
    let sortedResults = [...candidatures];
    if (filter === "A-Z") {
      sortedResults.sort((a, b) => a.nom.localeCompare(b.nom));
    } else if (filter === "Z-A") {
      sortedResults.sort((a, b) => b.nom.localeCompare(a.nom));
    } else if (filter === "Evaluée") {
      sortedResults = sortedResults.filter((r) => r.evaluated);
    } else if (filter === "Non Evaluée") {
      sortedResults = sortedResults.filter((r) => !r.evaluated);
    } else {
      sortedResults = [...candidatures];
    }
    const finalResults = sortedResults.filter(
      (c) =>
        c.nom?.toUpperCase().includes(search.toUpperCase()) ||
        c.prenom?.toUpperCase().includes(search.toUpperCase())
    );

    setFilteredCandidatures(finalResults);
  }, [filter]);
  return (
    <div className="px-4 md:px-6 lg:px-20 py-10">
      <div className="text-4xl w-fit mx-auto mb-10">
        <h1>Evaluer Votre Candidatures</h1>
      </div>
      <div className="flex flex-col gap-5 md:gap-0 md:flex-row md:justify-between mt-10">
        <div className="flex w-full items-stretch">
          <input
            type="text"
            className="border-3 border-r-0 w-full md:w-1/2 px-4 py-2 focus:outline-0"
            placeholder="Cherchez Un Candidat"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setFilterDropdown(false)}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10">
        {filteredCandidatures &&
          filteredCandidatures.map((c) => (
            <div
              key={c.assignment_id}
              className="rounded overflow-hidden shadow relative border border-zinc-300"
            >
              <img src="/vote.png" alt="" />
              <div className="px-3 py-5">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold">
                    {c.nom} {c.prenom}
                  </h2>
                  <Link
                    to={`/jury/evaluations/${c.candidature_id}`}
                    className="border-2 border-zinc-800 text-zinc-800 rounded px-4 py-1 cursor-pointer"
                  >
                    Plus
                  </Link>
                </div>
              </div>
              <div className="absolute top-2 right-2">
                <img
                  src={c.evaluated ? "/check-circle.png" : "/push-pin.png"}
                  alt=""
                  className="w-5"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default JuryCandidatures;
