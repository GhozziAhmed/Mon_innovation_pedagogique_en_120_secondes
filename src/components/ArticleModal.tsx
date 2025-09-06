import { faImage, faTimes, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";


const ArticleModal = ({ mode, onClose, onSave, data, loading}) => {
    const [form, setForm] = useState(
        data || {
          titre: "",
          description: "",
          contenu: "",
          image: null,
        }
      );
      const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          setForm({ ...form, image: { file, preview: URL.createObjectURL(file) } });
        }
      };
    
      const removeImage = () => {
        setForm({ ...form, image: null });
      };
      const handleSubmit = (e) => {
        console.log(form.titre)
        console.log(form.description)
        console.log(form.contenu)
        e.preventDefault();
        const formData = new FormData();
        formData.append("titre", form.titre);
        formData.append("description", form.description);
        formData.append("contenu", form.contenu);
        if (form.image?.file) {
          formData.append("image", form.image.file);
        }
        if (mode == "edit") {
          formData.append("edition_id", form.edition_id);
          if (!form.image?.file && form.image_url) {
            // console.log(form.image_url)
            formData.append("image_url", form.image_url);
          }
        }
        onSave(formData);
      };
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50">
      <form action="" onSubmit={handleSubmit}>
        <div className="bg-white rounded p-5 flex flex-col items-stretch w-100 max-w-full">
          <h1 className="text-4xl text-zinc-800 mb-5">
            {mode === "add" ? "Ajoutez une photos" : "Modifiez photo"}
          </h1>
          <div className="flex flex-col mb-5">
            <span>Titre</span>
            <input
              type="text"
              className="border border-zinc-600 rounded py-1 px-2 focus:outline-none"
              value={form.titre}
              onChange={(e) => setForm({ ...form, titre: e.target.value })}
            />
          </div>
          <div className="flex flex-col mb-5">
            <span>Description</span>
            <input
              name=""
              id=""
              className="border border-zinc-600 rounded py-1 px-2 focus:outline-none resize-none h-10"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col mb-5">
            <span>Contenu</span>
            <textarea
              name=""
              id=""
              className="border border-zinc-600 rounded py-1 px-2 focus:outline-none resize-none h-30"
              value={form.contenu}
              onChange={(e) =>
                setForm({ ...form, contenu: e.target.value })
              }
            ></textarea>
          </div>
          {
            <div className="flex flex-col space-y-1 mb-5">
              <span>Ajoutez Une Photo</span>
              {!form.image ? (
                // Upload slot
                <label className="border border-dashed border-zinc-600 rounded flex flex-col items-center justify-center h-30 cursor-pointer hover:bg-zinc-50 transition">
                  <FontAwesomeIcon
                    icon={faImage}
                    className="text-3xl text-zinc-500"
                  />
                  <span className="text-sm text-zinc-500">Ajouter</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    className="hidden"
                  />
                </label>
              ) : (
                // Preview image
                <div className="relative w-full h-30 rounded overflow-hidden">
                  <img
                    src={form.image.preview}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-1 right-1 bg-black/50 text-white rounded-full size-7 cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faTimes} className="text-sm" />
                  </button>
                </div>
              )}
            </div>
          }
          <div className="flex space-x-2">
          <button
            className={`py-2 rounded text-white w-1/2 cursor-pointer ${
              loading
                ? "bg-zinc-500"
                : mode === "add"
                ? "bg-[#004C91]"
                : "bg-green-600"
            }`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Chargement..." : mode === "add" ? "Ajouter" : "Modifier"}
          </button>
          <button
            className="py-2 border border-zinc-600 rounded text-zinc-600 w-1/2 cursor-pointer"
            onClick={onClose}
          >
            Annuler
          </button>
        </div>
        </div>
      </form>
    </div>
  )
}

export default ArticleModal