const KEY = 'c527e62349cb8cb7e8d047a1eb3519de';
const actorInput = document.querySelectorAll('.actor-input');
const createInput = document.querySelector('.create-input');
const inputs = document.querySelector('.inputs');
const results = document.querySelector('.results');

const idk = [];

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
  compareMovies(movieData);
  return actorsMoviesArr.push(...movieData); // NOTE THIS IS THE PROBLEM PUSHS NEW ARRAY EVERY TIME
}

function compareMovies(movieArr) {
  // console.log(movieArr);
  let array1 = ['a', 'b', 'c', 'd', 'e'];
  const array2 = ['b', 'd', 'f'];

  array1 = array1.filter(function(item) {
    return !array2.includes(item);
  });

  // console.log('tempArr', tempArr);
  console.log('array1', array1); // [ 'a', 'c', 'e' ]
  console.log('tempArr', array2);
}

function compareMovies(movieArr) {
  results.innerHTML = `<div></div>`;
  console.log(idk);
  array1 = array1.filter(val => !array2.includes(val));
      var x = ['IdA', 'idB', 'IdC', 'IdD', 'IdE'];
  var y = ['idB', 'IdE', 'IdF'];

  var z = x.filter(function(val) {
    return y.indexOf(val) != -1;
  });
  console.log(z);
  const finalArray = movieArr.map((e1, i) => {
    console.log(e1);
    [e1[i + 1]].map(e2 => {
      if (e1.title === e2.title) {
        return e1;
      }
    });
  });
  console.log(finalArray);
  renderMatchedMovies(finalArray);

  const finalArray = [];
  for (let i = 0; i <= movieArr.length; i++) {
    if (!movieArr[i + 1]) {
      const currentArray = movieArr[i];
      const nextArray = movieArr[i + 1];
      currentArray.forEach(e1 =>
        nextArray.forEach(e2 => {
          if (e1.title === e2.title) {
            finalArray.push(e1);
          }
        })
      );
      console.log(finalArray);
      renderMatchedMovies(finalArray);
    } else {
      renderMatchedMovies(movieArr);
    }
  }
}

createInput.addEventListener('click', () => {
  const newInput = document.createElement('select');
  newInput.classList.add('actor-input');
  newInput.innerHTML = `
    <option>Please Select an Actor</option>
    <option value="9030">Thandie Newton</option>
  `;
  inputs.appendChild(newInput);
});

actorInput.forEach(el => {
  el.addEventListener('change', async () => {
    if (el.value !== 'Please Select an Actor') {
      addMovies(el.value);
      idk[el.value] = await getActorData(el.value);
    }
    compareMovies(actorsMoviesArr);
  });
});
