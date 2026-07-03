// Modern Theme System Pipeline Controller
document.addEventListener("DOMContentLoaded", () => {
    const themeToggleBtn = document.getElementById("themeToggle");
    const bodyEl = document.body;
    
    // Load local cache configurations instantly safely
    const activeTheme = localStorage.getItem("app-theme") || "light";
    if (activeTheme === "dark") {
        bodyEl.classList.remove("light-mode");
        bodyEl.classList.add("dark-mode");
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun text-warning"></i>';
    }

    themeToggleBtn.addEventListener("click", () => {
        if (bodyEl.classList.contains("light-mode")) {
            bodyEl.classList.remove("light-mode");
            bodyEl.classList.add("dark-mode");
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun text-warning"></i>';
            localStorage.setItem("app-theme", "dark");
        } else {
            bodyEl.classList.remove("dark-mode");
            bodyEl.classList.add("light-mode");
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
            localStorage.setItem("app-theme", "light");
        }
    });
});