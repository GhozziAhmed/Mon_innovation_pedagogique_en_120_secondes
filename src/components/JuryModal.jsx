import { useState } from "react";

const JuryModal = ({ mode, onClose, data, onSave, loading }) => {
  const [form, setForm] = useState(
    data
      ? {
          ...data,
          nom: data.membre.split(" ")[0],
          prenom: data.membre.split(" ")[1],
        }
      : {
          nom: "",
          prenom: "",
          contact: "",
          mot_de_passe: "",
          edition_id: "",
          pays: "",
        }
  );
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50">
      <div className="bg-white rounded p-5 flex flex-col gap-5 max-w-full items-stretch">
        <h1 className="text-3xl text-zinc-800 font-semibold">
          {mode === "add" ? "Ajoutez un jury" : "Modifiez"}
        </h1>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col space-y-1">
            <span>Nom</span>
            <input
              type="text"
              value={form.nom}
              onChange={(e) => setForm({ ...form, nom: e.target.value })}
              className="border border-zinc-600 rounded-lg py-1 px-2 focus:outline-none focus:ring-2 focus:ring-[#004C91]"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <span>Prenom</span>
            <input
              type="text"
              value={form.prenom}
              onChange={(e) => setForm({ ...form, prenom: e.target.value })}
              className="border border-zinc-600 rounded-lg py-1 px-2 focus:outline-none focus:ring-2 focus:ring-[#004C91]"
            />
          </div>
        </div>
        {mode === "add" && (
            <>
          <div className="flex flex-col space-y-1">
            <span>Pays</span>
            <input
              type="text"
              value={form.pays}
              onChange={(e) => setForm({ ...form, pays: e.target.value })}
              className="border border-zinc-600 rounded-lg py-1 px-2 focus:outline-none focus:ring-2 focus:ring-[#004C91]"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <span>Mot de Passe</span>
            <input
              type="password"
              value={form.mot_de_passe}
              onChange={(e) => setForm({ ...form, mot_de_passe: e.target.value })}
              className="border border-zinc-600 rounded-lg py-1 px-2 focus:outline-none focus:ring-2 focus:ring-[#004C91]"
            />
          </div>
            </>
        )}
        <div className="flex flex-col space-y-1">
          <span>Contact</span>
          <input
            type="text"
            className="border border-zinc-600 rounded-lg py-1 px-2 focus:outline-none focus:ring-2 focus:ring-[#004C91]"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <span>Edition</span>
          <input
            type="text"
            className="border border-zinc-600 rounded-lg py-1 px-2 focus:outline-none focus:ring-2 focus:ring-[#004C91]"
            value={form.edition_id}
            onChange={(e) => setForm({ ...form, edition_id: e.target.value })}
          />
        </div>
        <div className="flex space-x-5 text-xl">
          <button onClick={() => onSave(form)} disabled={loading} className={`w-1/2 border text-white rounded-lg py-2 cursor-pointer disabled:opacity-50 disabled:cursor-default hover:opacity-90 ${mode === "edit" ? "border-green-500 bg-green-500" : "border-[#004C91] bg-[#004C91]"}`} type="submit">
            {loading
              ? "Chargement..."
              : mode === "add"
              ? "Ajouter"
              : "Sauvegarder"}
          </button>
          <button onClick={onClose} className="w-1/2 border border-zinc-500 text-zinc-500 hover:bg-zinc-200 rounded-lg py-2 cursor-pointer disabled:opacity-50 disabled:cursor-default" disabled={loading} type="button">Annuler</button>
        </div>
      </div>
    </div>
  );
};

export default JuryModal;
