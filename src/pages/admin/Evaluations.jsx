import { faChevronDown, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

const Evaluations = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [filteredEvaluations, setFilteredEvaluations] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Filtrer");
  const [filterDropdown, setFilterDropdown] = useState(false);

  const dropdownRef = useRef(null);

  const fetchData = async () => {
    try {
      const editionRes = await axios.get(
        "https://mon-innovation-pedagogique-en-120.onrender.com/api/editions/active"
      );
      const edition_id = editionRes.data.edition_id;
      const res = await axios.get(
        `https://mon-innovation-pedagogique-en-120.onrender.com/api/jury/admin/evaluations/${edition_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setEvaluations(res.data);
      setFilteredEvaluations(res.data);
    } catch (err) {
      console.error(
        err.response?.data?.error ||
          "Une erreur est survenue lors de la récupération des données."
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle click outside of the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFilterDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Re-filter and sort when search or filter criteria changes
  useEffect(() => {
    let results = [...evaluations];

    // Apply search filter first
    results = results.filter(
      (e) =>
        e.nom?.toUpperCase().includes(search.toUpperCase()) ||
        e.prenom?.toUpperCase().includes(search.toUpperCase()) ||
        e.titre?.toUpperCase().includes(search.toUpperCase())
    );

    // Then apply sorting based on the selected filter
    if (filter === "A-Z") {
      results.sort((a, b) =>
        (a.nom + a.prenom).localeCompare(b.nom + b.prenom)
      );
    } else if (filter === "Z-A") {
      results.sort((a, b) =>
        (b.nom + b.prenom).localeCompare(a.nom + a.prenom)
      );
    } else if (filter === "Date ASC") {
      results.sort(
        (a, b) => new Date(a.date_evaluation) - new Date(b.date_evaluation)
      );
    } else if (filter === "Date DESC") {
      results.sort(
        (a, b) => new Date(b.date_evaluation) - new Date(a.date_evaluation)
      );
    } else if (filter === "Moyenne Finale ASC") {
      results.sort((a, b) => a.avg_finale - b.avg_finale);
    } else if (filter === "Moyenne Finale DESC") {
      results.sort((a, b) => b.avg_finale - a.avg_finale);
    }

    setFilteredEvaluations(results);
  }, [search, filter, evaluations]);

  const filters = ["A-Z", "Z-A", "Moyenne Finale ASC", "Moyenne Finale DESC"];

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <div className="w-fit mx-auto text-center space-y-2 mb-8">
        <h1 className="text-zinc-800 text-3xl md:text-4xl font-semibold">
          Évaluations Réelles
        </h1>
        <p className="text-zinc-600">Surveiller les évaluations en direct</p>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 mb-8">
        <div className="flex w-full md:w-1/2">
          <input
            type="text"
            className="w-full px-4 py-2 focus:outline-none placeholder-zinc-500 rounded-l-lg border border-zinc-300 border-r-0"
            placeholder="Chercher un candidat"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="bg-zinc-800 text-white px-4 py-2 flex items-center rounded-r-lg">
            <FontAwesomeIcon icon={faFilter} />
          </div>
        </div>

        <div className="relative w-full md:w-52" ref={dropdownRef}>
          <div
            className="flex justify-between items-center px-4 py-2 border border-zinc-300 rounded-lg cursor-pointer bg-white transition-colors hover:bg-zinc-50"
            onClick={() => setFilterDropdown(!filterDropdown)}
          >
            <span className="text-zinc-800">{filter}</span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`text-sm transform transition-transform duration-200 ${
                filterDropdown ? "rotate-180" : ""
              }`}
            />
          </div>
          {filterDropdown && (
            <div className="absolute top-full mt-2 w-full z-10 rounded-lg shadow-lg bg-white border border-zinc-200 overflow-hidden">
              {filters.map((f) => (
                <div
                  key={f}
                  className="p-3 text-sm text-zinc-700 cursor-pointer hover:bg-zinc-100 transition-colors"
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
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full">
          <thead>
            <tr className="bg-zinc-100 border-b border-zinc-200 text-zinc-700">
              <th className="p-4 text-left font-semibold">Candidat</th>
              <th className="p-4 text-left font-semibold">Pays</th>
              <th className="p-4 text-left font-semibold">Titre</th>
              <th className="p-4 text-center font-semibold whitespace-nowrap">
                Moyenne Innovation
              </th>
              <th className="p-4 text-center font-semibold whitespace-nowrap">
                Moyenne Technique
              </th>
              <th className="p-4 text-center font-semibold whitespace-nowrap">
                Moyenne Langue
              </th>
              <th className="p-4 text-center font-semibold whitespace-nowrap">
                Moyenne Coup de Coeur
              </th>
              <th className="p-4 text-center font-semibold whitespace-nowrap">
                Moyenne Finale
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEvaluations.length > 0 ? (
              filteredEvaluations.map((e) => (
                <tr
                  key={e.candidature_id}
                  className="border-b border-zinc-200 last:border-0 hover:bg-zinc-50 transition-colors"
                >
                  <td className="p-4 text-zinc-700 whitespace-nowrap">
                    {e.nom} {e.prenom}
                  </td>
                  <td className="p-4 text-zinc-700">{e.pays}</td>
                  <td className="p-4 text-zinc-700 whitespace-nowrap">
                    {e.titre}
                  </td>
                  <td className="p-4 text-center text-zinc-700">
                    {Number(e.avg_innovation).toFixed(2)}
                  </td>
                  <td className="p-4 text-center text-zinc-700">
                    {Number(e.avg_technique).toFixed(2)}
                  </td>
                  <td className="p-4 text-center text-zinc-700">
                    {Number(e.avg_langue).toFixed(2)}
                  </td>
                  <td className="p-4 text-center text-zinc-700">
                    {Number(e.avg_coup_de_coeur).toFixed(2)}
                  </td>
                  <td className="p-4 text-center text-zinc-700 font-bold">
                    {Number(e.avg_finale).toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-4 text-center text-zinc-500">
                  Aucune évaluation trouvée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Evaluations;
