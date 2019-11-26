//Requires database
let database = require("./database.js")

let types = [
	{
		name:"Normal"
	},
	{
		name:"Fire"
	},
	{
		name:"Water"
	},
	{
		name:"Grass"
	},
	{
		name:"Electric"
	},
	{
		name:"Psychic"
	},
	{
		name:"Ice"
	},
	{
		name:"Dragon"
	},
	{
		name:"Dark"
	},
	{
		name:"Fairy"
	},
	{
		name:"Fighting"
	},
	{
		name:"Flying"
	},
	{
		name:"Poison"
	},
	{
		name:"Ground"
	},
	{
		name:"Rock"
	},
	{
		name:"Bug"
	},
	{
		name:"Ghost"
	},
	{
		name:"Steel"
	},
]

//queries for intializing seeds
let clearTable = "DELETE FROM types"
let insertSeed = "INSERT INTO types VALUES (?)"

//Adds seed to database
database.run(clearTable, (error) => {
	if (error) console.log(new Error("Could not clear table"), error)
	else {
		types.forEach((type) => {
			database.run(insertSeed, [type.name], (error) => {
				if (error) console.log(new Error("Could not add seed types", error))
				else console.log(type.name + " has been added succesffuly")
			})
		})
	}
})