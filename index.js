//require modules
let express = require("express")
let database = require("./database.js")

//Runs app
let app = express()

//Port
let port = 9000

// Middleware
app.use(express.json())

//Routes
/////////////////////////////////////////////////
// Routes for Pokemon
/////////////////////////////////////////////////

//Gets all pokemon as well as thier types
app.get("/api/pokemon", (request, response) => {
	console.log("Getting all pokemon!!!!!!!!!!!!")
	let selectpokemon = "SELECT pokemon.name, group_concat(types.name) AS type, ability.name AS ability, pokemon.hp, pokemon.atk, pokemon.def, pokemon.spatk, pokemon.spdef, pokemon.spd, pokemon.total FROM pokemon JOIN ability ON pokemon.ability = ability.oid JOIN pokemontypes ON pokemontypes.pokemonID = pokemon.oid JOIN types ON types.oid = pokemontypes.typeID GROUP BY pokemon.name"
	database.all(selectpokemon, (error, results) => {
		if (error) {
			console.error(new Error("Error getting all pokemon :", error))
			response.send("Couldn't get all pokemon")
		}
		else response.send(results)
	})
})

//Get one Pokemon
app.get('/api/pokemon/:id',  (request, response) => {
  //Find a pokemon by OID
  	console.log('Find pokemon', request.params.id)
  	let selectpokemonbyID = "SELECT * FROM pokemon WHERE oid = ?"
  	database.get(selectpokemonbyID, [request.params.id], (error,results) => {
	    if (error) {
	    	console.error(new Error("Could not get single pokemon", error))
	    	response.send("Could not find pokemon with that ID")
	    }
	    else response.json(results)
	})
})

//Create new Pokemon
app.post('/api/pokemon',  (request, response) => {
	//Create new Pokemon with form data (`request.body`)
	console.log('Create pokemon: ', request.body)
	let body = request.body
	let createPokemon = "INSERT INTO pokemon VALUES (?,?,?,?,?,?,?,?,?)"
	database.run(createPokemon, [body.name, body.ability, body.hp, body.atk, body.def, body.spatk, body.spdef, body.spd, body.total], (error) => {
	    if (error) {
	    	console.error(new Error("Could not create pokemon", error))
	    	response.send("Could not create pokemon")
	    }
	    else {
	      console.log(request.body)
	      response.send("Pokemon added!")
	    }
	})
})


//Update Pokemon
app.put("/api/pokemon/:id", (request,response) => {
	console.log("Updating pokemon" + request.params.id)
	//Use the keys in request.body to create dynamic SET values for the query string
	let queryHelper = Object.keys(request.body).map(ele => `${ele} = ?`)
	//Use the dynamic SET values in from queryHelper to build full UPDATE string
	let updateOnePokemon = `UPDATE pokemon SET ${queryHelper.join(", ")} WHERE pokemon.oid = ?`;
	//Add values from request.body and the PokemonId to an array for use in database.run()
	let queryValues = [...Object.values(request.body), request.params.id]
	//Runs Query based on what was chosen for updates
	database.run(updateOnePokemon, queryValues, function (error) {
	    if (error) {
	 	    console.log(new Error("Could not update Pokemon"), error)
	     	response.send("Could not update pokemon")
	    } else {
	      	console.log(`Pokemon with ID ${request.params.id} was updated successfully`)
	     	response.send("Update Successful!")
	    }
	})
})

//Delete pokemon
app.delete("/api/pokemon/:id",  (request, response) => {
	console.log("pokemon delete ", request.params.id);
	let selectpokemonbyID = "DELETE FROM pokemon WHERE oid = ?"
	database.get(selectpokemonbyID, [request.params.id], (error) => {
	    if (error) {
	      	console.error(new Error("Could not delete pokemon", error))
	      	response.send("Could not delete pokemon")
	    }
	    else response.send("Pokemon removed!")
	})
})


/////////////////////////////////////////////////
// Routes for Pokemon Abilities
/////////////////////////////////////////////////

//Get all pokemon abilities
app.get("/api/abilities", (request, response) => {
	console.log("Getting all abilities")
	let getAllAbilities = "SELECT * FROM ability"
	database.all(getAllAbilities, (error, results) => {
		if (error) {
			console.error(new Error("Could not get all abilities", error))
			response.send("Couldn't get all pokemon abilities")
		}
		else response.json(results)
	})
})

