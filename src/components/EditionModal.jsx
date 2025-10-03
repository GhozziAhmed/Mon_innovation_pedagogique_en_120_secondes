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

  const isFormValid = () => {
    return form.annee && form.theme && form.date_debut && form.date_fin && form.lieu;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-xl bg-white p-8 shadow-2xl transform scale-95 md:scale-100 transition-transform duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-800 transition-colors"
        >
          <FontAwesomeIcon icon={faXmark} className="text-2xl" />
        </button>
        <h2 className="text-3xl font-extrabold text-zinc-800 mb-2">
          {mode === "add" ? "Créer une nouvelle édition" : "Modifier l'édition"}
        </h2>
        <p className="text-zinc-500 mb-6">
          Veuillez remplir les informations pour {mode === "add" ? "créer une nouvelle édition" : "mettre à jour cette édition"}.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="annee" className="font-semibold text-zinc-700 mb-1">
              Année
            </label>
            <input
              id="annee"
              type="text"
              className="w-full rounded-lg border border-zinc-300 px-4 py-2 bg-zinc-50 text-zinc-800 transition-colors focus:border-[#004C91] focus:outline-none focus:ring-1 focus:ring-[#004C91]"
              value={form.annee}
              onChange={(e) => setForm({ ...form, annee: e.target.value })}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="theme" className="font-semibold text-zinc-700 mb-1">
              Thème
            </label>
            <input
              id="theme"
              type="text"
              className="w-full rounded-lg border border-zinc-300 px-4 py-2 bg-zinc-50 text-zinc-800 transition-colors focus:border-[#004C91] focus:outline-none focus:ring-1 focus:ring-[#004C91]"
              value={form.theme}
              onChange={(e) => setForm({ ...form, theme: e.target.value })}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="date_debut" className="font-semibold text-zinc-700 mb-1">
              Date de début
            </label>
            <input
              id="date_debut"
              type="date"
              className="w-full rounded-lg border border-zinc-300 px-4 py-2 bg-zinc-50 text-zinc-800 transition-colors focus:border-[#004C91] focus:outline-none focus:ring-1 focus:ring-[#004C91]"
              value={form.date_debut}
              onChange={(e) => setForm({ ...form, date_debut: e.target.value })}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="date_fin" className="font-semibold text-zinc-700 mb-1">
              Date de fin
            </label>
            <input
              id="date_fin"
              type="date"
              className="w-full rounded-lg border border-zinc-300 px-4 py-2 bg-zinc-50 text-zinc-800 transition-colors focus:border-[#004C91] focus:outline-none focus:ring-1 focus:ring-[#004C91]"
              value={form.date_fin}
              onChange={(e) => setForm({ ...form, date_fin: e.target.value })}
            />
          </div>
          <div className="flex flex-col col-span-1 md:col-span-2">
            <label htmlFor="lieu" className="font-semibold text-zinc-700 mb-1">
              Lieu de la finale
            </label>
            <input
              id="lieu"
              type="text"
              className="w-full rounded-lg border border-zinc-300 px-4 py-2 bg-zinc-50 text-zinc-800 transition-colors focus:border-[#004C91] focus:outline-none focus:ring-1 focus:ring-[#004C91]"
              value={form.lieu}
              onChange={(e) => setForm({ ...form, lieu: e.target.value })}
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-zinc-300 bg-white px-6 py-2.5 font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
            type="button"
          >
            Annuler
          </button>
          <button
            className={`rounded-lg px-6 py-2.5 font-bold text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
              ${mode === "add" ? "bg-green-600 hover:bg-green-700" : "bg-[#004C91] hover:bg-[#003B70]"}`}
            onClick={() => onSave(form)}
            disabled={loading || !isFormValid()}
            type="submit"
          >
            {loading ? (
              <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
            ) : mode === "add" ? (
              "Créer"
            ) : (
              "Sauvegarder"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditionModal;