//Required modules
let sqlite3 = require("sqlite3")

//Create Database
let database = new sqlite3.Database("./database.db")

//Query statements for table creation
let createPokemonTable = "CREATE TABLE IF NOT EXISTS pokemon (name TEXT, ability INTEGER, hp INTEGER, atk INTEGER, def INTEGER, spatk INTEGER, spdef INTEGER, spd INTEGER, total INTEGER)"
let createTypeTable = "CREATE TABLE IF NOT EXISTS types (name TEXT)"
let createAbilityTable = "CREATE TABLE IF NOT EXISTS ability (name TEXT, effect TEXT)"
let createMovesTable = "CREATE TABLE IF NOT EXISTS moves (name TEXT, type INTEGER, power INTEGER, accuracy INTEGER, description TEXT)"
let createPokemonMovesTable = "CREATE TABLE IF NOT EXISTS pokemonmoves (pokemonID INTEGER, moveID INTEGER)"
let createPokemonTypesTable = "CREATE TABLE IF NOT EXISTS pokemontypes (pokemonID INTEGER, typeID INTEGER)"

//Running table
database.run(createPokemonTable, (error) => {
	if (error) console.error(new Error("Pokemon table fail"), error)
	else console.log("Pokemon table success")
})

database.run(createTypeTable, (error) => {
	if (error) console.error(new Error("Type table fail"), error)
	else console.log("Type table success")
})

database.run(createAbilityTable, (error) => {
	if (error) console.error(new Error("Ability table fail"), error)
	else console.log("Ability table success")
})

database.run(createMovesTable, (error) => {
	if (error) console.error(new Error("Moves table fail"), error)
	else console.log("Moves table success")
})

database.run(createPokemonMovesTable, (error) => {
	if (error) console.error(new Error("Pokemon Moves table fail"), error)
	else console.log("Pokemon Moves table success")
})

database.run(createPokemonTypesTable, (error) => {
	if (error) console.error(new Error("Pokemon Types table fail"), error)
	else console.log("Pokemon Types table success")
})

module.exports = database