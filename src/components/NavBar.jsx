import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBars,
  faChevronDown,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

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

  const { i18n, t } = useTranslation();

  const [language, setLanguage] = useState(
    languages.find((l) => l.code === i18n.language) || languages[0]
  );
  const [languageDropDown, setLanguageDropDown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const currentUser = localStorage.getItem("user");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     // Handle language dropdown close
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setLanguageDropDown(false);
  //     }
  //     // Handle mobile menu close
  //     if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
  //       setIsMobileMenuOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang.code);
    setLanguageDropDown(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div
      className={`w-full fixed top-0 ${
        isMobileMenuOpen ? "border-b border-b-zinc-600" : "shadow-md"
      } px-4 md:px-6 lg:px-20 h-20 bg-white z-50`}
    >
      <div className="h-full flex justify-between items-center">
        <NavLink to="/">
          <img src="/logo_transparent.png" alt="Logo" className="w-25" />
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-5 text-lg font-light text-zinc-600">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-[#004C91] font-medium"
                : "hover:text-[#004C91] transition-colors"
            }
          >
            {t("navbar.home")}
          </NavLink>
          <NavLink
            to="/vote"
            className={({ isActive }) =>
              isActive
                ? "text-[#004C91] font-medium"
                : "hover:text-[#004C91] transition-colors"
            }
          >
            {t("navbar.vote")}
          </NavLink>
          <NavLink
            to="/resultats"
            className={({ isActive }) =>
              isActive
                ? "text-[#004C91] font-medium"
                : "hover:text-[#004C91] transition-colors"
            }
          >
            {t("navbar.results")}
          </NavLink>
          <NavLink
            to="/gallerie"
            className={({ isActive }) =>
              isActive
                ? "text-[#004C91] font-medium"
                : "hover:text-[#004C91] transition-colors"
            }
          >
            {t("navbar.gallery")}
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-[#004C91] font-medium"
                : "hover:text-[#004C91] transition-colors"
            }
          >
            {t("navbar.contact")}
          </NavLink>
        </nav>

        {/* Desktop User/Language Section */}
        <div className="hidden md:flex items-center gap-5">
          <div
            className="relative flex items-center gap-2 p-2 cursor-pointer rounded-lg hover:bg-zinc-100 transition-colors"
            onClick={() => setLanguageDropDown(!languageDropDown)}
            ref={dropdownRef}
          >
            <div className="flex items-center gap-1">
              <img src={language.img} alt={language.lang} className="w-5 h-5" />
              {language.lang}
            </div>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`text-zinc-600 transition-transform duration-300 ${
                languageDropDown ? "rotate-180" : ""
              }`}
            />
            {languageDropDown && (
              <div className="absolute bg-white top-full mt-2 rounded-lg shadow-lg w-full min-w-[120px] z-10 left-0 border border-zinc-200 overflow-hidden animate-slideDown">
                {languages.map(
                  (l) =>
                    l.code !== language.code && (
                      <div
                        key={l.code}
                        className="p-2 cursor-pointer hover:bg-zinc-200 transition-colors"
                        onClick={() => handleLanguageChange(l)}
                      >
                        <div className="flex items-center gap-2">
                          <img src={l.img} alt={l.lang} className="w-5 h-5" />
                          <span>{l.lang}</span>
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
                  className="py-2 px-5 rounded-full border border-[#004C91] text-[#004C91] font-semibold transition-colors hover:bg-[#004C91] hover:text-white"
                >
                  {t("navbar.auth.register")}
                </Link>
                <Link
                  to="/login"
                  className="py-2 px-5 rounded-full border border-[#004C91] text-white bg-[#004C91] font-semibold transition-colors hover:bg-[#003B70]"
                >
                  {t("navbar.auth.login")}
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                  <div className="size-10 bg-zinc-200 text-zinc-600 rounded-full flex justify-center items-center font-bold cursor-pointer">
                    {user.nom?.[0]?.toUpperCase()}
                    {user.prenom?.[0]?.toUpperCase()}
                  </div>
                  {user.role === "candidat" && (
                    <Link
                      to="/profile"
                      className="text-zinc-600 hover:text-[#004C91] transition-colors"
                    >
                      {t("navbar.user_links.candidate")}
                    </Link>
                  )}
                  {user.role === "jury" && (
                    <Link
                      to="/jury/stats"
                      className="text-zinc-600 hover:text-[#004C91] transition-colors"
                    >
                      {t("navbar.user_links.jury")}
                    </Link>
                  )}
                  {user.role === "admin" && (
                    <Link
                      to="/admin/stats"
                      className="text-zinc-600 hover:text-[#004C91] transition-colors"
                    >
                      {t("navbar.user_links.admin")}
                    </Link>
                  )}
                </div>
                <button
                  className="text-[#004C91] text-xl transition-colors hover:text-red-500 cursor-pointer"
                  onClick={logout}
                  aria-label={t("navbar.auth.logout")}
                >
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl text-zinc-500 hover:text-zinc-800 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="absolute w-full top-20 left-0 bg-white shadow-lg p-5 border-t border-zinc-200 animate-slideDown md:hidden"
        >
          <nav className="flex flex-col items-center gap-5 text-lg font-light text-zinc-600 border-b border-zinc-200 pb-5 mb-5">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `w-full text-center py-2 rounded transition-colors ${
                  isActive
                    ? "bg-zinc-100 font-medium text-[#004C91]" // Active style: Blue text and light background
                    : "hover:bg-zinc-100 text-zinc-600" // Default style
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("navbar.home")}
            </NavLink>
            <NavLink
              to="/vote"
              className={({ isActive }) =>
                `w-full text-center py-2 rounded transition-colors ${
                  isActive
                    ? "bg-zinc-100 font-medium text-[#004C91]"
                    : "hover:bg-zinc-100 text-zinc-600"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("navbar.vote")}
            </NavLink>
            <NavLink
              to="/resultats"
              className={({ isActive }) =>
                `w-full text-center py-2 rounded transition-colors ${
                  isActive
                    ? "bg-zinc-100 font-medium text-[#004C91]"
                    : "hover:bg-zinc-100 text-zinc-600"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("navbar.results")}
            </NavLink>
            <NavLink
              to="/gallerie"
              className={({ isActive }) =>
                `w-full text-center py-2 rounded transition-colors ${
                  isActive
                    ? "bg-zinc-100 font-medium text-[#004C91]"
                    : "hover:bg-zinc-100 text-zinc-600"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("navbar.gallery")}
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `w-full text-center py-2 rounded transition-colors ${
                  isActive
                    ? "bg-zinc-100 font-medium text-[#004C91]"
                    : "hover:bg-zinc-100 text-zinc-600"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("navbar.contact")}
            </NavLink>
          </nav>
          <div className="flex flex-col items-center gap-4">
            {/* Mobile Language Dropdown */}
            <div
              className="relative w-full flex items-center justify-center gap-2 p-2 cursor-pointer rounded-lg hover:bg-zinc-100 transition-colors"
              onClick={() => setLanguageDropDown(!languageDropDown)}
            >
              <div className="flex items-center gap-1">
                <img
                  src={language.img}
                  alt={language.lang}
                  className="w-5 h-5 rounded"
                />
                {language.lang}
              </div>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`text-zinc-600 transition-transform duration-300 ${
                  languageDropDown ? "rotate-180" : ""
                }`}
              />
              {languageDropDown && (
                <div className="absolute bg-white top-full mt-2 rounded-lg shadow-lg w-full min-w-[120px] z-10 left-0 border border-zinc-200 overflow-hidden animate-slideDown">
                  {languages.map(
                    (l) =>
                      l.code !== language.code && (
                        <div
                          key={l.code}
                          className="p-2 cursor-pointer hover:bg-zinc-200 transition-colors text-center"
                          onClick={() => handleLanguageChange(l)}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <img
                              src={l.img}
                              alt={l.lang}
                              className="w-5 h-5 rounded"
                            />
                            <span>{l.lang}</span>
                          </div>
                        </div>
                      )
                  )}
                </div>
              )}
            </div>

            {/* Mobile User/Auth Links */}
            {!user ? (
              <div className="flex flex-col w-full gap-4 mt-2">
                <Link
                  to="/register"
                  className="w-full text-center py-2 rounded-full border border-[#004C91] text-[#004C91] font-semibold transition-colors hover:bg-[#004C91] hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("navbar.auth.register")}
                </Link>
                <Link
                  to="/login"
                  className="w-full text-center py-2 rounded-full border border-[#004C91] text-white bg-[#004C91] font-semibold transition-colors hover:bg-[#003B70]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("navbar.auth.login")}
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-center w-full gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <div className="size-10 bg-zinc-200 text-zinc-600 rounded-full flex justify-center items-center font-bold cursor-pointer">
                    {user.nom?.[0]?.toUpperCase()}
                    {user.prenom?.[0]?.toUpperCase()}
                  </div>
                  {user.role === "candidat" && (
                    <Link
                      to="/profile"
                      className="text-zinc-600 hover:text-[#004C91] transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t("navbar.user_links.candidate")}
                    </Link>
                  )}
                  {user.role === "jury" && (
                    <Link
                      to="/jury/stats"
                      className="text-zinc-600 hover:text-[#004C91] transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t("navbar.user_links.jury")}
                    </Link>
                  )}
                  {user.role === "admin" && (
                    <Link
                      to="/admin/stats"
                      className="text-zinc-600 hover:text-[#004C91] transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t("navbar.user_links.admin")}
                    </Link>
                  )}
                </div>
                <button
                  className="text-[#004C91] text-xl transition-colors hover:text-red-500"
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  aria-label={t("navbar.auth.logout")}
                >
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
