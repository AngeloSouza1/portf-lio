document.addEventListener("DOMContentLoaded", () => {
  // 1. Animação de Fade-In
  const fadeElements = document.querySelectorAll(".fade-in");

  if (fadeElements.length > 0) {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      fadeElements.forEach((el) => observer.observe(el));
    } else {
      fadeElements.forEach((el) => {
        setTimeout(() => el.classList.add("visible"), 500);
      });
    }
  }

  // 2. Alternar Tema (Claro/Escuro)
  const themeToggle = document.getElementById("toggle-theme");
  const darkModeClass = "dark-mode";
  const lightIcon = "☀️";
  const darkIcon = "🌙";

  const setTheme = (isDarkMode) => {
    document.body.classList.toggle(darkModeClass, isDarkMode);
    themeToggle.textContent = isDarkMode ? lightIcon : darkIcon;
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  };

  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDarkMode = savedTheme === "dark" || (savedTheme === null && prefersDark);

  setTheme(isDarkMode);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = document.body.classList.contains(darkModeClass);
      setTheme(!currentTheme);
    });
  }

  // 3. Indicador de Rolagem no Topo
  window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    const progressBar = document.getElementById("progress-bar");
    if (progressBar) {
      progressBar.style.width = scrollPercentage + "%";
    }
  });

  // 4. Animação de Ícones no Rodapé
  const icons = document.querySelectorAll(".footer-icons a");

  icons.forEach((icon) => {
    icon.addEventListener("mouseover", () => {
      icon.style.animation = "bounce 0.5s";
      setTimeout(() => {
        icon.style.animation = "";
      }, 500);
    });
  });

  const style = document.createElement("style");
  style.textContent = `
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-10px);
      }
      60% {
        transform: translateY(-5px);
      }
    }
  `;
  document.head.appendChild(style);

  // 5. Efeito de Digitação
  const typewriter = document.getElementById("typewriter");
  if (typewriter) {
    const text = "Sou Angelo Souza, Desenvolvedor Back-End.";
    let index = 0;

    function typeEffect() {
      if (index < text.length) {
        typewriter.textContent += text[index];
        index++;
        setTimeout(typeEffect, 100);
      }
    }

    typeEffect();
  }
  
 
  

});
