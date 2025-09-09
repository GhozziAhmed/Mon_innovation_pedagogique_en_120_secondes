import DynamicVideoPlayer from "./DynamicVideoPlayer ";

const CandidateModal = ({
  data,
  onClose,
  onSave,
  preLoading,
  rejectLoading,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-5 rounded">
        <h1 className="text-3xl text-zinc-800 font-semibold text-center mb-5">
          Candidature de {data.nom} {data.prenom}
        </h1>
        <div className="flex flex-col mb-5">
          <span className="font-bold">
            Etablissement :{" "}
            <span className="font-normal">{data.etablissement}</span>
          </span>
          <span className="font-bold">
            Titre : <span className="font-normal">{data.titre}</span>
          </span>
          <span className="font-bold mb-5">
            Description :<br />
            <span className="font-normal">{data.description}</span>
          </span>
          <div>
            <DynamicVideoPlayer url={data.fichier_lien} />
          </div>
        </div>
        <div className="space-x-5 flex justify-center">
            {(data.statut === "rejete" || data.statut === "en_attente") && (
            <button
              className={`${
                preLoading ? "bg-[#004C91]/50 cursor-default" : "bg-[#004C91]"
              } rounded py-2 px-4 text-white cursor-pointer`}
              disabled={preLoading}
              onClick={() => onSave(data.candidature_id, "preselectionner")}
            >
              {preLoading ? "Chargement..." : "Preselectionner"}
            </button>
          )}
          {(data.statut === "preselectionnee" ||
            data.statut === "en_attente") && (
              <button
                className={`${
                  rejectLoading ? "bg-red-300 cursor-default" : "bg-red-500"
                } rounded py-2 px-4 text-white cursor-pointer`}
                disabled={rejectLoading}
                onClick={() => onSave(data.candidature_id, "rejete")}
              >
                {rejectLoading ? "Chargement..." : "Rejeter"}
              </button>
            )}
          <button
            className="border border-zinc-600 text-zinc-600 rounded py-2 px-4 cursor-pointer"
            onClick={onClose}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateModal;
