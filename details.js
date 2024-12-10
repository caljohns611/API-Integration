const urlParams = new URLSearchParams(window.location.search);
let pokemonId = urlParams.get("id");
let pokemonName = urlParams.get("name");

function fetchPokemonDetails(pokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(response => response.json())
        .then(data => {
            const pokemonDetails = document.getElementById("pokemonDetails");
            pokemonDetails.innerHTML = `
                <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
                <img src="${data.sprites.front_default}" alt="${data.name}" class="img-fluid mb-3" />
                <p><strong>Types:</strong> ${data.types.map(type => type.type.name).join(", ")}</p>
                <p><strong>Abilities:</strong> ${data.abilities.map(ability => ability.ability.name).join(", ")}</p>
                <h3>Stats:</h3>
                <ul>
                    ${data.stats.map(stat => `
                        <li><strong>${stat.stat.name}:</strong> ${stat.base_stat}</li>
                    `).join("")}
                </ul>
            `;
        })
        .catch(error => {
            console.error("Error fetching Pokémon data:", error);
            alert("pokemon not found!");
        });
}

if (pokemonId || pokemonName) {
    fetchPokemonDetails(pokemonId || pokemonName);
} else {
    document.getElementById("pokemonDetails").innerHTML = `
        <h2>Please provide a pokemon name or ID in the URL to see details.</h2>
    `;
}

document.getElementById("searchBtn").addEventListener("click", function() {
    const searchInput = document.getElementById("searchInput").value.trim().toLowerCase();
    if (!searchInput) {
        alert("Please enter a pokemon name or ID.");
        return;
    }
    window.location.href = `?name=${searchInput}`;
});
