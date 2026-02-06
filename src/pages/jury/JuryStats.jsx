import axios from "axios";
import { useEffect, useState } from "react";

const JuryStats = () => {
  const [stats, setStats] = useState({});
  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/stats/assignment-stats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setStats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4 md:px-6 lg:px-20 py-10">
      <div className="flex items-center justify-between p-5 rounded shadow border border-zinc-200">
        <div className="flex flex-col gap-5">
          <h2 className="text-zinc-700">Candidatures Affectée</h2>
          <span className="text-3xl font-semibold">{stats.total_assigned}</span>
        </div>
        <div className="bg-[#004C91] p-3 rounded">
          <img src="/checklist.png" alt="" className="w-10" />
        </div>
      </div>
      <div className="flex items-center justify-between p-5 rounded shadow border border-zinc-200">
        <div className="flex flex-col gap-5">
          <h2 className="text-zinc-700">Candidatures Evaluée</h2>
          <span className="text-3xl font-semibold">{stats.total_evaluated}</span>
        </div>
        <div className="bg-[#004C91] p-3 rounded">
          <img src="/checklist_done.png" alt="" className="w-10" />
        </div>
      </div>
      <div className="flex items-center justify-between p-5 rounded shadow border border-zinc-200">
        <div className="flex flex-col gap-5">
          <h2 className="text-zinc-700">Candidatures Non Evaluée</h2>
          <span className="text-3xl font-semibold">{stats.total_not_evaluated}</span>
        </div>
        <div className="bg-[#004C91] p-3 rounded">
          <img src="/checklist_pending.png" alt="" className="w-10" />
        </div>
      </div>
    </div>
  );
};

export default JuryStats;
