//Requires database
let database = require("./database/database.js")

let moves = [
	{
		name:"Acrobatics",
		type: 9,
		power: 55,
		accuracy: 100,
		description:"Doubles the power if the user has no held items"
	},
	{
		name:"High Jump Kick",
		type: 8,
		power: 55,
		accuracy: 90,
		description:"Doubles the power if the user has no held items"
	},
	{
		name:"Sword Dance",
		type: 1,
		power: null,
		accuracy: null,
		description:"Raises attack by 2 stages"
	},
	{
		name:"Roost",
		type: 9,
		power: null,
		accuracy: null,
		description:"Restores 50% hp and the pokemon loses its flying typing"
	},
	{
		name:"Dragon Dance",
		type: 3,
		power: null,
		accuracy: null,
		description:"Raises attack and speed by 1 stage"
	},
	{
		name:"Waterfall",
		type: 5,
		power: 80,
		accuracy: 100,
		description:"Has a 20% chancec to flinch the opponent"
	},
	{
		name:"Bounce",
		type: 9,
		power: 85,
		accuracy: 85,
		description:"Has a 30% chance to paralyze the opponent. User is invulnerable to most attacks for 1 turn and then strikes the next"
	},
	{
		name:"Earthquake",
		type: 11,
		power: 100,
		accuracy: 100,
		description:"Doubles damage if the opponent uses dig"
	},
	{
		name:"Close Combat",
		type: 8,
		power: 120,
		accuracy: 100,
		description:"Lowers the user's defense and special defence by 1 stage"
	},
	{
		name:"Crunch",
		type: 17,
		power: 80,
		accuracy: 100,
		description:"Has a 20% chance to lower opponent's defencec by 1 stage"
	},
	{
		name:"Snarl",
		type: 17,
		power: 55,
		accuracy: 95,
		description:"Lowers the opponent's special attack by 1 stage"
	},
	{
		name:"Thunder Fang",
		type: 6,
		power: 65,
		accuracy: 95,
		description:"Has a 10% chance to flinch and a 10% chance to paralyze the opponent"
	},
	{
		name:"Play Rough",
		type: 7,
		power: 90,
		accuracy: 90,
		description:"Has a 10% chance to lower the opponent's attack by 1 stage"
	},
	{
		name:"Strength Sap",
		type: 2,
		power: null,
		accuracy: 100,
		description:"User heals base off of the opponent's attack stat and then lowers it by 1 stage"
	},
	{
		name:"Calm Mind",
		type: 18,
		power: null,
		accuracy: null,
		description:"Raises the user's special attack and special defence by 1 stage"
	},
	{
		name:"Shadow Ball",
		type: 14,
		power: 80,
		accuracy: 100,
		description:"Has a 20% chance to lower the opponent's special defence stat by 1 stage"
	},
]

//queries for intializing seeds
let clearTable = "DELETE FROM moves"
let insertSeed = "INSERT INTO moves VALUES (?, ?, ?, ?, ?)"

//Adds seed to database
database.run(clearTable, (error) => {
	if (error) console.log(new Error("Could not clear table"), error)
	else {
		moves.forEach((move) => {
			database.run(insertSeed, [move.name, move.type, move.power, move.accuracy, move.description], (error) => {
				if (error) console.log(new Error("Could not add seed abilities", error))
				else console.log(move.name + " has been added successfuly")
			})
		})
	}
})