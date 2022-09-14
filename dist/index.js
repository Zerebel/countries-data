/* #region  Theme Switcher */
const mode_btn = document.querySelector("#mode-btn");
//Themes
const userTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
mode_btn.addEventListener("click", (e) => {
  themeSwitch();
  iconSwitch();
  return;
});
const themeSwitch = () => {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    return;
  }

  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "dark");
  return;
};
const iconSwitch = () => {
  mode_btn.textContent === "🌙"
    ? (mode_btn.textContent = "🌞")
    : (mode_btn.textContent = "🌙");
  return;
};

window.addEventListener("load", (e) => {
  if (userTheme === "dark" || (!userTheme && systemTheme)) {
    document.documentElement.classList.add("dark");
    iconSwitch();
  }
  return;
});

/* #endregion */

const country = document.querySelector("#country");
const number = document.querySelector("#number");
const countries_lenght = document.querySelector("#countries-lenght");
const data_bar = document.querySelector("#data-bar");
const main = document.querySelector("#main");
const populationBTN = document.querySelector("#population");
const languagesBTN = document.querySelector("#languages");
const popu_ping = document.querySelector("#popu-ping");
const lang_ping = document.querySelector("#lang-ping");
const statusInfo = document.querySelector("#status");
const url = "https://restcountries.com/v3.1/all";

const fetchData = async () => {
  if (!localStorage.getItem("countries") == null) return "";
  const response = await fetch(url);
  const countryJson = await response.json();
  return countryJson;
};
fetchData().then((e) => {
  return localStorage.setItem("countries", JSON.stringify(e));
});

const countryData = JSON.parse(localStorage.getItem("countries"));
// Create population data
const filterCountries = () => {
  let TotalPopulation = 0;
  for (const item of countryData) {
    TotalPopulation += item.population;
  }
  country.textContent = "World";
  number.textContent = TotalPopulation;
  countries_lenght.textContent = countryData.length;
  main.appendChild(country);
  main.append(data_bar);
  main.appendChild(number);
  const top_10_Population = countryData
    .map((e) => {
      return { Name: e.name.common, Population: e.population };
    })
    .sort((a, b) => {
      if (a.Population > b.Population) return -1;
      if (a.Population < b.Population) return 1;
      return 0;
    })
    .splice(0, 10);

  for (const item of top_10_Population) {
    const newCountryName = document.createElement("span");
    newCountryName.textContent = item.Name;
    const countryDivWidth = document.createElement("div");
    countryDivWidth.classList.add(
      "h-full",
      "bg-yellow-600",
      "mx-2",
      "dark:bg-yellow-400",
      "bg-yellow-600"
    );
    const width = ((item.Population / TotalPopulation) * 100 + 10).toFixed(3);
    countryDivWidth.style.width = `${width}%`;
    const countryPopulation = document.createElement("span");
    countryPopulation.textContent = Number(item.Population).toLocaleString();
    countryPopulation.classList.add("place-self-end");
    main.appendChild(newCountryName);
    main.appendChild(countryDivWidth);
    main.appendChild(countryPopulation);
  }
  return;
};
filterCountries();
// Click Event
populationBTN.addEventListener("click", (e) => {
  main.innerHTML = "";
  filterCountries();
  localStorage.setItem("langOrPopulation", "popu");
  statusInfo.textContent = "10 Most populated countries in the world";
  lang_ping.classList.add("hidden");
  popu_ping.classList.remove("hidden");
  return;
});

languagesBTN.addEventListener("click", (e) => {
  main.innerHTML = "";
  displayLangData();
  localStorage.setItem("langOrPopulation", "lang");
  statusInfo.textContent = "10 Most spoken languages in the world";
  popu_ping.classList.add("hidden");
  lang_ping.classList.remove("hidden");
  return;
});

// Languages Data
const filteredLanguages = () => {
  const theLanguage = countryData.reduce((ind, lan) => {
    lan = lan.languages;
    for (const element in lan) {
      if (Object.hasOwnProperty.call(lan, element)) {
        const key = lan[element];
        ind[key] = (ind[key] || 0) + 1;
      }
    }
    return ind;
  }, {});

  return Object.keys(theLanguage)
    .map((lan) => {
      return { Language: lan, Count: theLanguage[lan] };
    })
    .sort((a, b) => {
      if (a.Count > b.Count) return -1;
      if (a.Count < b.Count) return 1;
      return 0;
    })
    .splice(0, 10);
};

// Displaying languages
const displayLangData = () => {
  let totalLanguages = 0;
  for (const lang of filteredLanguages()) {
    totalLanguages += lang.Count;
  }
  for (const item of filteredLanguages()) {
    const langName = document.createElement("span");
    langName.textContent = item["Language"];
    const languageDivWidth = document.createElement("div");
    languageDivWidth.classList.add(
      "h-full",
      "bg-yellow-600",
      "mx-2",
      "dark:bg-yellow-400",
      "bg-yellow-600"
    );
    const width = ((item.Count / totalLanguages) * 100).toFixed(3);
    languageDivWidth.style.width = `${width}%`;
    const languageNumber = document.createElement("span");
    languageNumber.textContent = item["Count"];
    main.appendChild(langName);
    main.appendChild(languageDivWidth);
    main.appendChild(languageNumber);
  }
  return;
};

window.addEventListener("load", (e) => {
  if (!localStorage.getItem("langOrPopulation")) {
    return localStorage.setItem("langOrPopulation", "");
  }
  if (localStorage.getItem("langOrPopulation") === "popu") {
    main.innerHTML = "";
    statusInfo.textContent = "10 Most populated countries in the world";
    lang_ping.classList.add("hidden");
    popu_ping.classList.remove("hidden");
    return filterCountries();
  }
  if (localStorage.getItem("langOrPopulation") === "lang") {
    main.innerHTML = "";
    statusInfo.textContent = "10 Most spoken languages in the world";
    popu_ping.classList.add("hidden");
    lang_ping.classList.remove("hidden");
    return displayLangData();
  }
});
