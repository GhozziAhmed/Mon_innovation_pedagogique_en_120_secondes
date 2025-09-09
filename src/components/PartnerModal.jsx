import { faImage, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const PartnerModal = ({ mode, onClose, onSave, data, loading }) => {
  const [form, setForm] = useState(
    data || {
      nom: "",
      type: "",
      contact: "",
      image: null,
      site_web: "",
    }
  );
  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ ...form, image: { file, preview: URL.createObjectURL(file) } });
    }
  };

  const removeImage = () => {
    setForm({ ...form, image: null });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nom", form.nom);
    formData.append("type", form.type);
    formData.append("contact", form.contact);
    formData.append("site_web", form.site_web);
    if (form.image?.file) {
      formData.append("image", form.image.file);
    }
    if (mode == "edit") {
      formData.append("partenaire_id", form.partenaire_id);
      if (!form.image?.file && form.logo) {
        // console.log(form.image_url)
        formData.append("logo", form.logo);
      }
    }
    onSave(formData);
  };
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center px-8 z-2000">
      <div className="bg-white py-5 px-5 rounded flex flex-col gap-5 items-stretch w-100 max-w-full">
        <h1 className="text-3xl text-zinc-800 text-center">
          {mode === "add" ? "Ajouter" : "Modifier"}
        </h1>
        <div className="flex flex-col space-y-1">
          <span>Nom</span>
          <input
            type="text"
            className="border border-zinc-500 rounded py-1 px-2 focus:outline-none"
            value={form.nom}
            onChange={(e) => setForm({ ...form, nom: e.target.value })}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <span>Type</span>
          <select
            name=""
            id=""
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            required
          >
            <option value="">Type</option>
            <option value="sponsor">Sponsor</option>
            <option value="partenaire">Partenaire</option>
          </select>
        </div>
        <div className="flex flex-col space-y-1">
          <span>Contact</span>
          <input
            type="text"
            className="border border-zinc-500 rounded py-1 px-2 focus:outline-none"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <span>Site Web</span>
          <input
            type="text"
            className="border border-zinc-500 rounded py-1 px-2 focus:outline-none"
            value={form.site_web}
            onChange={(e) => setForm({ ...form, site_web: e.target.value })}
          />
        </div>
        {
          <div className="flex flex-col space-y-1">
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
    </div>
  );
};

export default PartnerModal;
