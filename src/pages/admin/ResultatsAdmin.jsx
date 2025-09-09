import {
  faChevronDown,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";

const ResultatsAdmin = () => {
  const [results, setResults] = useState([]);
  const fetchData = () => {
    axios
      .get("https://mon-innovation-pedagogique-en-120.onrender.com/api/results_agg")
      .then((res) => {
        console.log(res);
        setResults(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const filters = [
    "A-Z",
    "Z-A",
    "Date ASC",
    "Date DESC",
    "Moyenne ASC",
    "Moyenne DESC",
  ];
  const [filter, setFilter] = useState("Filter");
  const [filterDropdown, setFilterDropdown] = useState(false);
  return (
    <div className="px-4 md:px-6 lg:px-20 py-10">
      <div className="w-fit mx-auto text-center space-y-2">
        <h1 className="text-zinc-800 text-4xl font-semibold">
          Résultats Réels
        </h1>
        <p className="text-zinc-800">surveiller les Résultats en direct</p>
      </div>
      <div className="flex flex-col gap-5 md:gap-0 md:flex-row md:justify-between mt-10">
        <div className="flex w-full items-stretch">
          <input
            type="text"
            className="border-3 border-r-0 w-full md:w-1/2 px-4 py-2 focus:outline-0"
            placeholder="Cherchez Un Candidat"
          />
          <button className="bg-black text-white px-4 border-3 border-black cursor-pointer">
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
      <div className="mt-10">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse shadow">
            <thead>
              <tr className="border-b text-zinc-700">
                <th className="p-3 text-left">Candidat</th>
                <th className="p-3 text-left">Pays</th>
                <th className="p-3 text-left">Titre</th>
                <th className="p-3 text-center whitespace-nowrap">
                  Moyenne Générale
                </th>
                <th className="p-3 text-center whitespace-nowrap">
                  Votes Public
                </th>
              </tr>
            </thead>
            <tbody>
              {results &&
                results.map((r) => (
                  <tr
                    key={r.resultats_id}
                    className="border-b border-zinc-300 text-zinc-700"
                  >
                    <td className="p-3 whitespace-nowrap">
                      {r.nom} {r.prenom}
                    </td>
                    <td className="p-3">{r.pays}</td>
                    <td className="p-3 whitespace-nowrap">{r.titre}</td>
                    <td className="p-3 text-center">
                      {r.score_jury}
                    </td>
                    <td className="p-3 text-center">
                      {r.votes_count}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResultatsAdmin;
