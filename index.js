const KEY = 'c527e62349cb8cb7e8d047a1eb3519de';
const firstActor = document.querySelector('.first_actor');
const secondActor = document.querySelector('.second_actor');
const thirdActor = document.querySelector('.third_actor');
const results = document.querySelector('.results');

const idkwhocares = {
  firstActorSelected: false,
  secondActorSelected: false,
  thirdActorSelected: false,
  movieArr: [],
};

const getActorData = async actorID => {
  const response = await fetch(
    `https://api.themoviedb.org/3/person/${actorID}/movie_credits?api_key=${KEY}&language=en-US`
  );
  const resData = await response.json();
  return resData.cast; // NOTE returning "resData.cast" because we need to dig into the cast array to get the info we need
};

function renderMatchedMovies(matchedMovies) {
  matchedMovies.forEach(el => {
    const moviePoster = document.createElement('span');
    moviePoster.innerHTML = `
    <p>${el.title}</p>
    <img src=https://image.tmdb.org/t/p/original/${el.poster_path} height="400px" width="300px">
    `;
    results.appendChild(moviePoster);
  });
}

async function addMovies(selectedActor) {
  const movieData = await getActorData(selectedActor);
  return idkwhocares.movieArr.push(movieData);
}

function compareMovies({
  firstActorSelected,
  secondActorSelected,
  thirdActorSelected,
  movieArr,
} = idkwhocares) {
  if (firstActorSelected && secondActorSelected && thirdActorSelected) {
    results.innerHTML = `<div></div>`;

    /** STUB Try implementing a solution that uses regex to
     * check for duplicate strings on the title propery of
     * the movie object and push that element to a new array
     * https://stackoverflow.com/questions/43101589/check-if-any-duplicate-words-exist-in-a-string-using-regex/43101695
     * https://medium.com/@caymanbruce/finding-duplicate-characters-in-a-string-in-javascript-94e2cb23ab5e
     * https://stackoverflow.com/questions/28685513/javascript-regex-to-match-comma-delimited-duplicate-strings
     */

    /**
      TODO reset movieArr[i] to the new actors films on change
      NOTE Maybe we can give each dropdown an uniqueID and then
      use that to reset the specific array that was changed
    */
    let finalArray = [];
    if (finalArray !== []) {
      finalArray = [];
    }
    for (let i = 0; i <= movieArr.length; i++) {
      if (movieArr[i + 1]) {
        const currentArray = movieArr[i];
        const nextArray = movieArr[i + 1];
        currentArray.forEach(e1 =>
          nextArray.forEach(e2 => {
            if (e1.title === e2.title) {
              finalArray.push(e1);
            }
          })
        );
      }
    }
    console.log(finalArray);
    renderMatchedMovies(finalArray);
  }
}

firstActor.addEventListener('change', async () => {
  addMovies(firstActor.value);
  idkwhocares.firstActorSelected = true;
  compareMovies(idkwhocares);
});

secondActor.addEventListener('change', async () => {
  addMovies(secondActor.value);
  idkwhocares.secondActorSelected = true;
  compareMovies(idkwhocares);
});

thirdActor.addEventListener('change', async () => {
  addMovies(thirdActor.value);
  idkwhocares.thirdActorSelected = true;
  compareMovies(idkwhocares);
});
