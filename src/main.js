import { getPopularMovies } from "./API";
import { generateCard } from "./template";
import { getPopularshows } from "./API";
import { getSearchMovies } from "./API";
import { getSearchshows } from "./API";
import { getDetails } from "./API";
import { generateCastcard, genreCard } from "./template";

const loading = document.querySelector(".spinner");
const searchIcon = document.querySelector("#searchIcon");
const Image = document.querySelector(".img1");
const search = document.querySelector(".search");
const section1 = document.querySelector(".section1");
const section2 = document.querySelector(".section2");
const container2 = document.querySelector(".container2");
const searchData = document.querySelector("#Sd");
const popularShows = document.querySelector("#popularShows");
const popularMovies = document.querySelector("#popularMovies");
const title = document.querySelector("#title");
const country = document.querySelector("#country");
const image = document.querySelector("body");
const time = document.querySelector("#runtime");
const castContainer = document.querySelector(".cast");
const genreContainer = document.querySelector(".genre");
const overviewText = document.querySelector("#text");
const back = document.querySelector("#back");
async function loadHomepageMovies() {
  const { data: movies, success, error } = await getPopularMovies();
  if (!success) {
    return;
  }
  movies.forEach((movie) => {
    const card = generateCard(movie.title, movie.poster, movie.movie_id);
    section1.appendChild(card);
  });
}

async function loadHomepageShows() {
  const { data: shows, success, error } = await getPopularshows();
  if (!success) {
    return;
  }
  shows.forEach((show) => {
    const card = generateCard(show.title, show.poster, undefined, show.show_id);
    section2.appendChild(card);
  });
}

async function relatedMovies(query) {
  const { data: movies, success, error } = await getSearchMovies(query);
  if (!success) {
    popularMovies.innerHTML = `No Related Movies found!`;
    section1.style.display = "none";

    return;
  }
  movies.forEach((movie) => {
    const card = generateCard(movie.title, movie.poster, movie.movie_id);
    section1.appendChild(card);
  });
}
async function relatedShows(query) {
  const { data: shows, success, error } = await getSearchshows(query);
  if (!success) {
    popularShows.innerHTML = `No Related Shows found!`;
    section2.style.display = "none";

    return;
  }
  shows.forEach((show) => {
    const card = generateCard(show.title, show.poster, undefined, show.show_id);
    section2.appendChild(card);
  });
}
async function getdetails(id) {
  const { data: details, success, error } = await getDetails(id);
  if (!success) {
    loading.style.display = "none";
    document.querySelector(
      ".backdrop"
    ).style.backgroundImage = `url("https://images.unsplash.com/photo-1580757468214-c73f7062a5cb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8MTYlM0E5fGVufDB8fDB8fHww")`;
    document.querySelector(".hero").style.display = "flex";
    document.querySelector("#o").style.display = "none";
    document.querySelector("#poster").style.display = "none";
    title.innerHTML = "Error.Please try again ";
    return;
  }
  document.querySelector(".hero").style.display = "flex";
  document.querySelector(".main").style.display = "flex";
  console.log(details);
  title.innerHTML = details.title;
  console.log(title);
  country.innerHTML = details.country;
  document.getElementById("poster").src = details.image;
  document.querySelector(
    ".backdrop"
  ).style.backgroundImage = `url("${details.image}")`;
  console.log(details);

  overviewText.innerHTML = details.overview;
  if (details.runtimeHrs === 0) {
    time.innerHTML = details.runtimeMin;
  } else {
    time.innerHTML =
      details.runtimeHrs + " hours:" + details.runtimeMin + " min";
  }
  details.cast.forEach((castMemeber) => {
    const castCard = generateCastcard(castMemeber.name, castMemeber.image);
    castContainer.appendChild(castCard);
  });
  details.genres.forEach((genre) => {
    const GenreCard = genreCard(genre);
    genreContainer.appendChild(GenreCard);
  });
}
window.addEventListener("DOMContentLoaded", async function () {
  const page = window.location.pathname;
  if (page === "/") {
    loading.style.display = "block";
    searchIcon.addEventListener("click", function () {
      window.location.href = `/search.html?q=${search.value}`;
    });

    await loadHomepageMovies();
    await loadHomepageShows();
    popularShows.style.display = "block";
    popularMovies.style.display = "block";
    loading.style.display = "none";
  } else if (page === "/search.html") {
    searchIcon.addEventListener("click", function () {
      window.location.href = `/search.html?q=${search.value}`;
    });

    searchData.style.display = "none";
    container2.style.display = "none";
    const query = window?.location?.search?.substring(1)?.split("=")?.[1];
    search.value = query;
    if (query) {
      loading.style.display = "block";
      container2.style.display = "block";
      await relatedMovies(query);
      await relatedShows(query);
      popularShows.style.display = "block";
      popularMovies.style.display = "block";
      loading.style.display = "none";
    } else {
      container2.style.display = "none";
      searchData.style.display = "block";
    }
  } else if (page === "/details.html") {
    back.addEventListener("click", function () {
      window.location.href = "/";
    });
    const id = window?.location?.search?.substring(1)?.split("=")?.[1];
    loading.style.display = "block";
    await getdetails(id);
    loading.style.display = "none";
  }
});
