import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faEye,
  faFilter,
  faTrash,
  faUserTag,
} from "@fortawesome/free-solid-svg-icons";
import CandidateModal from "../../components/CandidateModal";
import { toast } from "react-toastify";
import DeleteArchiveModal from "../../components/DeleteArchiveModal";

const Candidatures = () => {
  const [candidatures, setCandidatures] = useState([]);
  const [filteredCandidatures, setFilteredCandidatures] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Filtrer");
  const [filterDropdown, setFilterDropdown] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [preLoading, setPreLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [CandidatureId, setCandidatureId] = useState(0);
  const [assignLoading, setAssignLoading] = useState(false);

  const filterDropdownRef = useRef(null);

  const fetchData = async () => {
    try {
      const res = await axios.get("https://mon-innovation-pedagogique-en-120.onrender.com/api/candidatures");
      setCandidatures(res.data);
      setFilteredCandidatures(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleEdit = async (id, mode) => {
    const status = mode === "preselectionner" ? "preselectionnee" : mode;
    const setLoading =
      mode === "preselectionner" ? setPreLoading : setRejectLoading;

    setLoading(true);
    try {
      const res = await axios.patch(
        `https://mon-innovation-pedagogique-en-120.onrender.com/api/candidatures/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      setModalOpen(false);
      fetchData();
      toast.success(res.data.message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: true,
      });
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.error || "Une erreur est survenue.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: true,
      });
    }
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      const res = await axios.delete(
        `https://mon-innovation-pedagogique-en-120.onrender.com/api/candidatures/delete/${CandidatureId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDeleteLoading(false);
      setDeleteModalOpen(false);
      fetchData();
      toast.success(res.data.message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: true,
      });
    } catch (err) {
      setDeleteLoading(false);
      setDeleteModalOpen(false);
      toast.error(err.response?.data?.error || "Une erreur est survenue.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: true,
      });
    }
  };

  const handleAssign = async () => {
    setAssignLoading(true);
    try {
      const res = await axios.post(
        "https://mon-innovation-pedagogique-en-120.onrender.com/api/jury/admin/auto/1",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAssignLoading(false);
      toast.success(res.data.message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: true,
      });
    } catch (err) {
      setAssignLoading(false);
      toast.error(err.response?.data?.error || "Une erreur est survenue.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: true,
      });
    }
  };

  useEffect(() => {
    let results = [...candidatures];

    // Apply search filter first
    results = results.filter(
      (c) =>
        c.nom?.toUpperCase().includes(search.toUpperCase()) ||
        c.prenom?.toUpperCase().includes(search.toUpperCase())
    );

    // Then, apply sorting based on the selected filter
    if (filter === "A-Z") {
      results.sort((a, b) => a.nom.localeCompare(b.nom));
    } else if (filter === "Z-A") {
      results.sort((a, b) => b.nom.localeCompare(a.nom));
    } else if (filter === "Pays ASC") {
      results.sort((a, b) => a.pays.localeCompare(b.pays));
    } else if (filter === "Pays DESC") {
      results.sort((a, b) => b.pays.localeCompare(a.pays));
    }

    setFilteredCandidatures(results);
  }, [filter, search, candidatures]);

  const filters = ["A-Z", "Z-A", "Pays ASC", "Pays DESC"];

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8 gap-4 md:gap-0">
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-semibold text-zinc-800">
            Candidatures
          </h1>
          <p className="text-zinc-600">Gérez les statuts des candidatures</p>
        </div>
        <button
          className="bg-[#004C91] rounded-lg px-6 py-2.5 text-white cursor-pointer font-semibold transition-colors hover:bg-[#003B70] flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleAssign}
          disabled={assignLoading}
        >
          {assignLoading ? (
            "Chargement..."
          ) : (
            <>
              <FontAwesomeIcon icon={faUserTag} />
              <span>Affecter aux jurys</span>
            </>
          )}
        </button>
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
        <div className="relative w-full md:w-52" ref={filterDropdownRef}>
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
              <th className="p-4 text-left font-semibold">Contact</th>
              <th className="p-4 text-left font-semibold">Pays</th>
              <th className="p-4 text-left font-semibold">Titre</th>
              <th className="p-4 text-left font-semibold">Statut</th>
              <th className="p-4 font-semibold text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidatures.length > 0 ? (
              filteredCandidatures.map((c) => (
                <tr
                  key={c.candidature_id}
                  className="border-b border-zinc-200 last:border-0 hover:bg-zinc-50 transition-colors"
                >
                  <td className="p-4 text-zinc-700 font-medium whitespace-nowrap">
                    {c.nom} {c.prenom}
                  </td>
                  <td className="p-4 text-zinc-700 whitespace-nowrap">{c.email}</td>
                  <td className="p-4 text-zinc-700">{c.pays}</td>
                  <td className="p-4 text-zinc-700">{c.titre}</td>
                  <td className="p-4">
                    <span
                      className={`py-1 px-3 rounded-full text-white text-sm capitalize font-semibold
                        ${
                          c.statut === "en_attente"
                            ? "bg-yellow-500"
                            : c.statut === "preselectionnee"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                    >
                      {c.statut.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex justify-start items-center gap-4">
                      <button
                        className="text-zinc-500 hover:text-blue-600 transition-colors"
                        onClick={() => {
                          setModalOpen(true);
                          setSelectedCandidate(c);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faEye}
                          className="cursor-pointer text-lg"
                        />
                      </button>
                      {c.statut === "rejete" && (
                        <button
                          className="text-zinc-500 hover:text-red-600 transition-colors"
                          onClick={() => {
                            setDeleteModalOpen(true);
                            setCandidatureId(c.candidature_id);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="cursor-pointer text-lg"
                          />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-zinc-500">
                  Aucune candidature trouvée.
                </td>
              </tr>
            )}
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
