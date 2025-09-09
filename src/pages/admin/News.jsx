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
    axios.get("https://mon-innovation-pedagogique-en-120.onrender.com/api/news").then((res) => {
      console.log(res.data);
      setNews(res.data);
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
    console.log(form);
    if (modalMode === "add") {
      axios
        .post("https://mon-innovation-pedagogique-en-120.onrender.com/api/news", form, {
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
          console.log(err);
          setModalLoading(false);
          toast.error(err.response.data.error, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
        });
    } else {
      axios
        .put(`https://mon-innovation-pedagogique-en-120.onrender.com/api/news/${selectedData.news_id}`, form, {
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
          console.log(err);
          setModalLoading(false);
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
    setModalLoading(true);
    axios
      .delete(`https://mon-innovation-pedagogique-en-120.onrender.com/api/news/${articleId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setModalLoading(false);
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
        setModalLoading(false);
        setDeleteModalOpen(false);
        fetchData();
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
            Gestion Les Actualités
          </h1>
          <p className="text-zinc-800">
            Ajouter, Modifier ou Supprimer une actualités
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
              <th className="p-3 text-left">Titre</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {news &&
              news.map((n) => (
                <tr key={n.news_id} className="border-b border-zinc-300">
                  <td className="p-3">{n.titre}</td>
                  <td className="p-3">
                    <img src={n.image_url} alt="" className="w-30" />
                  </td>
                  <td className="p-3">
                    <div className="flex gap-5">
                      <button
                        className="rounded py-2 px-4 text-white bg-[#004C91] cursor-pointer"
                        onClick={() => {
                          setModalOpen(true);
                          setModalMode("edit");
                          setSelectedData({ ...n, image: null });
                        }}
                      >
                        Modifier
                      </button>
                      <button className="rounded py-2 px-4 text-white bg-red-500 cursor-pointer" onClick={() => {
                        setDeleteModalOpen(true);
                        setArticleId(n.news_id)
                      }}>
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
        <ArticleModal
          mode={modalMode}
          onClose={() => setModalOpen(false)}
          onSave={onSave}
          data={selectedData}
          loading={modalLoading}
        />
      )}
      {
        deleteModalOpen && <DeleteArchiveModal mode={"supprimez"} onClose={() => setDeleteModalOpen(false)} onSave={handleDelete} loading={modalLoading}/>
      }
    </div>
  );
};

export default News;
