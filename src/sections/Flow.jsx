import { useTranslation } from "react-i18next"


const Flow = () => {
    const {t} = useTranslation();
    const flow = t("flow");
    console.log(flow)
  return (
    <div className='w-full px-8 md:px-10 lg:px-20 py-20'>
        <h1 className='text-[#004C91] text-3xl text-center font-semibold mb-10'>{flow.header}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-zinc-200 rounded p-5 flex flex-col items-center text-center gap-3">
                <img src="/person_check.png" alt="" className="size-12"/>
                <h2 className="text-xl font-semibold text-zinc-800">{flow.steps.registration.header}</h2>
                <p>{flow.steps.registration.body}</p>
            </div>
            <div className="bg-zinc-200 rounded p-5 flex flex-col items-center text-center gap-3">
                <img src="/thumbs_up_down.png" alt="" className="size-12"/>
                <h2 className="text-xl font-semibold text-zinc-800">{flow.steps.evaluation.header}</h2>
                <p>{flow.steps.evaluation.body}</p>
            </div>
            <div className="bg-zinc-200 rounded p-5 flex flex-col items-center text-center gap-3">
                <img src="/trophy.png" alt="" className="size-12"/>
                <h2 className="text-xl font-semibold text-zinc-800">{flow.steps.qualification.header}</h2>
                <p>{flow.steps.qualification.body}</p>
            </div>
        </div>
    </div>
  )
}

export default Flow