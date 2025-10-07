import {
  faImage,
  faTimes,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ImageModal = ({ onClose, mode, data, onSave, loading }) => {
  const { id } = useParams();
  const [form, setForm] = useState(
    data || { titre: "", description: "", image: null, image_url: null, edition_id: id }
  );

  const isValidForm = () => form.titre && form.description && (form.image || form.image_url);

  useEffect(() => {
    // If we're in edit mode and data has an existing image URL, store it.
    if (mode === "edit" && data?.image_url) {
      setForm((prevForm) => ({ ...prevForm, image_url: data.image_url }));
    }
  }, [mode, data]);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ ...form, image: { file, preview: URL.createObjectURL(file) }, image_url: null });
    }
  };

  const removeImage = () => {
    setForm({ ...form, image: null, image_url: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titre", form.titre);
    formData.append("description", form.description);
    formData.append("edition_id", form.edition_id);
    
    if (form.image?.file) {
      formData.append("image", form.image.file);
    }

    if (mode === "edit") {
      formData.append("image_id", form.image_id);
      
      if (!form.image?.file && form.image_url) {
        formData.append("image_url", form.image_url);
      } else if (!form.image && !form.image_url && data.image_url) {
        formData.append("clear_image", "true");
      }
    }
    onSave(formData);
  };

  const currentImageSource = form.image?.preview || form.image_url;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 p-4 z-[2000]">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-zinc-800">
            {mode === "add" ? "Ajouter une photo" : "Modifier la photo"}
          </h1>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-zinc-500 hover:text-zinc-800 transition-colors duration-200 cursor-pointer"
          >
            <FontAwesomeIcon icon={faXmark} className="text-2xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col space-y-1">
            <label htmlFor="titre" className="text-zinc-700 font-medium">Titre</label>
            <input
              id="titre"
              type="text"
              className="border border-zinc-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#004C91] transition-all"
              value={form.titre}
              onChange={(e) => setForm({ ...form, titre: e.target.value })}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="description" className="text-zinc-700 font-medium">Description</label>
            <textarea
              id="description"
              className="border border-zinc-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#004C91] resize-y h-30 transition-all"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            ></textarea>
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-zinc-700 font-medium">Ajouter une photo</label>
            {!currentImageSource ? (
              <label className="border-2 border-dashed border-zinc-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-50 transition-colors duration-200">
                <FontAwesomeIcon icon={faImage} className="text-4xl text-zinc-400 mb-2" />
                <span className="text-zinc-500">Glisser-déposer ou cliquer pour ajouter</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative w-full h-40 rounded-lg overflow-hidden">
                <img
                  src={currentImageSource}
                  alt="preview"
                  className="w-full h-full object-contain"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-0 right-0 bg-black/50 text-white cursor-pointer rounded-full size-8 flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} className="text-sm" />
                </button>
              </div>
            )}
          </div>
          <button 
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold text-white transition-colors duration-200 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed ${
              mode === "add" ? "bg-[#004C91] hover:bg-[#003B70]" : "bg-green-600 hover:bg-green-700"
            }`} 
            disabled={loading || !isValidForm()}
          >
            {loading ? "Chargement..." : mode === "add" ? "Ajouter" : "Sauvegarder"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ImageModal;