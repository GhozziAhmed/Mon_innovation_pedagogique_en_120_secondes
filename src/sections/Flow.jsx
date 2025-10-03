import { useTranslation } from "react-i18next";

const Flow = () => {
  const { t } = useTranslation();

  return (
    <div className='w-full px-8 md:px-10 lg:px-20 py-20'>
      <h1 className='text-[#004C91] text-3xl text-center font-semibold mb-10'>
        {t("flow.title")}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div className="bg-zinc-200 rounded p-5 flex flex-col items-center text-center gap-3">
          <img src="/person_check.png" alt="" className="size-12"/>
          <h2 className="text-xl font-semibold text-zinc-800">
            {t("flow.steps.step1.heading")}
          </h2>
          <p>{t("flow.steps.step1.description")}</p>
        </div>
        <div className="bg-zinc-200 rounded p-5 flex flex-col items-center text-center gap-3">
          <img src="/thumbs_up_down.png" alt="" className="size-12"/>
          <h2 className="text-xl font-semibold text-zinc-800">
            {t("flow.steps.step2.heading")}
          </h2>
          <p>{t("flow.steps.step2.description")}</p>
        </div>
        <div className="bg-zinc-200 rounded p-5 flex flex-col items-center text-center gap-3">
          <img src="/trophy.png" alt="" className="size-12"/>
          <h2 className="text-xl font-semibold text-zinc-800">
            {t("flow.steps.step3.heading")}
          </h2>
          <p>{t("flow.steps.step3.description")}</p>
        </div>
      </div>
    </div>
  );
};

export default Flow;