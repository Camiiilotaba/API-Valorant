const BASE_URL = "https://valorant-api.com/v1";

const urlParams = new URLSearchParams(window.location.search);
const agentId = urlParams.get("id");

const agentDetails = document.getElementById("agent-details");

const showAgentDetails = (agentId) => {
  fetch(`${BASE_URL}/agents/${agentId}`)
    .then((res) => res.json())
    .then((jsonResponse) => {
      const agent = jsonResponse.data;

      const agentContainer = document.createElement("div");
      agentContainer.className = "bg-[#53212b] p-12 rounded-lg shadow-lg";

      const agentImage = document.createElement("img");
      agentImage.src = agent.fullPortrait;
      agentImage.alt = agent.displayName;
      agentImage.className = "w-600 h-64 object-contain mx-auto";
      agentContainer.appendChild(agentImage);

      const agentInfo = document.createElement("div");
      agentInfo.className = "text-center mt-4";
      const agentName = document.createElement("h2");
      agentName.className = "text-3xl font-bold text-[#fffbf5]";
      agentName.textContent = agent.displayName;
      const agentRole = document.createElement("p");
      agentRole.className = "text-xl text-[#fffbf5]";
      agentRole.textContent = `Rol: ${agent.role.displayName}`;
      agentInfo.appendChild(agentName);
      agentInfo.appendChild(agentRole);
      agentContainer.appendChild(agentInfo);

      const abilitiesContainer = document.createElement("div");
      abilitiesContainer.className = "mt-6";
      const abilitiesTitle = document.createElement("h3");
      abilitiesTitle.className = "text-2xl font-bold text-[#fffbf5]";
      abilitiesTitle.textContent = "Habilidades";
      abilitiesContainer.appendChild(abilitiesTitle);

      agent.abilities.forEach((ability) => {
        const abilityCard = document.createElement("div");
        abilityCard.className = "bg-[#fd4556] p-4 rounded-lg mt-4";

        const abilityIcon = document.createElement("img");
        abilityIcon.src = ability.displayIcon;
        abilityIcon.alt = ability.displayName;
        abilityIcon.className = "w-16 h-16 mx-auto";

        const abilityName = document.createElement("h4");
        abilityName.className = "text-xl font-semibold mt-2 text-[#fffbf5]";
        abilityName.textContent = ability.displayName;

        const abilityDescription = document.createElement("p");
        abilityDescription.className = "text-lg text-[#fffbf5] mt-2";
        abilityDescription.textContent = ability.description;

        abilityCard.appendChild(abilityIcon);
        abilityCard.appendChild(abilityName);
        abilityCard.appendChild(abilityDescription);

        abilitiesContainer.appendChild(abilityCard);
      });

      agentContainer.appendChild(abilitiesContainer);
      agentDetails.appendChild(agentContainer);
    });
};

if (agentId) {
  showAgentDetails(agentId);
} else {
  agentDetails.innerHTML = "No se ha encontrado el agente.";
}
const themeToggleBtn = document.getElementById("theme-toggle");

const lightThemeHTML = `
<body class="bg-[#f5d1d4] text-[#000000] overflow-x-hidden">
    
</body>`;

const darkThemeHTML = `
<body class="bg-gray-900 text-white">

</body>`;

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
