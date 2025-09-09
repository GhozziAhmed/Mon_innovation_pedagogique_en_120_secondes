import {
  faEye,
  faPenToSquare,
  faPlus,
  faTrashCan,
  faUserCheck,
  faUserMinus
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
  const fetchData = async () => {
    try {
      const [juries_stats, juries] = await Promise.all([
        axios.get("https://mon-innovation-pedagogique-en-120.onrender.com/api/stats/juries-counts", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // or sessionStorage
          },
        }),
        axios.get("https://mon-innovation-pedagogique-en-120.onrender.com/api/stats/juries", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // or sessionStorage
          },
        }),
      ]);

      setJuriesStats(juries_stats.data);
      setJuries(juries.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleDelete = () => {
    setLoading(true);
    axios
      .patch(`https://mon-innovation-pedagogique-en-120.onrender.com/api/auth/delete/${jury.user_id}`, jury, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setDeleteModalOpen(false);
        fetchData();
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
        setDeleteModalOpen(false);
        toast.error(err.response.data.error, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
      });
  };
  const [loading, setLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [juryModalOpen, setJuryModalOpen] = useState(false);
  const [juryModalMode, setJuryModalMode] = useState("");
  const [selectedJury, setSelectedJury] = useState(null);
  const [jury, setJury] = useState({});
  const onSave = (form) => {
    setLoading(true);
    if (juryModalMode === "add") {
      axios
        .post("https://mon-innovation-pedagogique-en-120.onrender.com/api/auth/create", {...form, role : "jury"}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res);
          fetchData();
          setLoading(false);
          setJuryModalOpen(false);
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
          setJuryModalOpen(false);
          toast.error(err.response.data.error, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
        });
    }
    if (juryModalMode === "edit") {
      axios
        .put("https://mon-innovation-pedagogique-en-120.onrender.com/api/auth/edit", form, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res);
          fetchData();
          setLoading(false);
          setJuryModalOpen(false);
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
          setJuryModalOpen(false);
          toast.error(err.response.data.error, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
        });
    }
  };
  const handleAction = (statut, id) => {
    axios.put(`https://mon-innovation-pedagogique-en-120.onrender.com/api/auth/status/${id}`, {statut}, {
      headers : {
        Authorization : `Bearer ${localStorage.getItem("token")}`,
      }
    }).then((res) => {
      console.log(res);
      fetchData()
    }).catch((err) => {
      console.log(err)
    });
  } 
  return (
    <div className="px-4 md:px-6 lg:px-20 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
        <div className="flex items-center justify-between p-5 rounded shadow border border-zinc-200">
          <div className="flex flex-col gap-5">
            <h2 className="text-zinc-700">Jury totales</h2>
            <span className="text-3xl font-semibold">{juriesStats.juries}</span>
          </div>
          <img src="/person_check.png" alt="" className="w-10" />
        </div>
        <div className="flex items-center justify-between p-5 rounded shadow border border-zinc-200">
          <div className="flex flex-col gap-5">
            <h2 className="text-zinc-700">Jury actifs</h2>
            <span className="text-3xl font-semibold">
              {juriesStats.juries_actifs}
            </span>
          </div>
          <img src="/productivity_green.png" alt="" className="w-10" />
        </div>
        <div className="flex items-center justify-between p-5 rounded shadow border border-zinc-200">
          <div className="flex flex-col gap-5">
            <h2 className="text-zinc-700">Jury inactifs</h2>
            <span className="text-3xl font-semibold">
              {juriesStats.juries_inactifs}
            </span>
          </div>
          <img src="/account_circle_off.png" alt="" className="w-10" />
        </div>
      </div>
      <div className="flex flex-col gap-5 md:gap-0 md:flex-row md:justify-between items-center mb-10">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-semibold text-zinc-800">
            Géstion des Jury
          </h1>
          <h2 className="text-zinc-800">
            Créez et gérez les éditions du concours
          </h2>
        </div>
        <button
          className="bg-[#004C91] text-white cursor-pointer py-2 px-4 rounded flex items-center gap-2 text-2xl"
          onClick={() => {
            setJuryModalOpen(true);
            setJuryModalMode("add");
            setSelectedJury(null);
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span className="">nouveau jury</span>
        </button>
      </div>
      <h1 className="text-3xl font-semibold text-zinc-800">Membres du jury</h1>
      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="border-b-2 border-zinc-600">
            <tr>
              <th className="p-3 text-left text-zinc-700">Membre</th>
              <th className="p-3 text-left text-zinc-700">Contact</th>
              <th className="p-3 text-left text-zinc-700">Pays</th>
              <th className="p-3 text-left text-zinc-700">Edition</th>
              <th className="p-3 text-left text-zinc-700">Status</th>
              <th className="p-3 text-center text-zinc-700">Evaluations</th>
              <th className="p-3 text-center text-zinc-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {juries.map((j) => (
              <tr key={j.user_id}>
                <td className="p-3 text-left text-zinc-700">{j.membre}</td>
                <td className="p-3 text-left text-zinc-700">{j.contact}</td>
                <td className="p-3 text-left text-zinc-700">{j.pays}</td>
                <td className="p-3 text-left text-zinc-700">{j.edition_id}</td>
                <td className={`p-3 text-left text-white`}>
                  <span
                    className={`py-2 px-4 rounded-full ${
                      j.statut === "actif" ? "bg-green-400" : "bg-red-500"
                    }`}
                  >
                    {j.statut}
                  </span>
                </td>
                <td className="p-3 text-center text-zinc-700">{j.evaluations} <FontAwesomeIcon icon={faEye} className="ml-2 cursor-pointer"/></td>
                <td className="p-3 text-zinc-800 text-2xl flex justify-center gap-4">
                  <button
                    className="cursor-pointer"
                    onClick={() => {
                      setJuryModalOpen(true);
                      setJuryModalMode("edit");
                      setSelectedJury(j);
                    }}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button
                    className="cursor-pointer"
                    onClick={() => {
                      setDeleteModalOpen(true);
                      setJury(j);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                  <button className="cursor-pointer" onClick={() => handleAction(j.statut, j.jury_id)}>
                    <FontAwesomeIcon icon={j.statut === "actif" ? faUserMinus : faUserCheck} className={`${j.statut === "actif" ? "text-red-500" : "text-green-500"}`}/>
                  </button>
                </td>
              </tr>
            ))}
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
