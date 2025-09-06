import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center px-8 z-2000">
      <div className="bg-white py-5 px-10 rounded flex flex-col gap-5 items-stretch max-w-full">
        <div className="flex justify-end">
          <FontAwesomeIcon
            icon={faXmark}
            className="text-2xl text-zinc-600 cursor-pointer"
            onClick={onClose}
          />
        </div>
        <h1 className="text-2xl text-zinc-800 font-semibold">
          {mode === "add" ? "Créer une nouvelle édition" : "Modifier"}
        </h1>
        <div className="flex flex-col">
          <span className="">Année</span>
          <input
            type="text"
            className="border border-zinc-600 rounded focus:outline-none px-2 py-1"
            value={form.annee}
            onChange={(e) => setForm({ ...form, annee: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <span>Thème</span>
          <input
            type="text"
            className="border border-zinc-600 rounded focus:outline-none px-2 py-1"
            value={form.theme}
            onChange={(e) => setForm({ ...form, theme: e.target.value })}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col">
            <span>Date de début</span>
            <input
              type="text"
              className="border border-zinc-600 rounded focus:outline-none px-2 py-1"
              value={form.date_debut.substring(0,10)}
              onChange={(e) => setForm({ ...form, date_debut: e.target.value })}
            />
          </div>
          <div className="flex flex-col">
            <span>Date de fin</span>
            <input
              type="text"
              className="border border-zinc-600 rounded focus:outline-none px-2 py-1"
              value={form.date_fin.substring(0,10)}
              onChange={(e) => setForm({ ...form, date_fin: e.target.value })}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <span>Lieu de la finale</span>
          <input
            type="text"
            className="border border-zinc-600 rounded focus:outline-none px-2 py-1"
            value={form.lieu}
            onChange={(e) => setForm({ ...form, lieu: e.target.value })}
          />
        </div>
        <div className="flex justify-end space-x-5">
          <button
            className="flex-1 bg-[#5599FF] border-2 border-[#5599FF] text-white py-2 rounded cursor-pointer"
            onClick={() => {
                onSave(form)
            }}
          >
            {loading ? "Chargement" : mode === "add" ? "Créez" : "Sauvegardez"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditionModal;