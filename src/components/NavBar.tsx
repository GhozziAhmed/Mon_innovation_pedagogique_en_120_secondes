import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBars,
  faChevronDown,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
// import axios from "axios";

const NavBar = () => {
  const languages = [
    {
      code: "fr",
      lang: "Français",
      img: "/france.png",
    },
    {
      code: "en",
      lang: "English",
      img: "/usa.png",
    },
  ];
  const [language, setLanguage] = useState(languages[0]);
  const [languageDropDown, setLanguageDropDown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  useEffect(() => {
    const currentUser = localStorage.getItem("user");
    console.log(currentUser);
    if (currentUser) setUser(JSON.parse(currentUser));
  }, []);
  console.log(token);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };
  const { i18n, t } = useTranslation();
  const { home, vote, results, gallery, contact } = t("navbar");
  return (
    <div
      className={`w-full fixed top-0 ${
        isOpen ? "border-b border-b-zinc-600 " : "shadow-md "
      }px-4 md:px-6 lg:px-20 h-20 bg-white z-50`}
    >
      <div className="h-full flex justify-between items-center">
        <NavLink to="/">
          <img src="/logo_transparent.png" alt="" className="w-25" />
        </NavLink>
        <nav className="hidden md:flex gap-5 text-lg font-light text-zinc-600">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-[#004C91] underline" : ""
            }
          >
            {home}
          </NavLink>
          <NavLink
            to="/vote"
            className={({ isActive }) =>
              isActive ? "text-[#004C91] underline" : ""
            }
          >
            {vote}
          </NavLink>
          <NavLink
            to="/resultats"
            className={({ isActive }) =>
              isActive ? "text-[#004C91] underline" : ""
            }
          >
            {results}
          </NavLink>
          <NavLink
            to="/gallerie"
            className={({ isActive }) =>
              isActive ? "text-[#004C91] underline" : ""
            }
          >
            {gallery}
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-[#004C91] underline" : ""
            }
          >
            {contact}
          </NavLink>
        </nav>
        <div className="hidden md:flex items-center gap-5">
          <div
            className="relative flex items-center gap-2 p-2 cursor-pointer"
            onClick={() => setLanguageDropDown(!languageDropDown)}
          >
            <div className="flex items-center gap-1">
              <img src={language.img} alt="" className="w-5" />
              {language.lang}
            </div>
            <FontAwesomeIcon icon={faChevronDown} className="text-zinc-600" />
            {languageDropDown && (
              <div className="absolute bg-white top-full outline outline-zinc-600 w-full z-10 left-0">
                {languages.map(
                  (l) =>
                    l.lang !== language.lang && (
                      <div
                        key={l.code}
                        className="p-2 cursor-pointer hover:bg-zinc-200"
                        onClick={() => {
                          setLanguage(l);
                          setLanguageDropDown(false);
                          i18n.changeLanguage(l.code);
                        }}
                      >
                        <div className="flex items-center gap-1">
                          <img src={l.img} alt="" className="w-5" />
                          {l.lang}
                        </div>
                      </div>
                    )
                )}
              </div>
            )}
          </div>
          <div className="flex gap-3">
            {!user ? (
              <>
                <Link
                  to="/register"
                  className="py-2 px-5 rounded-full border border-[#004C91] text-[#004C91] cursor-pointer"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="py-2 px-5 rounded-full border border-[#004C91] text-white bg-[#004C91] cursor-pointer"
                >
                  Login
                </Link>
              </>
            ) : (
              <div>
                {user && (
                  <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2">
                      <div className="size-10 border-2 border-zinc-600 text-zinc-600 rounded-full flex justify-center items-center font-bold cursor-pointer">
                        {user.nom[0]}
                        {user.prenom[0]}
                      </div>
                      {user.role == "candidat" && (
                        <Link to="/profile">Mes Candidatures</Link>
                      )}
                      {user.role == "jury" && (
                        <Link to="/jury/stats">Mes Evaluations</Link>
                      )}
                      {user.role == "admin" && (
                        <Link to="/admin/stats">Paneau Admin</Link>
                      )}
                    </div>
                    <button
                      className="size-7 text-[#004C91] text-xl cursor-pointer"
                      onClick={logout}
                    >
                      <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <button className="block md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <FontAwesomeIcon
              icon={faXmark}
              className="text-3xl text-zinc-500 cursor-pointer"
            />
          ) : (
            <FontAwesomeIcon
              icon={faBars}
              className="text-3xl text-zinc-500 cursor-pointer"
            />
          )}
        </button>
        {isOpen && (
          <div className="absolute w-full top-full left-0 py-5 border-b border-b-zinc-200 bg-white">
            <div className="flex flex-col gap-5 items-center w-full">
              <nav className="flex flex-col gap-5 py-5 font-light text-center text-zinc-600">
                <NavLink to="/">{home}</NavLink>
                <NavLink to="/vote">{vote}</NavLink>
                <NavLink to="/resultats">{results}</NavLink>
                <NavLink to="/gallery">{gallery}</NavLink>
                <NavLink to="/contact">{contact}</NavLink>
              </nav>
              <div className="flex gap-3">
                {!user ? (
                  <>
                    <Link
                      to="/register"
                      className="py-2 px-5 rounded-full border border-[#004C91] text-[#004C91] cursor-pointer"
                    >
                      Register
                    </Link>
                    <Link
                      to="/login"
                      className="py-2 px-5 rounded-full border border-[#004C91] text-white bg-[#004C91] cursor-pointer"
                    >
                      Login
                    </Link>
                  </>
                ) : (
                  <div>
                    {user && (
                      <div className="flex flex-col items-center gap-5">
                        <div
                          className="relative flex items-center gap-2 p-2 cursor-pointer"
                          onClick={() => setLanguageDropDown(!languageDropDown)}
                        >
                          <div className="flex items-center gap-1">
                            <img src={language.img} alt="" className="w-5" />
                            {language.lang}
                          </div>
                          <FontAwesomeIcon
                            icon={faChevronDown}
                            className="text-zinc-600"
                          />
                          {languageDropDown && (
                            <div className="absolute bg-white top-full outline outline-zinc-600 w-full z-10 left-0">
                              {languages.map(
                                (l) =>
                                  l.lang !== language.lang && (
                                    <div
                                      key={l.code}
                                      className="p-2 cursor-pointer hover:bg-zinc-200"
                                      onClick={() => {
                                        setLanguage(l);
                                        setLanguageDropDown(false);
                                        i18n.changeLanguage(l.code);
                                      }}
                                    >
                                      <div className="flex items-center gap-1">
                                        <img
                                          src={l.img}
                                          alt=""
                                          className="w-5"
                                        />
                                        {l.lang}
                                      </div>
                                    </div>
                                  )
                              )}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="size-10 border-2 border-zinc-600 text-zinc-600 rounded-full flex justify-center items-center font-bold cursor-pointer">
                            {user.nom[0]}
                            {user.prenom[0]}
                          </div>
                          {user.role == "candidat" && (
                            <Link to="/profile">Mes Candidatures</Link>
                          )}
                          {user.role == "jury" && (
                            <Link to="/profile">Mes Evaluations</Link>
                          )}
                          {user.role == "admin" && (
                            <Link to="/admin/stats">Tableau de Bord</Link>
                          )}
                        </div>
                        <button
                          className="size-7 text-[#004C91] text-xl cursor-pointer"
                          onClick={logout}
                        >
                          <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
