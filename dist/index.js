const mode_btn = document.querySelector("#mode-btn");
//Themes
const userTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
mode_btn.addEventListener("click", (e) => {
  themeSwitch();
  iconSwitch();
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
};

window.addEventListener("load", (e) => {
  if (userTheme === "dark" || (!userTheme && systemTheme)) {
    document.documentElement.classList.add("dark");
    iconSwitch();
    return;
  }
});