//Create new pokemon ability
app.post("/api/abilities", (request, response) => {
	console.log("Adding a new author")
	//Takes a JSON body with a the keys name (name of ability) and effect (description of the ability)
	let body = request.body
	let createAbility = "INSERT INTO ability VALUES (?, ?)"
	database.run(createAbility, [body.name, body.effect], (error) => {
		if (error) {
			console.error(new Error("Could not add new ability"))
			response.send("Could not create new ability")
		}
		else response.send(`${body.name} created!`)
	})
})

//Update ability
app.put("/api/abilities/:id", (request,response) => {
	console.log("Updating abilities" + request.params.id)
	//Use the keys in request.body to create dynamic SET values for the query string
	let queryHelper = Object.keys(request.body).map(ele => `${ele} = ?`)
	//Use the dynamic SET values in from queryHelper to build full UPDATE string
	let updateOneAbility = `UPDATE ability SET ${queryHelper.join(", ")} WHERE ability.oid = ?`;
	//Add values from request.body and the abilitiesId to an array for use in database.run()
	let queryValues = [...Object.values(request.body), request.params.id]
	//Runs Query based on what was chosen for updates
	database.run(updateOneAbility, queryValues, function (error) {
	    if (error) {
	 	    console.log(new Error("Could not update abilities"), error)
	     	response.send("Could not update abilities")
	    } else {
	      	console.log(`Ability with ID ${request.params.id} was updated successfully`)
	     	response.send("Update Successful!")
	    }
	})
})

//Delete ability
app.delete("/api/abilities/:id",  (request, response) => {
	console.log("Abilities delete ", request.params.id);
	let selectabilitybyID = "DELETE FROM ability WHERE oid = ?"
	database.run(selectabilitybyID, [request.params.id], (error) => {
	    if (error) {
	      	console.error(new Error("Could not delete ability", error))
	      	response.send("Could not delete ability")
	    }
	    else response.send("ability removed!")
	})
})


/////////////////////////////////////////////////
// Routes for Pokemon Types
/////////////////////////////////////////////////

//Gets all pokemon types
app.get("/api/types", (request, response) => {
	console.log("Getting all types")
	let selectTypes = "SELECT * FROM types"
	database.all(selectTypes, (error, results) => {
		if (error) {
			console.error(new Error("Error getting all pokemon types:", error))
			response.send("Couldn't get all pokemon type")
		}
		else response.send(results)
	})
})

//Get one pokemon type
app.get('/api/types/:id',  (request, response) => {
  //Find a type by OID
  	console.log('Find type', request.params.id)
  	let selecttypebyID = "SELECT * FROM types WHERE oid = ?"
  	database.get(selecttypebyID, [request.params.id], (error,results) => {
	    if (error) {
	    	console.error(new Error("Could not get a type", error))
	    	response.send("Could not find type with that ID")
	    }
	    else response.json(results)
	})
})

//Create new pokemon type
app.post('/api/types',  (request, response) => {
	//Create new type with form data (`request.body`)
	console.log('Create type: ', request.body)
	let body = request.body
	let createtype = "INSERT INTO types VALUES (?)"
	database.run(createtype, [body.name], (error) => {
	    if (error) {
	    	console.error(new Error("Could not create type", error))
	    	response.send("Could not create type")
	    }
	    else {
	      console.log(request.body)
	      response.send("type added!")
	    }
	})
})


//Update type
app.put("/api/types/:id", (request,response) => {
	console.log("Updating type " + request.params.id)
	let body = request.body
	//Takes the key name: to change name of type
	let updateOnetype = `UPDATE types SET name = ? WHERE types.oid = ?`;
	//Runs Query based on what was chosen for updates
	database.run(updateOnetype, [body.name, request.params.id], function (error) {
	    if (error) {
	 	    console.log(new Error("Could not update type"), error)
	     	response.send("Could not update type")
	    } else {
	      	console.log(`type ${body.name} was updated successfully`)
	     	response.send("Update Successful!")
	    }
	})
})

//Delete type
app.delete("/api/types/:id",  (request, response) => {
	console.log("type delete ", request.params.id);
	let selectTypebyID = "DELETE FROM types WHERE oid = ?"
	database.get(selectTypebyID, [request.params.id], (error) => {
	    if (error) {
	      	console.error(new Error("Could not delete type", error))
	      	response.send("Could not delete type")
	    }
	    else response.send("type removed!")
	})
})


//Starts Server
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})