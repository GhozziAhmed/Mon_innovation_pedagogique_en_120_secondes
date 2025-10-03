import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ImageModal from "../../components/ImageModal";
import { toast } from "react-toastify";
import DeleteArchiveModal from "../../components/DeleteArchiveModal";

const EditionGallery = () => {
  const fetchData = async () => {
    const [photos, annee] = await Promise.all([
      axios.get(`https://mon-innovation-pedagogique-en-120.onrender.com/api/gallery/${id}`),
      axios.get(`https://mon-innovation-pedagogique-en-120.onrender.com/api/editions/${id}`),
    ]);
    setPhotos(photos.data);
    setAnnee(annee.data.annee);
  };
  const [photos, setPhotos] = useState([]);
  const [annee, setAnnee] = useState(0);
  const { id } = useParams();
  useEffect(() => {
    fetchData();
  }, []);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSave = (formData) => {
    setLoading(true);
    if (modalMode === "add") {
      axios
        .post("https://mon-innovation-pedagogique-en-120.onrender.com/api/gallery/add", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setModalOpen(false);
          fetchData();
          toast.success("image added successfully !", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
        })
        .catch((err) => {
          console.log(err);
          setModalOpen(false);
          toast.error(err.response.data.error, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
        });
    } else {
      axios
        .put("https://mon-innovation-pedagogique-en-120.onrender.com/api/gallery/edit", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setModalOpen(false);
          fetchData();
          toast.success("Image mise a jour avec succées", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
        })
        .catch((err) => {
          console.log(err);
          setModalOpen(false);
          toast.error(err.response.data.error, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
        });
    }
  };
  const handleDelete = (image_id) => {
    setLoading(true);
    axios
      .delete(`https://mon-innovation-pedagogique-en-120.onrender.com/api/gallery/delete/${image_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        fetchData();
        setLoading(false);
        setActionOpen(false);
        toast.success(res.data.message, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [actionOpen, setActionOpen] = useState(false);
  const [imageId, setImageId] = useState(0);
  return (
    <div className="px-4 md:px-6 lg:px-20 py-10">
      <div>
        <Link
          to="/admin/gallerie"
          className="flex items-center gap-3 bg-zinc-200 rounded py-2 px-5 w-fit mb-10"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Retour</span>
        </Link>
      </div>
      <div className="flex flex-col space-y-5 sm:flex-row justify-between items-center">
        <div className="space-y-3 text-center sm:text-left">
          <h1 className="text-4xl text-zinc-800 font-semibold">
            Edition {annee}
          </h1>
          <p className="text-zinc-800">
            Ajoutez, Supprimez ou Modifiez la gallerie de cette edition
          </p>
        </div>
        <button
          className="bg-[#004C91] rounded py-2 px-4 text-white text-xl cursor-pointer"
          onClick={() => {
            setModalOpen(true);
            setModalMode("add");
            setSelected(null);
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
          Ajoutez
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
        {photos &&
          photos.map((p) => (
            <div
              key={p.image_id}
              className="bg-zinc-100 rounded overflow-hidden border border-zinc-200 shadow"
            >
              <div className="h-40">
                <img
                  src={p.image_url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 flex justify-center">
                <div className="flex space-x-2 w-full">
                  <button
                    className="py-1 px-3 border rounded text-white bg-[#004C91] cursor-pointer w-1/2"
                    onClick={() => {
                      setModalOpen(true);
                      setModalMode("edit");
                      setSelected({ ...p, image: null });
                    }}
                  >
                    Modifiez
                  </button>
                  <button
                    className="py-1 px-3 border rounded text-white bg-red-500 cursor-pointer w-1/2"
                    onClick={() => {
                      setActionOpen(true);
                      setImageId(p.image_id);
                    }}
                  >
                    Supprimez
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      {modalOpen && (
        <ImageModal
          mode={modalMode}
          onSave={handleSave}
          data={selected}
          onClose={() => setModalOpen(false)}
          loading={loading}
        />
      )}
      {actionOpen && (
        <DeleteArchiveModal
          mode={"supprimez"}
          onSave={() => handleDelete(imageId)}
          onClose={() => setActionOpen(false)}
          loading={loading}
        />
      )}
    </div>
  );
};

export default EditionGallery;
