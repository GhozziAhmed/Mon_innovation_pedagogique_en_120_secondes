import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteArchiveModal from "../../components/DeleteArchiveModal";
import { toast } from "react-toastify";

const Messages = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get("https://mon-innovation-pedagogique-en-120.onrender.com/api/contact/admin", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMessages(res.data);
    } catch (err) {
      console.error(err.response?.data?.message || "Failed to fetch messages.");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(
        `https://mon-innovation-pedagogique-en-120.onrender.com/api/contact/admin/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchData()
    } catch (err) {
      console.error(err.response?.data?.message || "Failed to update status.");
      toast.error("Échec de la mise à jour du statut.");
    }
  };

  const deleteMessage = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(
        `https://mon-innovation-pedagogique-en-120.onrender.com/api/contact/admin/${selectedMessage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(res.data.message, { position: "bottom-right", autoClose: 3000, hideProgressBar: true, closeButton: false });
      fetchData(); // Re-fetch data to update the list
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to delete message.", { position: "bottom-right", autoClose: 3000, hideProgressBar: true, closeButton: false });
    } finally {
      setLoading(false);
      setDeleteModal(false);
      setSelectedMessage(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="px-4 md:px-6 lg:px-20 py-10">
      <div className="mb-10">
        <h1 className="text-zinc-800 text-4xl font-semibold mb-2">Messages</h1>
        <p className="text-zinc-700">Gérer les messages</p>
      </div>

      <div className="overflow-x-auto relative shadow rounded-lg">
        {/* Header Row */}
        <div className="grid grid-cols-4 gap-4 p-4 bg-zinc-100 border-b border-zinc-300 font-semibold text-zinc-700 min-w-[800px]">
          <div>Nom</div>
          <div>Sujet</div>
          <div>Statut</div>
          <div className="flex justify-center">Actions</div>
        </div>

        {messages.length === 0 ? (
          <div className="p-4 w-fit mx-auto text-zinc-500">Aucun Message Récu</div>
        ) : (
          <div className="bg-white min-w-[700px]">
            {messages.map((m) => (
              <div
                key={m.message_id}
                className="grid grid-cols-4 gap-4 p-4 items-center border-b border-zinc-300 hover:bg-zinc-100 cursor-pointer"
                onClick={() => {
                  updateStatus(m.message_id, "read");
                  navigate(`/admin/messages/${m.message_id}`);
                }}
              >
                <div className="font-semibold text-zinc-800">{m.sender_name}</div>
                <div className="text-zinc-700 truncate">{m.subject}</div>
                <div className="flex items-center">
                  <span
                    className={`py-1 px-3 text-white text-xs rounded-full ${
                      m.status === "unread" ? "bg-[#004C91]" : "bg-zinc-400"
                    }`}
                  >
                    {m.status === "unread" ? "Reçu" : "Vu"}
                  </span>
                </div>
                {/* Replaced ellipsis with two buttons */}
                <div className="flex items-center justify-center space-x-2">
                  <button
                    className="cursor-pointer hover:bg-zinc-200 p-2 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      updateStatus(m.message_id, m.status === "read" ? "unread" : "read");
                    }}
                  >
                    <img src={`/${m.status === "read" ? "mail" : "email"}.png`} alt="" className="w-5"/>
                  </button>
                  <button
                    className="cursor-pointer hover:bg-zinc-200 p-2 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteModal(true);
                      setSelectedMessage(m.message_id);
                    }}
                  >
                    <img src="/delete.png" alt="" className="w-5"/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {deleteModal && (
        <DeleteArchiveModal
          mode={"supprimez"}
          onSave={deleteMessage}
          loading={loading}
          onClose={() => setDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default Messages;