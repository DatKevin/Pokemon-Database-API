//Requires database
let database = require("./database.js")

let pokemontypes = [
	{
		pokemonID: 1,
		typeID: 14,
	},
	{
		pokemonID: 2,
		typeID: 4,
	},
	{
		pokemonID: 3,
		typeID: 6,
	},
	{
		pokemonID: 4,
		typeID: 5,
	},
	{
		pokemonID: 4,
		typeID: 9,
	},
	{
		pokemonID: 5,
		typeID: 8,
	},
	{
		pokemonID: 5,
		typeID: 9,
	},
]

//queries for intializing seeds
let clearTable = "DELETE FROM pokemontypes"
let insertSeed = "INSERT INTO pokemontypes VALUES (?, ?)"

//Adds seed to database
database.run(clearTable, (error) => {
	if (error) console.log(new Error("Could not clear table"), error)
	else {
		pokemontypes.forEach((poketype) => {
			database.run(insertSeed, [poketype.pokemonID, poketype.typeID], (error) => {
				if (error) console.log(new Error("Could not add seed abilities", error))
				else console.log(poketype.pokemonID + " has been added successfully")
			})
		})
	}
})