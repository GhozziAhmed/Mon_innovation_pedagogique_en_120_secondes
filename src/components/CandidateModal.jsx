import DynamicVideoPlayer from "./DynamicVideoPlayer ";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const CandidateModal = ({
  data,
  onClose,
  onSave,
  preLoading,
  rejectLoading,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900">
            Candidature de {data.nom} {data.prenom}
          </h1>
        </div>

        <div className="flex flex-col gap-4 mb-6">
          <div className="text-zinc-700">
            <span className="font-semibold text-zinc-900">Etablissement: </span>
            <span>{data.etablissement}</span>
          </div>
          <div className="text-zinc-700">
            <span className="font-semibold text-zinc-900">Titre: </span>
            <span>{data.titre}</span>
          </div>
          <div className="text-zinc-700">
            <span className="font-semibold text-zinc-900">Description:</span>
            <p className="mt-1 font-normal leading-relaxed">{data.description}</p>
          </div>
        </div>

        <div className="mb-6">
          <DynamicVideoPlayer url={data.fichier_lien} />
        </div>

        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
          {data.statut !== "rejete" && (
            <button
              className="w-full sm:w-auto px-6 py-3 rounded-lg text-white cursor-pointer font-semibold transition-colors bg-red-600 hover:bg-red-700 disabled:bg-zinc-400 disabled:cursor-not-allowed"
              disabled={rejectLoading}
              onClick={() => onSave(data.candidature_id, "rejete")}
            >
              {rejectLoading ? "Chargement..." : "Rejeter"}
            </button>
          )}

          {data.statut !== "preselectionnee" && (
            <button
              className="w-full sm:w-auto px-6 py-3 rounded-lg text-white cursor-pointer font-semibold transition-colors bg-[#004C91] hover:bg-[#003B70] disabled:bg-zinc-400 disabled:cursor-not-allowed"
              disabled={preLoading}
              onClick={() => onSave(data.candidature_id, "preselectionner")}
            >
              {preLoading ? "Chargement..." : "Preselectionner"}
            </button>
          )}

          <button
            className="w-full sm:w-auto px-6 py-3 rounded-lg text-zinc-700 cursor-pointer font-semibold border border-zinc-300 hover:bg-zinc-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onClose}
            disabled={preLoading || rejectLoading}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateModal;