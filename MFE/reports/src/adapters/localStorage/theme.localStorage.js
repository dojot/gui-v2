export const getTheme = () => localStorage.getItem("THEME_TYPE");

export const setTheme = (theme) => {
  localStorage.setItem("THEME_TYPE", theme);
  window.dispatchEvent(new Event("storage"));
};
