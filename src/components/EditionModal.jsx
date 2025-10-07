import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const EditionModal = ({ onClose, mode, data, onSave, loading }) => {
  const [form, setForm] = useState(
    data || {
      annee: "",
      theme: "",
      date_debut: "",
      date_fin: "",
      lieu: "",
    }
  );

  // Simplified form validation check
  const isFormValid = () => {
    return form.annee && form.theme && form.date_debut && form.date_fin && form.lieu;
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  return (
    // Simplified backdrop and modal container style (based on JuryModal)
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50 p-4">
      <div className="bg-white rounded p-5 flex flex-col gap-5 max-w-full md:max-w-xl w-full relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-800 transition-colors"
        >
          <FontAwesomeIcon icon={faXmark} className="text-2xl" />
        </button>
        
        {/* Title and Description */}
        <h1 className="text-3xl text-zinc-800 font-semibold">
          {mode === "add" ? "Créer une nouvelle édition" : "Modifier l'édition"}
        </h1>
        <p className="text-zinc-500 mb-2">
          Veuillez remplir les informations pour {mode === "add" ? "créer une nouvelle édition" : "mettre à jour cette édition"}.
        </p>

        {/* Form Fields - Simplified and aligned with JuryModal styles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Année */}
          <div className="flex flex-col space-y-1">
            <span>Année</span>
            <input
              id="annee"
              type="text"
              className="border border-zinc-600 rounded-lg py-1 px-2 focus:outline-none focus:ring-2 focus:focus:ring-[#004C91]"
              value={form.annee}
              onChange={handleInputChange}
            />
          </div>
          {/* Thème */}
          <div className="flex flex-col space-y-1">
            <span>Thème</span>
            <input
              id="theme"
              type="text"
              className="border border-zinc-600 rounded-lg py-1 px-2 focus:outline-none focus:ring-2 focus:focus:ring-[#004C91]"
              value={form.theme}
              onChange={handleInputChange}
            />
          </div>
          {/* Date de début */}
          <div className="flex flex-col space-y-1">
            <span>Date de début</span>
            <input
              id="date_debut"
              type="date"
              className="border border-zinc-600 rounded-lg py-1 px-2 focus:outline-none focus:ring-2 focus:focus:ring-[#004C91]"
              value={form.date_debut}
              onChange={handleInputChange}
            />
          </div>
          {/* Date de fin */}
          <div className="flex flex-col space-y-1">
            <span>Date de fin</span>
            <input
              id="date_fin"
              type="date"
              className="border border-zinc-600 rounded-lg py-1 px-2 focus:outline-none focus:ring-2 focus:focus:ring-[#004C91]"
              value={form.date_fin}
              onChange={handleInputChange}
            />
          </div>
          {/* Lieu de la finale (Full Width) */}
          <div className="flex flex-col space-y-1 md:col-span-2">
            <span>Lieu de la finale</span>
            <input
              id="lieu"
              type="text"
              className="border border-zinc-600 rounded-lg py-1 px-2 focus:outline-none focus:ring-2 focus:focus:ring-[#004C91]"
              value={form.lieu}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Action Buttons - Aligned with JuryModal styles */}
        <div className="mt-2 flex space-x-5 text-lg">
          {/* Save/Create Button */}
          <button
            onClick={() => onSave(form)}
            disabled={loading || !isFormValid()}
            className={`w-1/2 border text-white rounded-lg py-2 cursor-pointer disabled:opacity-50 disabled:cursor-default hover:opacity-90 transition-opacity ${
              mode === "add" ? "border-[#004C91] bg-[#004C91]" : "border-green-500 bg-green-500" // Swapped colors to match JuryModal convention
            }`}
            type="submit"
          >
            {loading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                Chargement...
              </>
            ) : mode === "add" ? (
              "Créer"
            ) : (
              "Sauvegarder"
            )}
          </button>
          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="w-1/2 border border-zinc-500 text-zinc-500 hover:bg-zinc-200 rounded-lg py-2 cursor-pointer disabled:opacity-50 disabled:cursor-default transition-colors"
            disabled={loading}
            type="button"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditionModal;