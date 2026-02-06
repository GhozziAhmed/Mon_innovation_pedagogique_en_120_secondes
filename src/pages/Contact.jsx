import { useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'; // Import axios

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Le nom est requis";
    if (!form.email.trim()) return "L'email est requis";
    const emailOk = /[^\s@]+@[^\s@]+\.[^\s@]+/.test(form.email);
    if (!emailOk) return "Email invalide";
    if (!form.subject.trim()) return "L'objet est requis";
    if (!form.message.trim()) return "Le message est requis";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      toast.error(err, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: true,
      });
      return;
    }
    
    try {
      setSubmitting(true);
      
      // Axios call to your backend API
      const response = await axios.post('http://localhost:5000/api/contact', {
        sender_name: form.name,
        sender_email: form.email,
        subject: form.subject,
        message_body: form.message,
      });

      // Handle the success response
      toast.success(response.data.message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: true,
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      // Axios handles non-2xx status codes as errors
      const errorMessage = error.response?.data?.message || "Une erreur s'est produite. Réessayez plus tard.";
      toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="px-4 md:px-6 lg:px-20 relative top-20 py-20">
      <div className="w-fit mx-auto text-center">
        {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-sm text-zinc-600">Nous contacter</div> */}
        <h1 className="text-6xl font-semibold mb-3 mt-3 text-zinc-800">Contact</h1>
        <p className="text-zinc-700">Une question, une idée, un partenariat ? Parlons-en.</p>
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white/70 backdrop-blur-md border border-zinc-200 rounded-xl p-6 md:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-zinc-600">Nom complet</label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className="border border-zinc-300 px-4 py-2 rounded-md focus:outline-0 focus:ring-2 focus:ring-[#004C91] transition"
                placeholder="Votre nom"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-zinc-600">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="border border-zinc-300 px-4 py-2 rounded-md focus:outline-0 focus:ring-2 focus:ring-[#004C91] transition"
                placeholder="vous@exemple.com"
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm text-zinc-600">Objet</label>
              <input
                name="subject"
                type="text"
                value={form.subject}
                onChange={handleChange}
                className="border border-zinc-300 px-4 py-2 rounded-md focus:outline-0 focus:ring-2 focus:ring-[#004C91] transition"
                placeholder="Sujet du message"
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm text-zinc-600">Message</label>
              <textarea
                name="message"
                rows={6}
                value={form.message}
                onChange={handleChange}
                className="border border-zinc-300 px-4 py-2 rounded-md focus:outline-0 focus:ring-2 focus:ring-[#004C91] transition resize-none"
                placeholder="Votre message..."
              />
              <div className="text-xs text-zinc-500">Temps de réponse moyen: 24-48h ouvrées.</div>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#004C91] text-white px-6 py-2 border-2 border-[#004C91] rounded-md shadow hover:shadow-md hover:opacity-90 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2"
              >
                {submitting && (
                  <span className="inline-block h-4 w-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin"></span>
                )}
                {submitting ? "Envoi..." : "Envoyer"}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white/70 backdrop-blur-md border border-zinc-200 rounded-xl p-6 md:p-8 h-fit shadow-sm">
          <h3 className="text-xl font-semibold text-zinc-800">Coordonnées</h3>
          <div className="mt-5 flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <img src="/alternate_email.png" alt="" className="w-6 select-none" />
              <div>
                <div className="text-sm text-zinc-600">Email</div>
                <a href={`mailto:contact@concours.com`} className="text-zinc-800 underline">concours.inovation120@gmail.com</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <img src="/location_away.png" alt="" className="w-6 select-none" />
              <div>
                <div className="text-sm text-zinc-600">Adresse</div>
                <div className="text-zinc-800">Av. de l'Innovation, Tunis</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <img src="/co_present.png" alt="" className="w-6 select-none" />
              <div>
                <div className="text-sm text-zinc-600">Support</div>
                <div className="text-zinc-800">Lun - Ven, 9h - 17h</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;