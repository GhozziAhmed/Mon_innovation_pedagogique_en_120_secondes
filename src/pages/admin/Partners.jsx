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
      .get("http://localhost:5000/api/partners")
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
        .post("http://localhost:5000/api/partners", form, {
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
            closeButton: true,
          });
        })
        .catch((err) => {
          setModalLoading(false);
          console.log(err);
          toast.error(err.response?.data?.error || "Une erreur est survenue.", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: true,
          });
        });
    } else {
      axios
        .put(
          `http://localhost:5000/api/partners/${selectedData.partenaire_id}`,
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
            closeButton: true,
          });
        })
        .catch((err) => {
          setModalLoading(false);
          console.log(err);
          toast.error(err.response?.data?.error || "Une erreur est survenue.", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: true,
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
        `http://localhost:5000/api/partners/${partnerId}`,{
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
          closeButton: true,
        });
      })
      .catch((err) => {
        console.log(err);
        setModalLoading(false);
        toast.error(err.response?.data?.error || "Une erreur est survenue.", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: true,
        });
      });
  };
  
  return (
    <div className="p-4 md:p-8 lg:p-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8 gap-4 md:gap-0">
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl text-zinc-800 font-semibold">
            Gestion des Partenaires
          </h1>
          <p className="text-zinc-600">
            Ajouter, modifier ou supprimer un partenaire
          </p>
        </div>
        <button
          className="bg-[#004C91] rounded-lg px-6 py-2.5 text-white font-semibold transition-colors hover:bg-[#003B70] flex items-center gap-2"
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
      
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full">
          <thead>
            <tr className="bg-zinc-100 border-b border-zinc-200 text-zinc-700">
              <th className="p-4 text-left font-semibold">Nom</th>
              <th className="p-4 text-left font-semibold">Logo</th>
              <th className="p-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {partners.length > 0 ? (
              partners.map((p) => (
                <tr
                  key={p.partenaire_id}
                  className="border-b border-zinc-200 last:border-0 hover:bg-zinc-50 transition-colors"
                >
                  <td className="p-4 text-zinc-700 font-medium">{p.nom}</td>
                  <td className="p-4">
                    <img
                      src={p.logo}
                      alt={p.nom}
                      className="w-24 h-16 object-contain rounded-md p-1 bg-white"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        className="rounded-lg py-2 px-4 text-white cursor-pointer bg-[#004C91] font-medium transition-colors hover:bg-[#003B70]"
                        onClick={() => {
                          setModalOpen(true);
                          setModalMode("edit");
                          // Note: Assuming 'logo' is not needed in the initial form, similar to 'image' in the News component
                          setSelectedData({ ...p, logo: null }); 
                        }}
                      >
                        Modifier
                      </button>
                      <button
                        className="rounded-lg py-2 px-4 text-white cursor-pointer bg-red-600 font-medium transition-colors hover:bg-red-700"
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
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-4 text-center text-zinc-500">
                  Aucun partenaire trouvé.
                </td>
              </tr>
            )}
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