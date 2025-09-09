import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrashCan,
  faPenToSquare,
  faBoxArchive,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import EditionModal from "../../components/EditionModal";
import { toast } from "react-toastify";
import DeleteArchiveModal from "../../components/DeleteArchiveModal";

const Editions = () => {
  const fetchEditions = () => {
    axios
      .get("https://mon-innovation-pedagogique-en-120.onrender.com/api/editions")
      .then((res) => {
        console.log(res);
        setEditions(res.data);
      })
      .catch((err) => console.log(err));
  }
  const [editions, setEditions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchEditions()
  }, []);
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "auto";
  }, [modalOpen]);
  const onSave = (form) => {
    setLoading(true);
    console.log(form);
    if (modalMode === "add") {
      axios
        .post("https://mon-innovation-pedagogique-en-120.onrender.com/api/editions", form, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setLoading(false);
          fetchEditions()
          toast.success("Edition added successfully !", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
          setModalOpen(false);
        })
        .catch((err) => {
          console.log(err);
          setModalOpen(false);
        });
    } else {
      axios
        .put("https://mon-innovation-pedagogique-en-120.onrender.com/api/editions/edit", form, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setLoading(false);
          fetchEditions()
          toast.success("mrigl", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
          setModalOpen(false);
        })
        .catch((err) => {
          console.log(err);
          setModalOpen(false);
          setLoading(false);
        });
    }
  };
  const handleDelete = (id) => {
    setLoading(true);
    axios
      .delete(`https://mon-innovation-pedagogique-en-120.onrender.com/api/editions/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        setActionOpen(false);
        fetchEditions();
        toast.success(res.data.message, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setActionOpen(false)
        toast.error(err.response.data.error, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
      });
  };
  const handleArchive = (id) => {
    setLoading(true);
    axios
      .put(`https://mon-innovation-pedagogique-en-120.onrender.com/api/editions/${id}/archive`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        setActionOpen(false);
        fetchEditions();
        toast.success(res.data.message, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
        setEditions(editions);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setActionOpen(false)
        toast.error(err.response.data.error, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
      });
  };
  const [actionMode, setActionMode] = useState("");
  const [actionOpen, setActionOpen] = useState(false);
  const [modalId, setModalId] = useState(0);
  const onAction = () => {
    if(actionMode == "supprimez") handleDelete(modalId);
    if(actionMode == "archivez") handleArchive(modalId);
  }
  return (
    <div className="px-4 md:px-6 lg:px-20 mt-10">
      <div className="flex flex-col gap-5 md:gap-0 md:flex-row md:justify-between items-center">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-semibold text-zinc-800">
            Géstion des éditions
          </h1>
          <h2 className="text-zinc-800">
            Créez et gérez les éditions du concours
          </h2>
        </div>
        <button
          className="bg-[#004C91] text-white cursor-pointer py-2 px-4 rounded flex items-center gap-2 text-2xl"
          onClick={() => {
            setModalOpen(true);
            setModalMode("add");
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span className="">nouvelle édition</span>
        </button>
      </div>
      <div className="mt-20">
        <h1 className="text-3xl font-semibold text-zinc-800">
          Éditions du concours
        </h1>
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="text-gray-500 text-sm">
              <tr className="border-b-2 border-gray-500">
                <th className="p-3 text-left">Année</th>
                <th className="p-3 text-left">Theme</th>
                <th className="p-3 text-left">Periode</th>
                <th className="p-3 text-left">Lieu</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Candidats</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
              {editions.map((e) => (
                <tr>
                  <td className="p-3 text-left">{e.annee}</td>
                  <td className="p-3 text-left">{e.theme}</td>
                  <td className="p-3 text-left whitespace-nowrap">
                    {e.date_debut.substring(0, 10)} -{" "}
                    {e.date_fin.substring(0, 10)}
                  </td>
                  <td className="p-3 text-left">{e.lieu}</td>
                  <td className="p-3 text-left">
                    <span
                      className={`py-1 px-3 text-white rounded-full ${
                        e.is_active === 1 ? "bg-green-400" : "bg-yellow-400"
                      }`}
                    >
                      {e.is_active === 1 ? "Active" : "Archivée"}
                    </span>
                  </td>
                  <td className="p-3 text-left">{e.candidature_count}</td>
                  <td className="p-3 text-left text-zinc-800 text-2xl flex gap-4">
                    <button
                      className="cursor-pointer"
                      onClick={() => {
                        setModalOpen(true);
                        setModalMode("edit");
                        setSelected(e);
                      }}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button
                      className="cursor-pointer"
                      onClick={() => {
                        setActionOpen(true);
                        setActionMode("supprimez");
                        setModalId(e.edition_id);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                    <button
                      className="cursor-pointer"
                      onClick={() => {
                        setActionOpen(true);
                        setActionMode("archivez");
                        setModalId(e.edition_id);
                      }}
                    >
                      <FontAwesomeIcon icon={faBoxArchive} />
                    </button>
                  </td>
                </tr>
              ))}
            </thead>
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
      {
        actionOpen && (
          <DeleteArchiveModal onClose={() => setActionOpen(false)} mode={actionMode} onSave={onAction} loading={loading}/>
        )
      }
    </div>
  );
};

export default Editions;
