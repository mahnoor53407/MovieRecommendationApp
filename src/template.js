export function generateCard(name, posterLink, movieID, showID) {
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img");
  imgContainer.innerHTML = `  <img
              class="img1"
              
              src="${
                posterLink || "https://placehold.co/150x250?text=No%20Image"
              }"
              alt="random"
            />
            <p id="movieName">${name}</p>`;

  imgContainer.addEventListener("click", function () {
    console.log(movieID, showID);
    if (movieID) {
      window.location.href = "/details.html?movieID=" + movieID;
    } else if (showID) {
      window.location.href = "/details.html?showID=" + showID;
    }
  });
  return imgContainer;
}

export function generateCastcard(name, image) {
  const castContainer = document.createElement("div");
  castContainer.classList.add("castImg");
  castContainer.innerHTML = ` 
            <img
              src="${image || "https://placehold.co/200x200?text=No%20Image"}"
              alt="no image"
            />
            <p>${name}</p>`;
  return castContainer;
}
export function genreCard(genre) {
  const genreText = document.createElement("p");
  genreText.classList.add("type");
  genreText.innerText = genre;
  return genreText;
}
