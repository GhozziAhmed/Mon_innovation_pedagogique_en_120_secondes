import { faImage, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

const PartnerModal = ({ mode, onClose, onSave, data, loading }) => {
  const [form, setForm] = useState(
    data || {
      nom: "",
      type: "",
      contact: "",
      image: null, // For new file uploads (local preview)
      logo: null,  // For existing image URL (from server)
      site_web: "",
    }
  );

  const isValidForm = () => form.nom && form.type && (form.image || form.logo)

  // Correctly initialize `logo` for edit mode if `data.logo` exists
  useEffect(() => {
    if (mode === 'edit' && data && data.logo) {
      setForm(prevForm => ({ ...prevForm, logo: data.logo }));
    }
  }, [mode, data]);


  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ ...form, image: { file, preview: URL.createObjectURL(file) }, logo: null }); // Clear existing logo if new image is uploaded
    }
  };

  const removeImage = () => {
    // Clear both the new image preview/file and the existing logo URL
    setForm({ ...form, image: null, logo: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nom", form.nom);
    formData.append("type", form.type);
    formData.append("contact", form.contact);
    formData.append("site_web", form.site_web);
    
    // Append the file if a new image is selected
    if (form.image?.file) {
      formData.append("image", form.image.file);
    }
    
    // Handle edit mode specific logic
    if (mode === "edit") {
      formData.append("partenaire_id", form.partenaire_id);
      
      // Crucial: If no new image is selected AND the old logo was removed,
      // we need a way to tell the backend to clear the image.
      // If `logo` is explicitly null here, it means the user clicked 'remove'.
      if (form.image === null && form.logo === null && data.logo) {
          formData.append("clear_logo", "true"); // A flag for the backend
      } else if (form.logo) { // If there's an existing logo and it wasn't removed
          formData.append("logo", form.logo); // Send the existing logo path back
      }
    }
    
    onSave(formData);
  };

  const currentImageSource = form.image?.preview || form.logo; // Determine which image to display

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center px-4 md:px-8 z-[2000]">
      <div className="bg-white py-8 px-6 rounded-lg shadow-xl flex flex-col items-stretch w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl text-zinc-800 font-semibold">
            {mode === "add" ? "Ajouter un partenaire" : "Modifier un partenaire"}
          </h1>
          <button onClick={onClose} className="p-2 text-zinc-500 hover:text-zinc-800 transition-colors duration-200">
            <FontAwesomeIcon icon={faTimes} className="text-2xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1">
              <label htmlFor="nom" className="text-zinc-700 font-medium">Nom</label>
              <input
                id="nom"
                type="text"
                className="border border-zinc-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#004C91] transition-all"
                value={form.nom}
                onChange={(e) => setForm({ ...form, nom: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="type" className="text-zinc-700 font-medium">Type</label>
              <select
                id="type"
                className="border border-zinc-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#004C91] transition-all"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                required
              >
                <option value="" disabled>Sélectionner un type</option>
                <option value="sponsor">Sponsor</option>
                <option value="partenaire">Partenaire</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1">
              <label htmlFor="contact" className="text-zinc-700 font-medium">Contact</label>
              <input
                id="contact"
                type="text"
                className="border border-zinc-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#004C91] transition-all"
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="site_web" className="text-zinc-700 font-medium">Site Web</label>
              <input
                id="site_web"
                type="text"
                className="border border-zinc-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#004C91] transition-all"
                value={form.site_web}
                onChange={(e) => setForm({ ...form, site_web: e.target.value })}
              />
            </div>
          </div>
          
          <div className="flex flex-col space-y-1">
            <label className="text-zinc-700 font-medium">Ajouter une photo</label>
            {!currentImageSource ? ( // Check if there's any image to display
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
                  src={currentImageSource} // Use the determined image source
                  alt="preview"
                  className="w-full h-full object-contain"
                />
                <button
                  type="button"
                  onClick={removeImage} // This will now clear both form.image and form.logo
                  className="absolute top-0 right-0 bg-black/50 text-white cursor-pointer rounded-full size-8 flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} className="text-sm" />
                </button>
              </div>
            )}
          </div>

          <div className="flex space-x-3 mt-4">
            <button
              type="submit"
              className={`py-3 rounded-lg font-semibold text-white cursor-pointer w-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                mode === "add" ? "bg-[#004C91] hover:bg-[#003B70]" : "bg-green-600 hover:bg-green-700"
              }`}
              disabled={loading || !isValidForm()}
            >
              {loading ? "Chargement..." : mode === "add" ? "Ajouter" : "Modifier"}
            </button>
            <button
              type="button"
              className="py-3 rounded-lg font-semibold text-zinc-600 cursor-pointer border border-zinc-300 w-full hover:bg-zinc-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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

export default PartnerModal;