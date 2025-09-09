import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import PartnerModal from "../../components/PartnerModal";
import { toast } from "react-toastify";
import DeleteArchiveModal from "../../components/DeleteArchiveModal";

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const fetchData = () => {
    axios
      .get("https://mon-innovation-pedagogique-en-120.onrender.com/api/partners")
      .then((res) => {
        console.log(res.data);
        setPartners(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const onSave = (form) => {
    setModalLoading(true);
    if (modalMode === "add") {
      axios
        .post("https://mon-innovation-pedagogique-en-120.onrender.com/api/partners", form, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res);
          fetchData();
          setModalLoading(false);
          setModalOpen(false);
          toast.success(res.data.message, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
        })
        .catch((err) => {
          setModalLoading(false);
          console.log(err);
          toast.error(err.response.data.error, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
        });
    } else {
      axios
        .put(
          `https://mon-innovation-pedagogique-en-120.onrender.com/api/partners/${selectedData.partenaire_id}`,
          form,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          fetchData();
          setModalLoading(false);
          setModalOpen(false);
          toast.success(res.data.message, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
        })
        .catch((err) => {
          setModalLoading(false);
          console.log(err);
          toast.error(err.response.data.error, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
        });
    }
  };
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [partnerId, setPartnerId] = useState(0);
  const handleDelete = () => {
    setModalLoading(true);
    axios
      .delete(
        `https://mon-innovation-pedagogique-en-120.onrender.com/api/partners/${partnerId}`,{
            headers : {
                Authorization : `Bearer ${localStorage.getItem("token")}`,
            }
        }
      )
      .then((res) => {
        setDeleteModalOpen(false);
        setModalLoading(false);
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
        setModalLoading(false);
        toast.error(err.response.data.error, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
      });
  };
  return (
    <div className="px-4 md:px-6 lg:px-20 py-10">
      <div className="flex justify-between items-center mb-5">
        <div className="space-y-2">
          <h1 className="text-4xl text-zinc-800 font-semibold">
            Gestion Les Partenaires
          </h1>
          <p className="text-zinc-800">
            Ajouter, Modifier ou Supprimer un partenaire
          </p>
        </div>
        <button
          className="bg-[#004C91] rounded px-4 py-2 text-white text-2xl cursor-pointer flex items-center gap-2"
          onClick={() => {
            setModalOpen(true);
            setModalMode("add");
            setSelectedData(null);
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
          Ajouter
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse shadow">
          <thead>
            <tr className="border-b text-zinc-700">
              <th className="p-3 text-left">Nom</th>
              <th className="p-3 text-left">Logo</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((p) => (
              <tr key={p.partenaire_id} className="border-b border-zinc-400">
                <td className="p-3">{p.nom}</td>
                <td className="p-3">
                  <img src={p.logo} alt="" className="w-20" />
                </td>
                <td className="p-3">
                  <div className="flex gap-5">
                    <button
                      className="px-4 py-2 bg-[#004C91] text-white rounded cursor-pointer"
                      onClick={() => {
                        setModalOpen(true);
                        setModalMode("edit");
                        setSelectedData({ ...p, image: null });
                      }}
                    >
                      Modifier
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
                      onClick={() => {
                        setDeleteModalOpen(true);
                        setPartnerId(p.partenaire_id);
                      }}
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalOpen && (
        <PartnerModal
          mode={modalMode}
          onClose={() => setModalOpen(false)}
          onSave={onSave}
          data={selectedData}
          loading={modalLoading}
        />
      )}
      {deleteModalOpen && (
        <DeleteArchiveModal
          mode={"supprimez"}
          onClose={() => setDeleteModalOpen(false)}
          onSave={handleDelete}
          loading={modalLoading}
        />
      )}
    </div>
  );
};

export default Partners;
