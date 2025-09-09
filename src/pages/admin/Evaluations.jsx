import {
  faChevronDown,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";

const Evaluations = () => {
  const [evaluations, setEvaluations] = useState([]);
  const fetchData = async () => {
    const editionRes = await axios.get(
      "http://localhost:5000/api/editions/active"
    );
    const edition_id = editionRes.data.edition_id;
    axios
      .get(`http://localhost:5000/api/jury/evaluations/${edition_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setEvaluations(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.error);
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
    "Votes ASC",
    "Votes DESC",
  ];
  const [filter, setFilter] = useState("Filter");
  const [filterDropdown, setFilterDropdown] = useState(false);
  return (
    <div className="px-4 md:px-6 lg:px-15 py-10">
      <div className="w-fit mx-auto text-center space-y-2">
        <h1 className="text-zinc-800 text-4xl font-semibold">
          Evaluations Réels
        </h1>
        <p className="text-zinc-800">surveiller les evaluations en direct</p>
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
                <th className="p-3 text-center whitespace-nowrap">Moyenne Innovation</th>
                <th className="p-3 text-center whitespace-nowrap">Moyenne Technique</th>
                <th className="p-3 text-center whitespace-nowrap">Moyenne Langue</th>
                <th className="p-3 text-center whitespace-nowrap">Moyenne CDC</th>
                <th className="p-3 text-center whitespace-nowrap">Moyenne Finale</th>
              </tr>
            </thead>
            <tbody>
              {evaluations &&
                evaluations.map((e) => (
                  <tr
                    key={e.candidature_id}
                    className="border-b border-zinc-300 text-zinc-700"
                  >
                    <td className="p-3 whitespace-nowrap">{e.nom} {e.prenom}</td>
                    <td className="p-3">{e.pays}</td>
                    <td className="p-3 whitespace-nowrap">{e.titre}</td>
                    <td className="p-3 text-center">{Number(e.avg_innovation).toFixed(2)}</td>
                    <td className="p-3 text-center">{Number(e.avg_technique).toFixed(2)}</td>
                    <td className="p-3 text-center">{Number(e.avg_langue).toFixed(2)}</td>
                    <td className="p-3 text-center">{Number(e.avg_coup_de_coeur).toFixed(2)}</td>
                    <td className="p-3 text-center">{Number(e.avg_finale).toFixed(2)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Evaluations;
