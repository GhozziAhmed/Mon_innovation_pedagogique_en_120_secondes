import { faChevronDown, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

const Votes = () => {
  const [votes, setVotes] = useState([]);
  const [filteredVotes, setFilteredVotes] = useState([]);
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
        `https://mon-innovation-pedagogique-en-120.onrender.com/api/votes/results/${edition_id}`
      );
      setVotes(res.data);
      setFilteredVotes(res.data);
    } catch (err) {
      console.error(err);
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
    let results = [...votes];

    // Apply search filter first
    results = results.filter(
      (c) =>
        c.nom?.toUpperCase().includes(search.toUpperCase()) ||
        c.prenom?.toUpperCase().includes(search.toUpperCase())
    );

    // Then apply sorting based on the selected filter
    if (filter === "A-Z") {
      results.sort((a, b) => a.nom.localeCompare(b.nom));
    } else if (filter === "Z-A") {
      results.sort((a, b) => b.nom.localeCompare(a.nom));
    } else if (filter === "Votes ASC") {
      results.sort((a, b) => a.votes - b.votes);
    } else if (filter === "Votes DESC") {
      results.sort((a, b) => b.votes - a.votes);
    } else if (filter === "Pays ASC") {
      results.sort((a, b) => a.pays.localeCompare(b.pays));
    } else if (filter === "Pays DESC") {
      results.sort((a, b) => b.pays.localeCompare(a.pays));
    }

    setFilteredVotes(results);
  }, [search, filter, votes]);

  const filters = [
    "A-Z",
    "Z-A",
    "Votes ASC",
    "Votes DESC",
    "Pays ASC",
    "Pays DESC",
  ];

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <div className="w-fit mx-auto text-center space-y-2 mb-8">
        <h1 className="text-zinc-800 text-3xl md:text-4xl font-semibold">
          Votes Réels
        </h1>
        <p className="text-zinc-600">Surveiller les votes en direct</p>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 mb-8">
        <div className="flex w-full md:w-1/2">
          <input
            type="text"
            className="w-full px-4 py-2 focus:outline-none placeholder-zinc-500 border border-zinc-300 border-r-0 rounded-l-lg"
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
              <th className="p-4 text-left font-semibold">Votes</th>
            </tr>
          </thead>
          <tbody>
            {filteredVotes.length > 0 ? (
              filteredVotes.map((v) => (
                <tr
                  key={v.candidature_id}
                  className="border-b border-zinc-200 last:border-0 hover:bg-zinc-50 transition-colors"
                >
                  <td className="p-4 text-zinc-700 whitespace-nowrap">
                    {v.nom} {v.prenom}
                  </td>
                  <td className="p-4 text-zinc-700">{v.pays}</td>
                  <td className="p-4 text-zinc-700">{v.titre}</td>
                  <td className="p-4 text-zinc-700">{v.votes}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-zinc-500">
                  Aucun résultat trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Votes;
