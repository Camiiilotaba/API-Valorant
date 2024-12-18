const BASE_URL = "https://valorant-api.com/v1";
const weaponDetailContainer = document.getElementById("weapon-detail");

const params = new URLSearchParams(window.location.search);
const weaponId = params.get("id");

const renderWeaponDetails = (weapon) => {
  weaponDetailContainer.innerHTML = `
    <div class="container mx-auto p-6">
      <div class="bg-[#53212b]  p-6 rounded-lg shadow-lg">
        <div class="text-center rounded-lg mt-4 mb-4">
          <img src="${weapon.displayIcon}" alt="${
    weapon.displayName
  }" class="mx-auto  object-contain">
          <h1 class="text-4xl font-bold italic text-[#fffbf5] mt-4">${
            weapon.displayName
          }</h1>
        </div>

        <div class="bg-[#fd4556] mt-4 p-4 rounded-lg shadow-lg text-[#fffbf5]">
          <h2 class="text-2xl font-bold mb-2">Estadísticas</h2>
          <ul class="list-disc pl-6">
            <li><strong>Velocidad de disparo:</strong> ${
              weapon.weaponStats.fireRate
            } disparos/segundo</li>
            <li><strong>Tamaño del cargador:</strong> ${
              weapon.weaponStats.magazineSize
            } balas</li>
            <li><strong>Tiempo de recarga:</strong> ${
              weapon.weaponStats.reloadTimeSeconds
            } segundos</li>
            <li><strong>Penetración:</strong> ${weapon.weaponStats.wallPenetration.replace(
              "EWallPenetrationDisplayType::",
              ""
            )}</li>
            <li><strong>Costo:</strong> ${
              weapon.shopData ? weapon.shopData.cost : "N/A"
            } créditos</li>
          </ul>
        </div>

        <div id="skins-container" class="bg-[#fd4556] mt-8 p-6 mb-4 rounded-lg shadow-lg text-[#fffbf5]">
          <h2 class="text-3xl font-bold italic mb-4 text-center">Skins</h2>
          <div id="skins-scroll" class="flex gap-4 overflow-x-auto p-4 scrollbar-thin scrollbar-thumb-[#53212b] scrollbar-track-[#fd4556] rounded-lg">
          </div>
        </div>

        <!-- Contenedor del video -->
        <div id="skin-video-container" class="bg-[#53212b] mt-6 p-4 rounded-lg shadow-lg text-center hidden">
          <h2 class="text-2xl font-bold text-[#fffbf5] mb-4">Video de la Skin</h2>
          <video id="skin-video" class="mx-auto rounded-lg w-full max-w-lg" controls>
            <source src="" type="video/mp4">
            Tu navegador no soporta videos.
          </video>
        </div>

      </div>
    </div>
  `;

  const skins = weapon.skins.filter((skin) => skin.displayIcon);
  if (skins.length > 0) {
    const skinsScroll = document.getElementById("skins-scroll");
    const skinVideoContainer = document.getElementById("skin-video-container");
    const skinVideo = document.getElementById("skin-video");

    skins.forEach((skin) => {
      const card = document.createElement("div");
      card.className =
        "min-w-[150px] flex-shrink-0 bg-[#53212b] p-3 rounded-lg shadow-md text-center cursor-pointer";
      card.innerHTML = `
        <img src="${skin.displayIcon}" alt="${skin.displayName}" class="w-full h-32 object-contain rounded-lg mb-2">
        <h3 class="text-sm font-bold text-[#fffbf5]">${skin.displayName}</h3>
      `;

      card.addEventListener("click", () => {
        const videoUrl =
          skin.streamedVideo ||
          (skin.chromas && skin.chromas[0]?.streamedVideo) ||
          (skin.levels && skin.levels[0]?.streamedVideo);

        if (videoUrl) {
          skinVideoContainer.classList.remove("hidden");
          skinVideo.querySelector("source").src = videoUrl;
          skinVideo.load();
          skinVideo.play();
        } else {
          alert("Esta skin no tiene video disponible.");
        }
      });

      skinsScroll.appendChild(card);
    });
  } else {
    document.getElementById("skins-container").style.display = "none";
  }
};
fetch(`${BASE_URL}/weapons/${weaponId}`)
  .then((res) => res.json())
  .then((jsonResponse) => {
    const weapon = jsonResponse.data;
    renderWeaponDetails(weapon);
  })
  .catch((error) => {
    console.error("Error fetching weapon details:", error);
  });

document.getElementById("back-btn").addEventListener("click", () => {
  window.location.href = "index.html";
});

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
};

themeToggleBtn.addEventListener("click", toggleTheme);
