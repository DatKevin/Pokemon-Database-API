//Requires database
let database = require("./database/database.js")

let pokemonmoves = [
	{
		pokemonID: 1,
		moveID: 13,
	},
	{
		pokemonID: 1,
		moveID: 11,
	},
	{
		pokemonID: 1,
		moveID: 12,
	},
	{
		pokemonID: 1,
		moveID: 4,
	},
	{
		pokemonID: 2,
		moveID: 7,
	},
	{
		pokemonID: 2,
		moveID: 9,
	},
	{
		pokemonID: 2,
		moveID: 8,
	},
	{
		pokemonID: 2,
		moveID: 6,
	},
	{
		pokemonID: 3,
		moveID: 7,
	},
	{
		pokemonID: 3,
		moveID: 8,
	},
	{
		pokemonID: 3,
		moveID: 10,
	},
	{
		pokemonID: 3,
		moveID: 9,
	},
	{
		pokemonID: 4,
		moveID: 2,
	},
	{
		pokemonID: 4,
		moveID: 5,
	},
	{
		pokemonID: 4,
		moveID: 15,
	},
	{
		pokemonID: 4,
		moveID: 4,
	},
	{
		pokemonID: 5,
		moveID: 1,
	},
	{
		pokemonID: 5,
		moveID: 3,
	},
	{
		pokemonID: 5,
		moveID: 6,
	},
	{
		pokemonID: 5,
		moveID: 16,
	},
]

//queries for intializing seeds
let clearTable = "DELETE FROM pokemonmoves"
let insertSeed = "INSERT INTO pokemonmoves VALUES (?, ?)"

//Adds seed to database
database.run(clearTable, (error) => {
	if (error) console.log(new Error("Could not clear table"), error)
	else {
		pokemonmoves.forEach((move) => {
			database.run(insertSeed, [move.pokemonID, move.moveID], (error) => {
				if (error) console.log(new Error("Could not add seed abilities", error))
				else console.log(move.pokemonID + " has been added successfully")
			})
		})
	}
})