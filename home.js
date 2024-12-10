document.getElementById("earchBtn").addEventListener("click", function() {
    const searchInput = document.getElementById("searchInput").value.trim().toLowerCase();
    if (!searchInput) {
        alert("Please enter a pokemon name or id");
        return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput}`)
    .then(response => response.json())
    .then(data => {
        const pokemonInfo = document.getElementById("pokemonInfo");
        pokemonInfo.innerHTML = `
            <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}" class="img-fluid mb-3" />
            <p><strong>Types:</strong> ${data.types.map(type => type.type.name).join(", ")}</p>
            <p><strong>Abilities:</strong> ${data.abilities.map(ability => ability.ability.name).join(", ")}</p>
            <p><strong>Height:</strong> ${data.height / 10} m</p>
            <p><strong>Weight:</strong> ${data.weight / 10} kg</p>`;
    })
    .catch(error => {
        alert("Pokemon not found")
    });

});