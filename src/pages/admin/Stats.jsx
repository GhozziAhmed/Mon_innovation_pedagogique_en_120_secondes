import axios from "axios";
import { useState, useEffect } from "react";

const Stats = () => {
  const [stats, setStats] = useState({});
  useEffect(() => {
    axios
      .get("https://mon-innovation-pedagogique-en-120.onrender.com/api/stats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // or sessionStorage
        },
      })
      .then((res) => {
        setStats(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-4 md:px-6 lg:px-20 py-10">
      <div className="flex items-center justify-between p-5 rounded shadow border border-zinc-200">
        <div className="flex flex-col gap-5">
          <h2 className="text-zinc-700">Videos en Attente</h2>
          <span className="text-3xl font-semibold">{stats.videos_en_attente}</span>
        </div>
        <div className="bg-[#004C91] p-3 rounded">
          <img src="/animated_images.png" alt="" />
        </div>
      </div>
      <div className="flex items-center justify-between p-5 rounded shadow border border-zinc-200">
        <div className="flex flex-col gap-5">
          <h2 className="text-zinc-700">Candidats</h2>
          <span className="text-3xl font-semibold">{stats.candidates}</span>
        </div>
        <div className="bg-[#004C91] p-3 rounded">
          <img src="/co_present.png" alt="" />
        </div>
      </div>
      <div className="flex items-center justify-between p-5 rounded shadow border border-zinc-200">
        <div className="flex flex-col gap-5">
          <h2 className="text-zinc-700">Candidatures Approuvée</h2>
          <span className="text-3xl font-semibold">{stats.candidatures}</span>
        </div>
        <div className="bg-[#004C91] p-3 rounded">
          <img src="/animated_images.png" alt="" />
        </div>
      </div>
      <div className="flex items-center justify-between p-5 rounded shadow border border-zinc-200">
        <div className="flex flex-col gap-5">
          <h2 className="text-zinc-700">Jury</h2>
          <span className="text-3xl font-semibold">{stats.jury}</span>
        </div>
        <div className="bg-[#004C91] p-3 rounded">
          <img src="/productivity.png" alt="" />
        </div>
      </div>
      <div className="flex items-center justify-between p-5 rounded shadow border border-zinc-200">
        <div className="flex flex-col gap-5">
          <h2 className="text-zinc-700">Editions</h2>
          <span className="text-3xl font-semibold">{stats.editions}</span>
        </div>
        <div className="bg-[#004C91] p-3 rounded">
          <img src="/content_paste.png" alt="" />
        </div>
      </div>
      <div className="flex items-center justify-between p-5 rounded shadow border border-zinc-200">
        <div className="flex flex-col gap-5">
          <h2 className="text-zinc-700">Partenaires</h2>
          <span className="text-3xl font-semibold">{stats.partenaires}</span>
        </div>
        <div className="bg-[#004C91] p-3 rounded">
          <img src="/handshake.png" alt="" />
        </div>
      </div>
      <div className="flex items-center justify-between p-5 rounded shadow border border-zinc-200">
        <div className="flex flex-col gap-5">
          <h2 className="text-zinc-700">Votes</h2>
          <span className="text-3xl font-semibold">{stats.votes}</span>
        </div>
        <div className="bg-[#004C91] p-3 rounded">
          <img src="/thumbs_up_double.png" alt="" />
        </div>
      </div>
      <div className="flex items-center justify-between p-5 rounded shadow border border-zinc-200">
        <div className="flex flex-col gap-5">
          <h2 className="text-zinc-700">Resultats</h2>
          <span className="text-3xl font-semibold">{stats.results}</span>
        </div>
        <div className="bg-[#004C91] p-3 rounded">
          <img src="/lab_profile.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Stats;
