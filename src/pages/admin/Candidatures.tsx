import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faEye,
  faFilter,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import CandidateModal from "../../components/CandidateModal";
import { toast } from "react-toastify";
import DeleteArchiveModal from "../../components/DeleteArchiveModal";

const Candidatures = () => {
  const [candidatures, setCandidatures] = useState([]);
  const [filteredCandidatures, setFilteredCandidatures] = useState([]);
  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/candidatures")
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
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [preLoading, setPreLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [CandidatureId, setCandidatureId] = useState(0);
  const handleEdit = (id, mode) => {
    if (mode === "preselectionner") {
      setPreLoading(true);
      axios
        .patch(
          `http://localhost:5000/api/candidatures/${id}/status`,
          { status: "preselectionnee" },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          setPreLoading(false);
          setModalOpen(false);
          fetchData();
          toast.success(res.data.message, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
        })
        .catch((err) => {
          setPreLoading(false);
          toast.error(err.response.data.error, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
        });
    } else {
      setRejectLoading(true);
      axios
        .patch(
          `http://localhost:5000/api/candidatures/${id}/status`,
          { status: mode },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          setRejectLoading(false);
          setModalOpen(false);
          fetchData();
          toast.success(res.data.message, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
        })
        .catch((err) => {
          setPreLoading(false);
          toast.error(err.response.data.error, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
        });
    }
  };
  const handleDelete = () => {
    setDeleteLoading(true);
    axios
      .delete(
        `http://localhost:5000/api/candidatures/delete/${CandidatureId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        fetchData();
        console.log(res);
        setDeleteLoading(false);
        setDeleteModalOpen(false);
        toast.success(res.data.message, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
      })
      .catch((err) => {
        console.log(err);
        setDeleteLoading(false);
        setDeleteModalOpen(false);
        toast.error(err.response.data.error, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
      });
  };
  const [search, setSearch] = useState("");
  useEffect(() => {
    const results = candidatures.filter(
      (c) =>
        c.nom?.toUpperCase().includes(search.toUpperCase()) ||
        c.prenom?.toUpperCase().includes(search.toUpperCase())
    );
    setFilteredCandidatures(results);
  }, [search]);
  const filters = ["A-Z", "Z-A", "Pays ASC", "Pays DESC"];
  const [filter, setFilter] = useState("Filter");
  const [filterDropdown, setFilterDropdown] = useState(false);
  useEffect(() => {
    const sortedResults = [...candidatures];

    // First, apply sorting
    if (filter === "A-Z") {
      sortedResults.sort((a, b) => a.nom.localeCompare(b.nom));
    } else if (filter === "Z-A") {
      sortedResults.sort((a, b) => b.nom.localeCompare(a.nom));
    } else if (filter === "Pays ASC") {
      sortedResults.sort((a, b) => a.pays.localeCompare(b.pays));
    } else if (filter === "Pays DESC") {
      sortedResults.sort((a, b) => b.pays.localeCompare(a.pays));
    }

    // Then, apply the search filter on the sorted results
    const finalResults = sortedResults.filter(
      (c) =>
        c.nom?.toUpperCase().includes(search.toUpperCase()) ||
        c.prenom?.toUpperCase().includes(search.toUpperCase())
    );

    setFilteredCandidatures(finalResults);
  }, [filter, search, candidatures]);
  return (
    <div className="px-4 md:px-6 lg:px-20 py-10">
      <div className="w-fit mx-auto text-center flex flex-col gap-5">
        <h1 className="text-4xl font-semibold text-zinc-800">Candidatures</h1>
        <p className="text-zinc-800">Gérez les statuts des candidatures</p>
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
      <div className="overflow-x-auto mt-5">
        <table className="border-collapse min-w-full">
          <thead>
            <tr className="border-b text-zinc-700">
              <th className="p-3 text-left">Candidat</th>
              <th className="p-3 text-left">Contact</th>
              <th className="p-3 text-left">Pays</th>
              <th className="p-3 text-left">Titre</th>
              <th className="p-3 text-left">Statut</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidatures.map((c) => (
              <tr
                key={c.candidature_id}
                className="border-b border-zinc-400 text-zinc-600"
              >
                <td className="p-3 text-left">
                  {c.nom} {c.prenom}
                </td>
                <td className="p-3 text-left">{c.email}</td>
                <td className="p-3 text-left">{c.pays}</td>
                <td className="p-3 text-left">{c.titre}</td>
                <td className="p-3 text-left">
                  <span
                    className={`py-2 px-4 rounded-full text-white ${
                      c.statut === "en_attente"
                        ? "bg-zinc-400"
                        : c.statut === "preselectionnee"
                        ? "bg-green-400"
                        : "bg-red-500"
                    }`}
                  >
                    {c.statut}
                  </span>
                </td>
                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => {
                      setModalOpen(true);
                      setSelectedCandidate(c);
                    }}
                  >
                    <FontAwesomeIcon icon={faEye} className="cursor-pointer" />
                  </button>
                  {c.statut === "rejete" && (
                    <button
                      className="cursor-pointer"
                      onClick={() => {
                        setDeleteModalOpen(true);
                        setCandidatureId(c.candidature_id);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalOpen && (
        <CandidateModal
          data={selectedCandidate}
          onClose={() => setModalOpen(false)}
          onSave={handleEdit}
          preLoading={preLoading}
          rejectLoading={rejectLoading}
        />
      )}
      {deleteModalOpen && (
        <DeleteArchiveModal
          mode={"supprimez"}
          onClose={() => setDeleteModalOpen(false)}
          onSave={handleDelete}
          loading={deleteLoading}
        />
      )}
    </div>
  );
};

export default Candidatures;
