import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MessageDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState({});
    const fetchData = () => {
        axios.get(`https://mon-innovation-pedagogique-en-120.onrender.com/api/contact/admin/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            console.log(res.data);
            setMessage(res.data);
        }).catch((err) => {
            console.log(err.response.data.message);
        })
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className="px-4 md:px-6 lg:px-20 py-10">
            <div className="mb-10 text-[#004C91] cursor-pointer w-fit" onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faChevronLeft} className="text-sm" />
                <span>Retourner aux messages</span>
            </div>
            <div className="p-10 border border-zinc-200 rounded shadow w-250 max-w-full mx-auto">
                <div className="mb-5">
                    <h1 className="text-3xl font-semibold">{message.sender_name}</h1>
                    <span className="text-sm text-zinc-600">{message.sender_email}</span>
                </div>
                <div>
                    <h2 className="text-xl font-semibold">{message.subject}</h2>
                    <p className="text-zinc-800">{message.message_body}</p>
                </div>
            </div>
        </div>
    )
}

export default MessageDetails;