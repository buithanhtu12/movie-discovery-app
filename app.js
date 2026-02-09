const movies = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    genres: ["Hành động", "Khoa học viễn tưởng"],
    poster: "images/inception.jpg",
    description: "Một bộ phim về giấc mơ trong giấc mơ."
  },
  {
    id: 2,
    title: "Interstellar",
    year: 2014,
    genres: ["Khoa học viễn tưởng", "Phiêu lưu"],
    poster: "images/interstellar.jpg",
    description: "Hành trình xuyên không gian cứu nhân loại."
  },
  {
    id: 3,
    title: "Avatar",
    year: 2009,
    genres: ["Phiêu lưu", "Hành động"],
    poster: "images/avatar.jpg",
    description: "Thế giới Pandora đầy kỳ ảo."
  }
];

const movieList = document.getElementById("movieList");
const genreFilters = document.getElementById("genreFilters");
const searchInput = document.getElementById("searchInput");

/* ===== Render Movies ===== */
function renderMovies(list) {
  movieList.innerHTML = "";
  list.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
      <img src="${movie.poster}">
      <h4>${movie.title}</h4>
      <p>${movie.year}</p>
    `;
    card.onclick = () => openModal(movie);
    movieList.appendChild(card);
  });
}

/* ===== Genre Filters ===== */
const genres = [...new Set(movies.flatMap(m => m.genres))];

genres.forEach(g => {
  const label = document.createElement("label");
  label.innerHTML = `
    <input type="checkbox" value="${g}"> ${g}
  `;
  genreFilters.appendChild(label);
});

/* ===== Filter Logic (Integrated) ===== */
function filterMovies() {
  const keyword = searchInput.value.toLowerCase();
  const checkedGenres = [...genreFilters.querySelectorAll("input:checked")]
    .map(i => i.value);

  const filtered = movies.filter(movie => {
    const matchTitle = movie.title.toLowerCase().includes(keyword);
    const matchGenre =
      checkedGenres.length === 0 ||
      checkedGenres.some(g => movie.genres.includes(g));
    return matchTitle && matchGenre;
  });

  renderMovies(filtered);
}

/* ===== Debounce ===== */
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

searchInput.addEventListener("input", debounce(filterMovies, 400));
genreFilters.addEventListener("change", filterMovies);

/* ===== Modal ===== */
const modal = document.getElementById("movieModal");
const closeBtn = document.querySelector(".close");

function openModal(movie) {
  modal.classList.remove("hidden");
  modalPoster.src = movie.poster;
  modalTitle.textContent = movie.title;
  modalYear.textContent = movie.year;
  modalDescription.textContent = movie.description;
}

closeBtn.onclick = () => modal.classList.add("hidden");

/* ===== Dark Mode ===== */
const toggle = document.getElementById("themeToggle");
toggle.onclick = () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme",
    document.body.classList.contains("dark-mode") ? "dark" : "light"
  );
};

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

/* Init */
renderMovies(movies);
 
