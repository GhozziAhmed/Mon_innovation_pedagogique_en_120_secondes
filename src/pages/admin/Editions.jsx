import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrashCan,
  faPenToSquare,
  faBoxArchive,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import EditionModal from "../../components/EditionModal";
import { toast } from "react-toastify";
import DeleteArchiveModal from "../../components/DeleteArchiveModal";

const Editions = () => {
  const [editions, setEditions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionMode, setActionMode] = useState("");
  const [actionOpen, setActionOpen] = useState(false);
  const [modalId, setModalId] = useState(0);

  const fetchEditions = async () => {
    try {
      const res = await axios.get(
        "https://mon-innovation-pedagogique-en-120.onrender.com/api/editions"
      );
      setEditions(res.data);
    } catch (err) {
      console.error("Erreur lors de la récupération des éditions:", err);
      toast.error("Échec de la récupération des éditions.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: true,
      });
    }
  };

  useEffect(() => {
    fetchEditions();
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalOpen || actionOpen ? "hidden" : "auto";
  }, [modalOpen, actionOpen]);

  const onSave = async (form) => {
    setLoading(true);
    try {
      if (modalMode === "add") {
        await axios.post(
          "https://mon-innovation-pedagogique-en-120.onrender.com/api/editions",
          form,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        toast.success("Édition ajoutée avec succès !", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: true,
        });
      } else {
        await axios.put(
          "https://mon-innovation-pedagogique-en-120.onrender.com/api/editions/edit",
          form,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        toast.success("Édition modifiée avec succès !", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: true,
        });
      }
      setModalOpen(false);
      fetchEditions();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Une erreur est survenue.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await axios.delete(
        `https://mon-innovation-pedagogique-en-120.onrender.com/api/editions/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(res.data.message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: true,
      });
      fetchEditions();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Une erreur est survenue.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: true,
      });
    } finally {
      setLoading(false);
      setActionOpen(false);
    }
  };

  const handleArchive = async (id) => {
    setLoading(true);
    try {
      const res = await axios.put(
        `https://mon-innovation-pedagogique-en-120.onrender.com/api/editions/${id}/archive`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(res.data.message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: true,
      });
      fetchEditions();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Une erreur est survenue.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: true,
      });
    } finally {
      setLoading(false);
      setActionOpen(false);
    }
  };
  // set all phases of the archived edition to pending
  const reset = () => {
    axios
      .put(
        "https://mon-innovation-pedagogique-en-120.onrender.com/api/phases/reset",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.message);
        fetchEditions();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal server error", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: true,
        });
      });
  };

  const updatePhasesEdition = (id) => {
    axios.put(
      `https://mon-innovation-pedagogique-en-120.onrender.com/api/phases/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    ).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    });
  };

  const handleActive = async (id) => {
    try {
      const res = await axios.put(
        `https://mon-innovation-pedagogique-en-120.onrender.com/api/editions/${id}/activate`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(res.data.message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: true,
      });
      reset();
      updatePhasesEdition(id);
      fetchEditions();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Une erreur est survenue.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: true,
      });
    }
  };

  const onAction = () => {
    if (actionMode === "supprimez") handleDelete(modalId);
    if (actionMode === "archivez") handleArchive(modalId);
  };

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <div className="flex flex-col gap-5 md:gap-0 md:flex-row justify-between items-center mb-10">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <h1 className="text-4xl font-semibold text-zinc-800">
            Gestion des éditions
          </h1>
          <h2 className="text-zinc-600">
            Créez et gérez les éditions du concours
          </h2>
        </div>
        <button
          className="bg-[#004C91] text-white py-2.5 px-6 rounded-lg font-semibold flex items-center gap-2 transition-colors hover:bg-[#003B70] cursor-pointer"
          onClick={() => {
            setModalOpen(true);
            setModalMode("add");
            setSelected(null);
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Nouvelle édition</span>
        </button>
      </div>
      <div className="mt-8">
        <h1 className="text-3xl font-semibold text-zinc-800 mb-4">
          Éditions du concours
        </h1>
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="w-full table-auto">
            <thead className="bg-zinc-100 border-b border-zinc-200">
              <tr className="text-gray-500 text-sm uppercase">
                <th className="p-4 text-left font-semibold">Année</th>
                <th className="p-4 text-left font-semibold">Thème</th>
                <th className="p-4 text-left font-semibold">Période</th>
                <th className="p-4 text-left font-semibold">Lieu</th>
                <th className="p-4 text-left font-semibold">Statut</th>
                <th className="p-4 text-left font-semibold">Candidats</th>
                <th className="p-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {editions.length > 0 ? (
                editions.map((e) => (
                  <tr
                    key={e.edition_id}
                    className="border-b border-zinc-200 last:border-0 hover:bg-zinc-50 transition-colors"
                  >
                    <td className="p-4 text-zinc-700">{e.annee}</td>
                    <td className="p-4 text-zinc-700">{e.theme}</td>
                    <td className="p-4 text-zinc-700 whitespace-nowrap">
                      {e.date_debut.substring(0, 10)} -{" "}
                      {e.date_fin.substring(0, 10)}
                    </td>
                    <td className="p-4 text-zinc-700">{e.lieu}</td>
                    <td className="p-4">
                      <span
                        className={`py-1 px-3 text-white rounded-full text-xs font-semibold ${
                          e.is_active === 1 ? "bg-green-500" : "bg-yellow-500"
                        }`}
                      >
                        {e.is_active === 1 ? "Active" : "Archivée"}
                      </span>
                    </td>
                    <td className="p-4 text-zinc-700">{e.candidature_count}</td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center items-center gap-4">
                        <button
                          className="text-zinc-500 hover:text-blue-600 transition-colors cursor-pointer"
                          onClick={() => {
                            setModalOpen(true);
                            setModalMode("edit");
                            setSelected(e);
                          }}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        <button
                          className="text-zinc-500 hover:text-red-600 transition-colors cursor-pointer"
                          onClick={() => {
                            setActionOpen(true);
                            setActionMode("supprimez");
                            setModalId(e.edition_id);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                        <button
                          className={`text-zinc-500 ${
                            e.is_active === 1
                              ? "hover:text-orange-600"
                              : "hover:text-green-500"
                          } transition-colors cursor-pointer`}
                          onClick={() => {
                            if (e.is_active === 1) {
                              setActionOpen(true);
                              setActionMode("archivez");
                              setModalId(e.edition_id);
                            } else {
                              handleActive(e.edition_id);
                            }
                          }}
                        >
                          {e.is_active === 1 ? (
                            <FontAwesomeIcon icon={faBoxArchive} />
                          ) : (
                            <FontAwesomeIcon icon={faCalendarCheck} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-zinc-500">
                    Aucune édition trouvée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {modalOpen && (
        <EditionModal
          onClose={() => setModalOpen(false)}
          mode={modalMode}
          data={selected}
          onSave={onSave}
          loading={loading}
        />
      )}
      {actionOpen && (
        <DeleteArchiveModal
          onClose={() => setActionOpen(false)}
          mode={actionMode}
          onSave={onAction}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Editions;
