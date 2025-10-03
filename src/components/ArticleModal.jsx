import { faImage, faTimes, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

const ArticleModal = ({ mode, onClose, onSave, data, loading }) => {
  const [form, setForm] = useState(
    data || {
      titre: "",
      description: "",
      contenu: "",
      image: null,
      image_url: null, // To handle existing image URLs in edit mode
    }
  );

  useEffect(() => {
    // If we're in edit mode and data has an existing image URL, store it.
    if (mode === "edit" && data && data.image_url) {
      setForm((prevForm) => ({ ...prevForm, image_url: data.image_url }));
    }
  }, [mode, data]);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ ...form, image: { file, preview: URL.createObjectURL(file) }, image_url: null }); // Clear existing URL when a new file is uploaded
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
    formData.append("contenu", form.contenu);

    if (form.image?.file) {
      formData.append("image", form.image.file);
    }
    
    if (mode === "edit") {
      formData.append("edition_id", form.edition_id);
      
      // If no new image is selected, but an old one exists, send the old path
      if (!form.image?.file && form.image_url) {
        formData.append("image_url", form.image_url);
      } else if (!form.image && !form.image_url && data.image_url) {
        // This is a flag to tell the backend to remove the image.
        formData.append("clear_image", "true");
      }
    }
    onSave(formData);
  };

  const currentImageSource = form.image?.preview || form.image_url;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 p-4 z-[2000]">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 w-full max-w-2xl max-h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-zinc-800">
            {mode === "add" ? "Ajouter un article" : "Modifier un article"}
          </h1>
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
            <input
              id="description"
              type="text"
              className="border border-zinc-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#004C91] transition-all"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="contenu" className="text-zinc-700 font-medium">Contenu</label>
            <textarea
              id="contenu"
              className="resize-none border border-zinc-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#004C91] h-36 transition-all"
              value={form.contenu}
              onChange={(e) => setForm({ ...form, contenu: e.target.value })}
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
                  className="absolute top-0 right-0 cursor-pointer bg-black/50 text-white rounded-full size-8 flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} className="text-sm" />
                </button>
              </div>
            )}
          </div>

          <div className="flex space-x-3 mt-4">
            <button
              type="submit"
              className={`py-3 rounded-lg cursor-pointer font-semibold text-white w-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                mode === "add" ? "bg-[#004C91] hover:bg-[#003B70]" : "bg-green-600 hover:bg-green-700"
              }`}
              disabled={loading}
            >
              {loading ? "Chargement..." : mode === "add" ? "Ajouter" : "Modifier"}
            </button>
            <button
              type="button"
              className="py-3 rounded-lg cursor-pointer font-semibold text-zinc-600 border border-zinc-300 w-full hover:bg-zinc-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={onClose}
              disabled={loading}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArticleModal;