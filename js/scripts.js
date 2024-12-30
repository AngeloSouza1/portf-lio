document.addEventListener("DOMContentLoaded", () => {
  // 1. Animação de Fade-In
  const fadeElements = document.querySelectorAll(".fade-in");

  if (fadeElements.length > 0) {
    // Verifica se o IntersectionObserver é suportado
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target); // Remove a observação para evitar reaplicações
            }
          });
        },
        { threshold: 0.1 }
      );

      fadeElements.forEach((el) => observer.observe(el));
    } else {
      // Fallback para navegadores antigos
      fadeElements.forEach((el) => {
        setTimeout(() => el.classList.add("visible"), 500); // Adiciona atraso para um efeito mais suave
      });
    }
  }

  // 2. Alternar Tema (Claro/Escuro) com Persistência
  const themeToggle = document.getElementById("toggle-theme");
  const darkModeClass = "dark-mode"; // Define a classe do modo escuro
  const lightIcon = "☀️"; // Ícone para o modo claro
  const darkIcon = "🌙"; // Ícone para o modo escuro

  const setTheme = (isDarkMode) => {
    document.body.classList.toggle(darkModeClass, isDarkMode);
    themeToggle.textContent = isDarkMode ? lightIcon : darkIcon;
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  };

  // Recupera a preferência de tema do localStorage
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDarkMode = savedTheme === "dark" || (savedTheme === null && prefersDark);

  // Aplica o tema ao carregar
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
    document.getElementById("progress-bar").style.width = scrollPercentage + "%";
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

  // Adiciona o keyframe para o efeito de bounce
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

//efeito de digitação
const typewriter = document.getElementById("typewriter");
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




});
