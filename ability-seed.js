//Requires database
let database = require("./database.js")

let ability = [
	{
		name:"Strong Jaw",
		effect:"Increase the power of bite moves by 50%"
	},
	{
		name:"Unburden",
		effect:"Doubles the pokemon speed when losing/using the held item"
	},
	{
		name:"Intimidate",
		effect:"Lowers opposing pokemon's attack by 1 stage when entering battle"
	},
	{
		name:"Cursed Body",
		effect:"When hit with a damaging move, has a 30% chance to disable that move"
	},
	
]

//queries for intializing seeds
let clearTable = "DELETE FROM ability"
let insertSeed = "INSERT INTO ability VALUES (?, ?)"

//Adds seed to database
database.run(clearTable, (error) => {
	if (error) console.log(new Error("Could not clear table"), error)
	else {
		ability.forEach((ability) => {
			database.run(insertSeed, [ability.name, ability.effect], (error) => {
				if (error) console.log(new Error("Could not add seed abilities", error))
				else console.log(ability.name + " has been added succesffuly")
			})
		})
	}
})