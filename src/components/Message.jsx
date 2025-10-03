import { useState, useEffect } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

const Message = ({ m, fetchData, updateStatus }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const handleEllipsisClick = (e, messageId) => {
    e.stopPropagation(); // Stop the click event from bubbling up // Add logic for what happens when the three dots are clicked // For example, open a menu or a modal

    setIsOpen(!isOpen);
  };

  return (
    <tr
      key={m.message_id}
      className="border-b border-zinc-300 hover:bg-zinc-100 cursor-pointer"
      onClick={() => {
        updateStatus(m.message_id, "read");

        navigate(`/admin/messages/${m.message_id}`);
      }}
    >
      <td className="p-3">{m.sender_name}</td>
      <td className="p-3">{m.sender_email}</td>
      <td className="p-3">{m.subject}</td>
      <td className="p-3 flex items-center">
        <span
          className={`py-1 px-3 text-white rounded-full ${
            m.status === "unread" ? "bg-[#004C91]" : "bg-zinc-400"
          }`}
        >
          {m.status === "unread" ? "Récu" : "Vu"}
        </span>

        <div className="relative">
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            className="ml-5 hover:bg-zinc-200 p-2 rounded-full"
            onClick={(e) => handleEllipsisClick(e, m.message_id)}
          />

          {isOpen && (
            <div className="absolute top-full right-0 bg-white rounded border border-zinc-200 shadow">
              <div className="p-3 hover:bg-zinc-100 whitespace-nowrap">
                Marquer Comme lu
              </div>

              <div className="p-3 hover:bg-zinc-100">Supprimer</div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default Message;
