const BASE_URL = "https://valorant-api.com/v1";

const container = document.getElementById("container");
const sectionTitle = document.getElementById("section-title");
const showAgentsBtn = document.getElementById("show-agents");
const showWeaponsBtn = document.getElementById("show-weapons");
const showMapsBtn = document.getElementById("show-maps");

const clearContent = () => {
  container.innerHTML = "";
};

const createCard = (name, imageSrc, isAgent = false, isWeapon = false) => {
  const card = document.createElement("div");
  card.className =
    "bg-[#fd4556] rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 hover:bg-[#bd3944]";

  const img = document.createElement("img");
  img.src = imageSrc;
  img.alt = name;

  if (isAgent) {
    img.className = "w-24 h-24 mx-auto mt-4 object-contain";
  } else if (isWeapon) {
    img.className = "w-32 h-32 mx-auto mt-4 object-contain";
  } else {
    img.className = "w-full h-40 object-cover rounded-t-lg";
  }

  card.appendChild(img);

  const title = document.createElement("div");
  title.className =
    "bg-[#53212b] text-[#fffbf5] text-center p-2 font-bold rounded-b-lg";
  title.textContent = name;
  card.appendChild(title);

  return card;
};

// Mostrar Agentes
const showAgents = () => {
  sectionTitle.textContent = "AGENTES";
  clearContent();
  fetch(`${BASE_URL}/agents`)
    .then((res) => res.json())
    .then((jsonResponse) => {
      const playableAgents = jsonResponse.data.filter(
        (agent) => agent.isPlayableCharacter
      );

      playableAgents.forEach((agent) => {
        const card = createCard(
          agent.displayName,
          agent.displayIconSmall,
          true
        );

        card.addEventListener("click", () => {
          window.location.href = `detalleAgente.html?id=${agent.uuid}`;
        });

        container.appendChild(card);
      });
    });
};

// Mostrar Armas
const showWeapons = () => {
  sectionTitle.textContent = "ARMAS";
  clearContent();
  fetch(`${BASE_URL}/weapons`)
    .then((res) => res.json())
    .then((jsonResponse) => {
      jsonResponse.data.forEach((weapon) => {
        const card = createCard(
          weapon.displayName,
          weapon.displayIcon,
          false,
          true
        );

        card.addEventListener("click", () => {
          window.location.href = `detalleArma.html?id=${weapon.uuid}`;
        });

        container.appendChild(card);
      });
    });
};

// Mostrar Mapas
const showMaps = () => {
  sectionTitle.textContent = "MAPAS";
  clearContent();
  fetch(`${BASE_URL}/maps`)
    .then((res) => res.json())
    .then((jsonResponse) => {
      jsonResponse.data.forEach((map) => {
        const card = createCard(map.displayName, map.splash);
        container.appendChild(card);
      });
    });
};

showAgentsBtn.addEventListener("click", showAgents);
showWeaponsBtn.addEventListener("click", showWeapons);
showMapsBtn.addEventListener("click", showMaps);

showAgents();

const themeToggleBtn = document.getElementById("theme-toggle");

const toggleTheme = () => {
  const isDarkTheme = document.body.classList.contains("bg-gray-900");
  if (isDarkTheme) {
    document.body.classList.remove("bg-gray-900", "text-white");
    document.body.classList.add("bg-[#f5d1d4]", "text-[#000000]");
  } else {
    document.body.classList.remove("bg-[#f5d1d4]", "text-[#000000]");
    document.body.classList.add("bg-gray-900", "text-white");
  }

  showAgents();
};

themeToggleBtn.addEventListener("click", toggleTheme);
