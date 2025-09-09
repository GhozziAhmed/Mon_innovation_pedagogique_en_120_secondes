import {
  faChevronDown,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";

const Votes = () => {
  const [votes, setVotes] = useState([]);
  const [filteredVotes, setFilteredVotes] = useState([]);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      // Get the active edition
      const editionRes = await axios.get(
        "https://mon-innovation-pedagogique-en-120.onrender.com/api/editions/active"
      );
      const edition_id = editionRes.data.edition_id;
      axios
        .get(`https://mon-innovation-pedagogique-en-120.onrender.com/api/votes/results/${edition_id}`)
        .then((res) => {
          console.log(res.data);
          setVotes(res.data);
          setFilteredVotes(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const results = votes.filter(
      (c) =>
        c.nom?.toUpperCase().includes(search.toUpperCase()) ||
        c.prenom?.toUpperCase().includes(search.toUpperCase())
    );
    setFilteredVotes(results);
  }, [search, votes]);
  const filters = ["A-Z", "Z-A", "Votes ASC", "Votes DESC", "Pays ASC", "Pays DESC"];
  const [filter, setFilter] = useState("Filter");
  const [filterDropdown, setFilterDropdown] = useState(false);
  useEffect(() => {
    const sortedResults = [...votes];
    if (filter === "A-Z") {
      sortedResults.sort((a, b) => a.nom.localeCompare(b.nom));
    } else if (filter === "Z-A") {
      sortedResults.sort((a, b) => b.nom.localeCompare(a.nom));
    } else if (filter === "Votes ASC") {
      sortedResults.sort((a, b) => a.votes - b.votes);
    } else if (filter === "Votes DESC") {
      sortedResults.sort((a, b) => b.votes - a.votes);
    } else if (filter === "Pays ASC") {
      sortedResults.sort((a, b) => a.pays.localeCompare(b.pays));
    } else if (filter === "Pays DESC") {
      sortedResults.sort((a, b) => b.pays.localeCompare(a.pays));
    }
    const finalResults = sortedResults.filter(
      (c) =>
        c.nom?.toUpperCase().includes(search.toUpperCase()) ||
        c.prenom?.toUpperCase().includes(search.toUpperCase())
    );

    setFilteredVotes(finalResults);
  }, [filter]);
  return (
    <div className="px-4 md:px-6 lg:px-20 py-10">
      <div className="w-fit mx-auto text-center space-y-2">
        <h1 className="text-zinc-800 text-4xl font-semibold">Votes Réels</h1>
        <p className="text-zinc-800">surveiller les votes en direct</p>
      </div>
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
      <div className="mt-10">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse shadow">
            <thead>
              <tr className="border-b text-zinc-700">
                <th className="p-3 text-left">Candidat</th>
                <th className="p-3 text-left">Pays</th>
                <th className="p-3 text-left">Titre</th>
                <th className="p-3 text-left">Votes</th>
              </tr>
            </thead>
            <tbody>
              {filteredVotes &&
                filteredVotes.map((v) => (
                  <tr
                    key={v.vote_id}
                    className="border-b border-zinc-300 text-zinc-700"
                  >
                    <td className="p-3">
                      {v.nom} {v.prenom}
                    </td>
                    <td className="p-3">{v.pays}</td>
                    <td className="p-3">{v.titre}</td>
                    <td className="p-3">{v.votes}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Votes;
