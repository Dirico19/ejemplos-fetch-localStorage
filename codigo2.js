const boton = document.querySelector("button");
const nombre = document.querySelector(".nombre");
const imagen = document.querySelector(".imagen");
const tecnicas = document.querySelectorAll(".tecnicas li");
const mostrarPokemon = async () => {
    console.time();
    try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0");
        const data = await res.json();
        const res2 = await fetch(data.results[aleatorio()].url);
        const pokemon = await res2.json();
        nombre.textContent = pokemon.name;
        imagen.src = pokemon.sprites.front_default;
        for (const tecnica of tecnicas) {
            let movimiento = "";
            if (pokemon.moves.length !== 0)
                movimiento = pokemon.moves[aleatorio(0, pokemon.moves.length - 1)].move.name;
            else movimiento = "none";
            tecnica.textContent = movimiento;
        }
        console.timeEnd();
    } catch (error) {
        alert("LA API FALLÓ")
    }
}
const aleatorio = (min = 0, max = 1117) => Math.floor((Math.random() * (max - min + 1)) + min);
boton.addEventListener("click", mostrarPokemon);