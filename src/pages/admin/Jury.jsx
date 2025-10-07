import {
  faEye,
  faPenToSquare,
  faPlus,
  faTrashCan,
  faUserCheck,
  faUserMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import DeleteArchiveModal from "../../components/DeleteArchiveModal";
import { toast } from "react-toastify";
import JuryModal from "../../components/JuryModal";

const Jury = () => {
  const [juriesStats, setJuriesStats] = useState({});
  const [juries, setJuries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [juryModalOpen, setJuryModalOpen] = useState(false);
  const [juryModalMode, setJuryModalMode] = useState("");
  const [selectedJury, setSelectedJury] = useState(null);

  const fetchData = async () => {
    try {
      const [juries_stats, juries_data] = await Promise.all([
        axios.get("https://mon-innovation-pedagogique-en-120.onrender.com/api/stats/juries-counts", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
        axios.get("https://mon-innovation-pedagogique-en-120.onrender.com/api/stats/juries", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
      ]);

      setJuriesStats(juries_stats.data);
      setJuries(juries_data.data);
    } catch (err) {
      console.error("Erreur lors de la récupération des données :", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await axios.patch(
        `https://mon-innovation-pedagogique-en-120.onrender.com/api/auth/delete/${selectedJury.user_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      setDeleteModalOpen(false);
      fetchData();
      toast.success(res.data.message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: true,
      });
    } catch (err) {
      setLoading(false);
      setDeleteModalOpen(false);
      toast.error(err.response?.data?.error || "Une erreur est survenue.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: true,
      });
    }
  };

  const onSave = async (form) => {
    setLoading(true);
    try {
      if (juryModalMode === "add") {
        const res = await axios.post(
          "https://mon-innovation-pedagogique-en-120.onrender.com/api/auth/create",
          { ...form, role: "jury" },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        fetchData();
        setLoading(false);
        setJuryModalOpen(false);
        toast.success(res.data.message, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: true,
        });
      }
      if (juryModalMode === "edit") {
        const res = await axios.put(
          "https://mon-innovation-pedagogique-en-120.onrender.com/api/auth/edit",
          form,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        fetchData();
        setLoading(false);
        setJuryModalOpen(false);
        toast.success(res.data.message, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: true,
        });
      }
    } catch (err) {
      setLoading(false);
      setJuryModalOpen(false);
      toast.error(err.response?.data?.error || "Une erreur est survenue.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: true,
      });
    }
  };

  const handleAction = async (statut, id) => {
    try {
      const newStatus = statut === "actif" ? "inactif" : "actif";
      const res = await axios.put(
        `https://mon-innovation-pedagogique-en-120.onrender.com/api/auth/status/${id}`,
        { statut: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchData();
      toast.success(res.data.message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: true,
      });
    } catch (err) {
      toast.error(err.response?.data?.error || "Une erreur est survenue.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: true,
      });
    }
  };

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="flex items-center justify-between p-6 rounded-lg shadow-md border border-zinc-200">
          <div className="flex flex-col gap-3">
            <h2 className="text-zinc-700 font-medium">Jurys totaux</h2>
            <span className="text-4xl font-bold text-zinc-800">
              {juriesStats.juries || 0}
            </span>
          </div>
          <img
            src="/person_check.png"
            alt="Jurys totaux"
            className="w-12 h-12"
          />
        </div>
        <div className="flex items-center justify-between p-6 rounded-lg shadow-md border border-zinc-200">
          <div className="flex flex-col gap-3">
            <h2 className="text-zinc-700 font-medium">Jurys actifs</h2>
            <span className="text-4xl font-bold text-zinc-800">
              {juriesStats.juries_actifs || 0}
            </span>
          </div>
          <img
            src="/productivity_green.png"
            alt="Jurys actifs"
            className="w-12 h-12"
          />
        </div>
        <div className="flex items-center justify-between p-6 rounded-lg shadow-md border border-zinc-200">
          <div className="flex flex-col gap-3">
            <h2 className="text-zinc-700 font-medium">Jurys inactifs</h2>
            <span className="text-4xl font-bold text-zinc-800">
              {juriesStats.juries_inactifs || 0}
            </span>
          </div>
          <img
            src="/account_circle_off.png"
            alt="Jurys inactifs"
            className="w-12 h-12"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8 gap-4 md:gap-0">
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-semibold text-zinc-800">
            Gestion des Jurys
          </h1>
          <p className="text-zinc-600">Créez et gérez les membres du jury</p>
        </div>
        <button
          className="bg-[#004C91] rounded-lg px-6 py-2.5 text-white font-semibold transition-colors hover:bg-[#003B70] flex items-center gap-2 cursor-pointer"
          onClick={() => {
            setJuryModalOpen(true);
            setJuryModalMode("add");
            setSelectedJury(null);
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Nouveau jury</span>
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full">
          <thead>
            <tr className="bg-zinc-100 border-b border-zinc-200 text-zinc-700">
              <th className="p-4 text-left font-semibold">Membre</th>
              <th className="p-4 text-left font-semibold">Contact</th>
              <th className="p-4 text-left font-semibold">Pays</th>
              <th className="p-4 text-left font-semibold">Édition</th>
              <th className="p-4 text-left font-semibold">Statut</th>
              <th className="p-4 text-center font-semibold">Évaluations</th>
              <th className="p-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {juries.length > 0 ? (
              juries.map((j) => (
                <tr
                  key={j.user_id}
                  className="border-b border-zinc-200 last:border-0 hover:bg-zinc-50 transition-colors"
                >
                  <td className="p-4 text-zinc-700 font-medium whitespace-nowrap">
                    {j.membre}
                  </td>
                  <td className="p-4 text-zinc-700">{j.contact}</td>
                  <td className="p-4 text-zinc-700">{j.pays}</td>
                  <td className="p-4 text-zinc-700">{j.edition_id}</td>
                  <td className="p-4">
                    <span
                      className={`py-1 px-3 rounded-full text-white text-sm capitalize font-semibold ${
                        j.statut === "actif" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {j.statut}
                    </span>
                  </td>
                  <td className="p-4 text-center text-zinc-700">
                    <span className="mr-2">{j.evaluations}</span>
                    <FontAwesomeIcon
                      icon={faEye}
                      className="text-lg cursor-pointer text-zinc-500 hover:text-blue-600 transition-colors"
                    />
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center items-center gap-4">
                      <button
                        className="text-zinc-500 hover:text-blue-600 transition-colors cursor-pointer"
                        onClick={() => {
                          setJuryModalOpen(true);
                          setJuryModalMode("edit");
                          setSelectedJury(j);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          className="text-lg"
                        />
                      </button>
                      <button
                        className="text-zinc-500 hover:text-red-600 transition-colors cursor-pointer"
                        onClick={() => {
                          setDeleteModalOpen(true);
                          setSelectedJury(j);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          className="text-lg"
                        />
                      </button>
                      <button
                        className={`text-lg transition-colors cursor-pointer ${
                          j.statut === "actif"
                            ? "text-red-500 hover:text-red-600"
                            : "text-green-500 hover:text-green-600"
                        }`}
                        onClick={() => handleAction(j.statut, j.user_id)}
                      >
                        <FontAwesomeIcon
                          icon={
                            j.statut === "actif" ? faUserMinus : faUserCheck
                          }
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center text-zinc-500">
                  Aucun jury trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {juryModalOpen && (
        <JuryModal
          mode={juryModalMode}
          data={selectedJury}
          onClose={() => setJuryModalOpen(false)}
          onSave={onSave}
          loading={loading}
        />
      )}
      {deleteModalOpen && (
        <DeleteArchiveModal
          mode={"supprimez"}
          onSave={handleDelete}
          onClose={() => setDeleteModalOpen(false)}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Jury;
