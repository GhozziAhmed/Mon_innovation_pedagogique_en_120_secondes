const DeleteArchiveModal = ({ mode, onSave, onClose, loading }) => {
  const isDeleteMode = mode === "supprimez";
  const title = isDeleteMode
    ? "Confirmer la suppression"
    : "Confirmer l'archivage";
  const primaryButtonText = isDeleteMode ? "Supprimer" : "Archiver";
  const loadingButtonText = isDeleteMode ? "Suppression..." : "Archivage...";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100">
        <div className="flex flex-col items-center text-center">
          {isDeleteMode && (
            <div className="bg-red-100 rounded-full p-3 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856a2 2 0 001.938-2.67l-6.928-11.854a2 2 0 00-3.876 0L4.312 16.33A2 2 0 006.25 19z"
                />
              </svg>
            </div>
          )}
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-2">
            {title}
          </h2>
          <p className="text-zinc-500 mb-6">
            Êtes-vous sûr de vouloir{" "}
            {isDeleteMode ? "supprimer cet élément" : "archiver cet élément"}?
            Cette action est irréversible.
          </p>
        </div>

        <div className="w-full flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
          <button
            className={`w-full md:w-1/2 rounded-lg py-3 font-semibold text-white cursor-pointer ${
              isDeleteMode
                ? "bg-red-600 hover:bg-red-700"
                : "bg-yellow-500 hover:bg-yellow-600"
            } disabled:bg-zinc-400 disabled:cursor-not-allowed transition-colors duration-200`}
            onClick={onSave}
            disabled={loading}
          >
            {loading ? loadingButtonText : primaryButtonText}
          </button>
          <button
            className="w-full md:w-1/2 rounded-lg py-3 font-semibold text-zinc-600 cursor-pointer border border-zinc-300 hover:bg-zinc-100 transition-colors duration-200"
            onClick={onClose}
            disabled={loading}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteArchiveModal;
