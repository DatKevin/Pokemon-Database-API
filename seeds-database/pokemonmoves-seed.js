//Requires database
let database = require("./database/database.js")

let pokemonmoves = [
	{
		pokemonID: 1,
		moveID: 9,
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