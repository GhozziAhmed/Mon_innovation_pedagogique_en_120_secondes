import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Vote from "./pages/Vote";
import CandidatureDetails from "./pages/CandidatureDetails";
import ConfirmVote from "./pages/ConfirmVote";
import Stats from "./pages/admin/Stats";
import AdminLayout from "./layouts/AdminLayout";
import Editions from "./pages/admin/Editions";
import Jury from "./pages/admin/Jury";
import Candidatures from "./pages/admin/Candidatures";
import Participation from "./pages/Participation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Resultats from "./pages/Resultats";
import Gallery from "./pages/Gallery";
import GalleryPanel from "./pages/admin/GalleryPanel";
import EditionGallery from "./pages/admin/EditionGallery";
import Partners from "./pages/admin/Partners";
import News from "./pages/admin/News";
import NewsDetails from "./pages/NewsDetails";
import Votes from "./pages/admin/Votes";
import Evaluations from "./pages/admin/Evaluations";
import ResultatsAdmin from "./pages/admin/ResultatsAdmin";
import JuryLayout from "./layouts/JuryLayout";
import JuryStats from "./pages/jury/JuryStats";
import JuryCandidatures from "./pages/jury/JuryCandidatures";
import Evaluation from "./pages/jury/Evaluation";
import Phases from "./pages/admin/Phases";
import Messages from "./pages/admin/Messages";
import MessageDetails from "./pages/admin/MessageDetails";
import Profile from "./pages/candidate/Profile";
import Contact from "./pages/Contact";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/vote/:id" element={<CandidatureDetails />} />
          <Route path="/resultats" element={<Resultats />} />
          <Route path="/gallerie" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/news/:id" element={<NewsDetails />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/forgot-password" element={<ForgotPassword />} />
          <Route path="/login/reset-password" element={<ResetPassword />} />
          <Route path="/participation" element={<Participation />} />
          <Route path="/vote/confirm/:token" element={<ConfirmVote />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin/stats" element={<Stats />} />
          <Route path="/admin/editions" element={<Editions />} />
          <Route path="/admin/jury" element={<Jury />} />
          <Route path="/admin/candidatures" element={<Candidatures />} />
          <Route path="/admin/gallerie" element={<GalleryPanel />} />
          <Route path="/admin/gallerie/:id" element={<EditionGallery />} />
          <Route path="/admin/news" element={<News />} />
          <Route path="/admin/votes" element={<Votes />} />
          <Route path="/admin/evaluations" element={<Evaluations />} />
          <Route path="/admin/results" element={<ResultatsAdmin />} />
          <Route path="/admin/partners" element={<Partners />} />
          <Route path="/admin/phases" element={<Phases />} />
          <Route path="/admin/messages" element={<Messages />} />
          <Route path="/admin/messages/:id" element={<MessageDetails />} />
          {/* <Route path="/admin/messages" element={<MessageLayout />}>
            <Route path="/admin/messages/:id" element={<MessageDetails />}/>
          </Route> */}
        </Route>
        <Route path="/jury" element={<JuryLayout />}>
          <Route path="/jury/stats" element={<JuryStats />} />
          <Route path="/jury/evaluations" element={<JuryCandidatures />} />
          <Route path="/jury/evaluations/:id" element={<Evaluation />} />
          <Route path="/jury/profile" />
        </Route>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default App;
