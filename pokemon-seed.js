//Requires database
let database = require("./database.js")

let intialPokemon = [
	{
		name: "Gyrados",
		ability: 3,
		hp: 95,
		atk: 125,
		def: 79,
		spatk: 60,
		spdef: 100,
		spd: 81,
		total: 540
	},
	{
		name: "Hawlucha",
		ability: 2,
		hp: 78,
		atk: 92,
		def: 75,
		spatk: 74,
		spdef: 63,
		spd: 118,
		total: 500
	},
	{
		name: "Boltund",
		ability: 1,
		hp: 69,
		atk: 90,
		def: 60,
		spatk: 90,
		spdef: 60,
		spd: 121,
		total: 490
	},
	{
		name: "Corsola",
		ability: 4,
		hp: 60,
		atk: 55,
		def: 100,
		spatk: 65,
		spdef: 100,
		spd: 30,
		total: 410
	},
	{
		name: "Arcanine",
		ability: 3,
		hp: 90,
		atk: 110,
		def: 80,
		spatk: 100,
		spdef: 80,
		spd: 95,
		total: 555
	},
]

//queries for intializing seeds
let clearTable = "DELETE FROM pokemon"
let insertSeed = "INSERT INTO pokemon VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"


//Adds seed to database
database.run(clearTable, (error) => {
	if (error) console.log(new Error("Could not clear table"), error)
	else {
		intialPokemon.forEach(function(pokemon) {
			database.run(insertSeed, [pokemon.name, pokemon.ability, pokemon.hp, pokemon.atk, pokemon.def, pokemon.spatk, pokemon.spdef, pokemon.spd, pokemon.total], (error) => {
				if (error) console.log(new Error("Could not add seed pokemon", error))
				else console.log(pokemon.name + " has been added succesffuly")
			})
		})
	}
})