const DeleteArchiveModal = ({ mode, onSave, onClose, loading }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-5 rounded">
        <div className="mb-5">
          <h1 className="text-3xl font-semibold text-zinc-800">
            Confirmer {mode === "supprimez" ? "la suppression" : "l'archivage"}
          </h1>
        </div>
        <div className="w-full flex justify-center">
          <div className="space-x-3">
            <button
              className={`capitalize rounded py-2 px-4 text-white ${
                loading ? "bg-zinc-500" : mode === "supprimez" ? "bg-red-500" : "bg-yellow-400"
              } ${loading ? "cursor-default" : "cursor-pointer"}`}
              onClick={onSave}
              disabled={loading}
            >
              {!loading ? mode : mode === "supprimez" ? "suppression..." : "archivage..."}
            </button>
            <button className="capitalize rounded py-2 px-4 text-zinc-600 border border-zinc-600 cursor-pointer" onClick={onClose}>annuler</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteArchiveModal;
