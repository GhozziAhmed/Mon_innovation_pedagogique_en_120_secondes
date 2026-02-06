import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import ArticleModal from "../../components/ArticleModal";
import { toast } from "react-toastify";
import DeleteArchiveModal from "../../components/DeleteArchiveModal";

const News = () => {
  const [news, setNews] = useState([]);
  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/news")
      .then((res) => {
        setNews(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [modalLoading, setModalLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [articleId, setArticleId] = useState(0);

  const onSave = (form) => {
    setModalLoading(true);
    if (modalMode === "add") {
      axios
        .post("http://localhost:5000/api/news", form, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
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
          toast.error(err.response?.data?.error || "Une erreur est survenue.", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: true,
          });
        });
    } else {
      axios
        .put(`http://localhost:5000/api/news/${selectedData.news_id}`, form, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
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
          toast.error(err.response?.data?.error || "Une erreur est survenue.", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: true,
          });
        });
    }
  };

  const handleDelete = () => {
    setModalLoading(true);
    axios
      .delete(`http://localhost:5000/api/news/${articleId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setModalLoading(false);
        setDeleteModalOpen(false);
        fetchData();
        toast.success(res.data.message, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: true,
        });
      })
      .catch((err) => {
        setModalLoading(false);
        setDeleteModalOpen(false);
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
            Gestion des Actualités
          </h1>
          <p className="text-zinc-600">
            Ajouter, modifier ou supprimer une actualité
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
              <th className="p-4 text-left font-semibold">Titre</th>
              <th className="p-4 text-left font-semibold">Image</th>
              <th className="p-4 font-semibold text-center md:text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {news.length > 0 ? (
              news.map((n) => (
                <tr
                  key={n.news_id}
                  className="border-b border-zinc-200 last:border-0 hover:bg-zinc-50 transition-colors"
                >
                  <td className="p-4 text-zinc-700 font-medium">{n.titre}</td>
                  <td className="p-4">
                    <img
                      src={n.image_url}
                      alt={n.titre}
                      className="w-24 h-16 object-cover rounded-md shadow"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        className="rounded-lg py-2 px-4 text-white cursor-pointer bg-[#004C91] font-medium transition-colors hover:bg-[#003B70]"
                        onClick={() => {
                          setModalOpen(true);
                          setModalMode("edit");
                          setSelectedData({ ...n, image: null });
                        }}
                      >
                        Modifier
                      </button>
                      <button
                        className="rounded-lg py-2 px-4 text-white cursor-pointer bg-red-600 font-medium transition-colors hover:bg-red-700"
                        onClick={() => {
                          setDeleteModalOpen(true);
                          setArticleId(n.news_id);
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
                  Aucune actualité trouvée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <ArticleModal
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

export default News;
