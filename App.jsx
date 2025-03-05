import axios from "axios";
import './App.css'

function App() {
  // reload page
  const resetPage = () => {
    // alert("Reload function called");
    setTimeout(() => {
      location.reload();
    }, 500);
  };

  // assign imgURL to img.src and append to container
  const generateImg = (imgUrl) => {
    let img = document.createElement("img");
    // assigns img src attribute the imgURL parameter
    img.src = imgUrl;
    // appends image to image container
    document.getElementById("container").appendChild(img);
  };

  // call event upon form submit
  const getPokemons = (evt) => {
    evt.preventDefault();
    randomPokemons(); // Fetch a random Pokémon instead of taking user input
  };

  const randomPokemons = async () => {
    try {
      // takes in random ID from all available pokemon at:
      // https://pokeapi.co/docs/v2#pokemon-species count=1025
      let randomId = Math.floor(Math.random() * 1025) + 1; // Pokémon IDs range from 1 to 1025
      let requestUrl = `https://pokeapi.co/api/v2/pokemon/${randomId}`;
      let { data } = await axios.get(requestUrl)
      // console.log(data)
      // get imageURL from fetched data
      let imgUrl = data.sprites.front_default;
      generateImg(imgUrl);
  
      // finds same data type as the randomly pulled up pokemon, calls 
      // function pulling up 5 more random pokemons of same type
      let sameType = data.types[0].type.name
      console.log(sameType)
      randomSameTypePokemons(sameType)
    } catch (err) {
      console.log(err.message);
      alert("improper input");
    }
  };

  const randomSameTypePokemons = async (type) => {
    try {
      // utlized types api in docs, otherwise
      // mostly used same code as previous function
      let requestUrl = `https://pokeapi.co/api/v2/type/${type}`;
      let { data } = await axios.get(requestUrl)
      
      // generate list of all pokemon names of same type
      let pokemonNames = data.pokemon.map(i => i.pokemon.name);
      // console.log(pokemonNames)
      // randomly shuffle pokemonNames and grab first 5 names
      let fiveShuffledNames = pokemonNames.sort(() => 0.5 - Math.random()).slice(0, 5); 
  
      // appends 5 random images of same time to container
      fiveShuffledNames.map(async (name) => {
        const requestUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
        let { data } = await axios.get(requestUrl)
         // get imageURL from fetched data
        const imgUrl = data.sprites.front_default;
        generateImg(imgUrl); // call the function to handle the image URL
      })
      
    } catch (err) {
      console.log(err.message);
      alert("improper input");
    }
  };

  return (
    <>
      <header>
        <h1>Pokemon</h1>
      </header>
      {/* 
      if you are passing an argument to a function you 
      must do it through an arrow function 
      */}
      <main>
        <div id="container"></div>
        <form onSubmit={(e) => getPokemons(e)}>
          <input type="submit" value="randomPokemons"/>
        </form><br></br>
        <button onClick={resetPage}>Reload Page</button><br></br>
      </main>
    </>
  );
}

export default App
