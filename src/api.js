export async function getPopularMovies() {
  const url =
    "https://imdb232.p.rapidapi.com/api/title/get-most-popular?limit=20&topMeterTitlesType=MOVIE";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": import.meta.env.VITE_RAPIDAPIKEY,
      "x-rapidapi-host": "imdb232.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    const movies = result?.data?.topMeterTitles?.edges.map((edge) => {
      const movie_id = edge?.node?.id;
      const title = edge?.node?.originalTitleText?.text;
      const poster = edge?.node?.primaryImage?.url;

      return {
        movie_id,
        title,
        poster,
      };
    });
    if (movies.length === 0) {
      return {
        success: false,
        error: "Array length is invalid ",
        data: null,
      };
    } else {
      return {
        success: true,
        error: null,
        data: movies,
      };
    }
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: "Couldn't generate movies .reload it ",
      data: null,
    };
  }
}

export async function getPopularshows() {
  const url =
    "https://imdb232.p.rapidapi.com/api/title/get-most-popular?limit=20&topMeterTitlesType=TV";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": import.meta.env.VITE_RAPIDAPIKEY,
      "x-rapidapi-host": "imdb232.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    const shows = result?.data?.topMeterTitles?.edges.map((edge) => {
      const show_id = edge?.node?.id;
      const title = edge?.node?.originalTitleText?.text;
      const poster = edge?.node?.primaryImage?.url;

      return {
        show_id,
        title,
        poster,
      };
    });
    if (shows.length === 0) {
      return {
        success: false,
        error: "Array length is invalid ",
        data: null,
      };
    } else {
      return {
        success: true,
        error: null,
        data: shows,
      };
    }
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: "Couldn't generate shows .reload it ",
      data: null,
    };
  }
}

export async function getSearchMovies(query) {
  const url = `https://imdb232.p.rapidapi.com/api/search?count=20&type=MOVIE&q=${query}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": import.meta.env.VITE_RAPIDAPIKEY,
      "x-rapidapi-host": "imdb232.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    const movies = result?.data?.mainSearch?.edges.map((edge) => {
      const movie_id = edge?.node?.entity?.id;
      const title = edge?.node?.entity?.originalTitleText?.text;
      const poster = edge?.node?.entity?.primaryImage?.url;

      return {
        movie_id,
        title,
        poster,
      };
    });
    console.log(movies);
    if (!movies || movies?.length === 0) {
      return {
        success: false,
        error: "No movies found",
        data: null,
      };
    } else {
      return {
        success: true,
        error: null,
        data: movies,
      };
    }
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: "Couldn't generate movies .reload it ",
      data: null,
    };
  }
}
export async function getSearchshows(query) {
  const url = `https://imdb232.p.rapidapi.com/api/search?count=20&type=TV&q=${query}`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": import.meta.env.VITE_RAPIDAPIKEY,
      "x-rapidapi-host": "imdb232.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    const shows = result?.data?.mainSearch?.edges.map((edge) => {
      const show_id = edge?.node?.entity?.id;
      const title = edge?.node?.entity?.originalTitleText?.text;
      const poster = edge?.node?.entity?.primaryImage?.url;

      return {
        show_id,
        title,
        poster,
      };
    });
    if (!shows || shows.length === 0) {
      return {
        success: false,
        error: "No shows found ",
        data: null,
      };
    } else {
      return {
        success: true,
        error: null,
        data: shows,
      };
    }
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: "Couldn't generate shows .reload it ",
      data: null,
    };
  }
}

export async function getDetails(id) {
  const url = `https://imdb232.p.rapidapi.com/api/title/get-details?tt=${id}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": import.meta.env.VITE_RAPIDAPIKEY,
      "x-rapidapi-host": "imdb232.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const title = result?.data?.title?.originalTitleText?.text;
    const image = result?.data?.title?.primaryImage?.url;
    const country =
      result?.data?.title?.countriesOfOrigin?.countries?.[0]?.text;
    const runtimeSec = result?.data?.title?.runtime?.seconds;
    const runtimeHrs = Math.floor(runtimeSec / 3600);
    const runtimeMin = Math.floor(runtimeSec / 60);

    const [overviewResult, genreResult, castResult] = await Promise.all([
      getOverview(id),
      getGenre(id),
      getCast(id),
    ]);

    if (
      !title ||
      !image ||
      !country ||
      !runtimeMin ||
      !runtimeHrs ||
      !overviewResult.success ||
      !genreResult.success ||
      !castResult.success
    ) {
      return {
        success: false,
        error: "No data found",
        data: null,
      };
    }

    return {
      success: true,
      error: null,
      data: {
        title,
        image,
        country,
        runtimeMin,
        runtimeHrs,
        overview: overviewResult.data,
        genres: genreResult.data,
        cast: castResult.data,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: "Couldn't generate data .reload it ",
      data: null,
    };
  }
}

async function getOverview(id) {
  const url = `https://imdb232.p.rapidapi.com/api/title/get-plot?tt=${id}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": import.meta.env.VITE_RAPIDAPIKEY,
      "x-rapidapi-host": "imdb232.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const plot = result?.data?.title?.plot?.plotText?.plainText;
    console.log(plot, result);
    if (!plot) {
      return {
        success: false,
        error: "No overview found ",
        data: null,
      };
    } else {
      return {
        success: true,
        error: null,
        data: plot,
      };
    }
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: "Couldn't generate plot .reload it ",
      data: null,
    };
  }
}
async function getGenre(id) {
  const url = `https://imdb232.p.rapidapi.com/api/title/get-genres?tt=${id}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": import.meta.env.VITE_RAPIDAPIKEY,
      "x-rapidapi-host": "imdb232.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const genres = result?.data?.title?.titleGenres?.genres.map(
      (genre) => genre?.genre?.text
    );
    if (!genres || genres.length === 0) {
      return {
        success: false,
        error: "No genre found ",
        data: null,
      };
    } else {
      return {
        success: true,
        error: null,
        data: genres,
      };
    }
    console.log(genres);
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: "Couldn't generate genre .reload it ",
      data: null,
    };
  }
}
async function getCast(id) {
  const url = `https://imdb232.p.rapidapi.com/api/title/get-top-cast-crew?tt=${id}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": import.meta.env.VITE_RAPIDAPIKEY,
      "x-rapidapi-host": "imdb232.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const cast = result?.data?.title?.credits?.edges.map((edge) => {
      const name = edge?.node?.name?.nameText?.text;
      const image = edge?.node?.name?.primaryImage?.url;
      return {
        name,
        image,
      };
    });
    if (!cast || cast.length === 0) {
      return {
        success: false,
        error: "No cast found ",
        data: null,
      };
    } else {
      return {
        success: true,
        error: null,
        data: cast.filter((c) => c?.name),
      };
    }
    console.log(result);
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: "Couldn't generate cast  .reload it ",
      data: null,
    };
  }
}
