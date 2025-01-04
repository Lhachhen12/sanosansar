import React, { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import translations from "../Assets/translations.json";

const Greeting = () => {
  const { language, toggleLanguage } = useContext(LanguageContext);

  return (
    <div>
      <h1>{translations[language]["welcome"]}</h1>
      <button onClick={toggleLanguage}>
        Switch to {language === "en" ? "Nepali" : "English"}
      </button>
    </div>
  );
};

export default Greeting;
