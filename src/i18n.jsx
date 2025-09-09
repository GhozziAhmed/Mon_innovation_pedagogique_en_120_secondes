import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: "fr",
    fallbackLng: "fr",
    returnObjects: true,
    resources: {
      fr: {
        translation: {
            navbar: {
                home: "Acceuil",
                vote: "Vote",
                results: "Resultats",
                gallery: "Gallerie",
                contact: "Contact"
            },
          hero: {
            title: {
              mon: "Mon",
              innovation: "Innovation",
              pedagogique: "Pédagogique",
              en: "En",
              secondes: "120 Secondes",
            },
            text:
              "Un concours international pour les enseignants francophones pour présenter une vidéo de 2 minutes présentant leur idée pédagogique la plus innovante",
            participate: "Participer",
            vote: "Voter",
          },
          flow: {
            header: "Comment Participer",
            steps: {
              registration: {
                header: "Inscription & Soumission",
                body: "Remplissez notre formulaire en ligne",
              },
              evaluation: {
                header: "Evaluation",
                body: "Un jury indépendant sélectionne les lauréats",
              },
              qualification: {
                header: "Qualification",
                body: "se qualifier pour la finale au Cameroun",
              },
            },
          },
          partners: {
            header: "Nos Partenaires"
          },
        },
      },
      en: {
        translation: {
            navbar: {
                home: "Home",
                vote: "Vote",
                results: "Results",
                gallery: "Gallery",
                contact: "Contact"
            },
          hero: {
            title: {
              mon: "My",
              innovation: "Educational",
              pedagogique: "Innovation",
              en: "In",
              secondes: "120 Seconds",
            },
            text:
              "An international competition for French-speaking teachers to submit a 2-minute video presenting their most innovative teaching idea.",
            participate: "Participate",
            vote: "Vote",
          },
          flow: {
            header: "How To Participate",
            steps: {
              registration: {
                header: "Registration and Submission",
                body: "Fill out our online form",
              },
              evaluation: {
                header: "Evaluation",
                body: "An independent jury selects the winners",
              },
              qualification: {
                header: "Qualification",
                body: "qualify for the final in Cameroon",
              },
            },
          },
          partners: {
            header: "Our Partners"
          },
        },
      },
    },
  });
