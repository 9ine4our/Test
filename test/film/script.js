// fetch('data/films2.json')
// fetch(
  "https://rawcdn.githack.com/9ine4our/Test/refs/heads/main/test/film/data/film.json"
)
fetch(
  "https://raw.githubusercontent.com/9ine4our/Test/refs/heads/main/test/film.json"
)
  .then((response) => response.json())
  .then((data) => {
    const allFilms = [...data.dramas, ...data.movies];
    localStorage.setItem("filmData", JSON.stringify(allFilms));
    renderList(data.dramas, "drama-list");
    renderList(data.movies, "movie-list");
  });

function renderList(data, containerId) {
  const container = document.getElementById(containerId);
  data.forEach((item) => {
    const epsCount = item.episodes ? item.episodes.length : 1;
    const poster = item.poster || "";
    const link = document.createElement("a");
    link.href = `player.html?slug=${encodeURIComponent(item.slug)}`;
    link.innerHTML = `
          <div class="list-anime">
            <img src="${poster}" alt="${item.title}">
            <p>${item.title}</p>
            <span class="eps">${epsCount}</span>
          </div>
        `;
    container.appendChild(link);
  });
}

const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");
const data = JSON.parse(localStorage.getItem("filmData")) || [];

const film = data.find((f) => f.slug === slug);
const judulEl = document.getElementById("judul");
const select = document.getElementById("playlist-select");
const video = document.querySelector("video");

if (!film) {
  judulEl.textContent = "Film tidak ditemukan.";
} else {
  document.title = film.title;
  judulEl.textContent = film.title;

  video.setAttribute("poster", film.image || film.poster || "");

  if (Array.isArray(film.episodes)) {
    film.episodes.forEach((ep) => {
      const option = document.createElement("option");
      option.value = ep.url;
      option.textContent = ep.label;
      select.appendChild(option);
    });
  } else {
    const option = document.createElement("option");
    option.value = film.url;
    option.textContent = "Full Movie";
    select.appendChild(option);
  }
}

const player = Plyr.setup(".js-player", {
  controls: [
    "play-large",
    "rewind",
    "play",
    "fast-forward",
    "progress",
    "current-time",
    "duration",
    "mute",
    "volume",
    "fullscreen",
  ],
})[0];

select.addEventListener("change", (e) => {
  player.source = {
    type: "video",
    sources: [{ src: e.target.value, type: "video/mp4" }],
  };
});

function skip(seconds) {
  player.currentTime = Math.max(0, player.currentTime + seconds);
}

document.getElementById("rewind-30").onclick = () => skip(-30);
document.getElementById("rewind-3").onclick = () => skip(-180);
document.getElementById("rewind-5").onclick = () => skip(-300);
document.getElementById("rewind-10").onclick = () => skip(-600);
document.getElementById("forward-30").onclick = () => skip(30);
document.getElementById("forward-3").onclick = () => skip(180);
document.getElementById("forward-5").onclick = () => skip(300);
document.getElementById("forward-10").onclick = () => skip(600);
