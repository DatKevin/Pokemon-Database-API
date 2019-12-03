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
  	let selectpokemonbyID = "SELECT pokemon.name, group_concat(types.name) AS type, ability.name AS ability, pokemon.hp, pokemon.atk, pokemon.def, pokemon.spatk, pokemon.spdef, pokemon.spd, pokemon.total FROM pokemon JOIN ability ON pokemon.ability = ability.oid JOIN pokemontypes ON pokemontypes.pokemonID = pokemon.oid JOIN types ON types.oid = pokemontypes.typeID WHERE pokemon.oid = ? GROUP BY pokemon.name"
  	database.get(selectpokemonbyID, [request.params.id], (error,results) => {
	    if (error) {
	    	console.error(new Error("Could not get single pokemon", error))
	    	response.send(`Could not find ${request.params.id} in the database`)
	    }
	    else response.json(results)
	})
})

//Create new Pokemon
app.post('/api/pokemon',  (request, response) => {
	//Create new Pokemon with form data (request.body)
	console.log('Create pokemon: ', request.body)
	let body = request.body
	//type should be in an array
	let type = body.type
	let createPokemon = "INSERT INTO pokemon VALUES (?,?,?,?,?,?,?,?,?)"
	database.run(createPokemon, [body.name, body.ability, body.hp, body.atk, body.def, body.spatk, body.spdef, body.spd, body.total], function(error) {
	    if (error) {
	    	console.error(new Error("Could not create pokemon", error))
	    	response.send("Could not create pokemon")
	    }
	    else {
	    	console.log("Adding to pokemon types table")
	    	let addPokemontype = "INSERT INTO pokemontypes SELECT pokemon.oid, types.oid FROM pokemon, types WHERE pokemon.oid = ? AND types.name = ?"
	    	for (types of type) {
	    		database.run(addPokemontype, [this.lastID, types], (error) => {
	    			if (error) {
	    				console.error(new Error("Could not add types", error))
	    			}
	    			else response.send("Pokemon has been added!")
	    		})
	    	}
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
	      	console.log(`${request.params.id} was updated successfully`)
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

//Get one ability
app.get('/api/abilities/:id',  (request, response) => {
  //Find an ability by oid
  	console.log('Find pokemon', request.params.id)
  	let selectpokemonbyID = "SELECT * FROM ability WHERE oid = ?"
  	database.get(selectpokemonbyID, [request.params.id], (error,results) => {
	    if (error) {
	    	console.error(new Error("Could not get single ability", error))
	    	response.send(`Could not find id ${request.params.id} in the database`)
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

/////////////////////////////////////////////////
// Routes for Pokemon Moves
/////////////////////////////////////////////////

//Gets all pokemon Moves
app.get("/api/moves", (request, response) => {
	console.log("Getting all moves")
	let selectmoves = "SELECT moves.name, types.name AS type, moves.power, moves.accuracy, moves.description FROM moves JOIN types ON types.oid = moves.type"
	database.all(selectmoves, (error, results) => {
		if (error) {
			console.error(new Error("Error getting all pokemon moves:", error))
			response.send("Couldn't get all pokemon moves")
		}
		else response.send(results)
	})
})

//Get one pokemon move
app.get('/api/moves/:id',  (request, response) => {
  //Find a move by OID
  	console.log('Find move', request.params.id)
  	let selectmovebyID = "SELECT moves.name, types.name AS type, moves.power, moves.accuracy, moves.description FROM moves JOIN types ON types.oid = moves.type WHERE moves.oid = ?"
  	database.get(selectmovebyID, [request.params.id], (error,results) => {
	    if (error) {
	    	console.error(new Error("Could not get move", error))
	    	response.send("Could not find move with that ID")
	    }
	    else response.json(results)
	})
})

//Create new pokemon move
app.post('/api/moves',  (request, response) => {
	//Create new move with form data (`request.body`)
	console.log('Create move: ', request.body)
	let body = request.body
	let createmove = "INSERT INTO moves VALUES (?, ?, ? ,? ,?)"
	database.run(createmove, [body.name, body.type, body.power, body.accuracy, body.description], (error) => {
	    if (error) {
	    	console.error(new Error("Could not create move", error))
	    	response.send("Could not create move")
	    }
	    else {
	      console.log(request.body)
	      response.send("move added!")
	    }
	})
})


//Update move
app.put("/api/moves/:id", (request,response) => {
	console.log("Updating moves" + request.params.id)
	//Use the keys in request.body to create dynamic SET values for the query string
	let queryHelper = Object.keys(request.body).map(ele => `${ele} = ?`)
	//Use the dynamic SET values in from queryHelper to build full UPDATE string
	let updateOneMove = `UPDATE moves SET ${queryHelper.join(", ")} WHERE moves.oid = ?`;
	//Add values from request.body and the movesId to an array for use in database.run()
	let queryValues = [...Object.values(request.body), request.params.id]
	//Runs Query based on what was chosen for updates
	database.run(updateOneMove, queryValues, function (error) {
	    if (error) {
	 	    console.log(new Error("Could not update move"), error)
	     	response.send("Could not update move")
	    } else {
	      	console.log(`move with ID ${request.params.id} was updated successfully`)
	     	response.send("Update Successful!")
	    }
	})
})

//Delete move
app.delete("/api/moves/:id",  (request, response) => {
	console.log("move delete ", request.params.id);
	let selectmovebyID = "DELETE FROM moves WHERE oid = ?"
	database.get(selectmovebyID, [request.params.id], (error) => {
	    if (error) {
	      	console.error(new Error("Could not delete move", error))
	      	response.send("Could not delete move")
	    }
	    else response.send("move removed!")
	})
})

/////////////////////////////////////////////////
// Routes for Pokemon Moves Sets
/////////////////////////////////////////////////

//Returns all pokemon and thier associated moves
app.get("/api/movesets", (request, response) => {
	console.log("Getting all movesets")
	let getallmovesets = "SELECT pokemon.name AS pokemon, moves.name AS move, moves.type, moves.power, moves.accuracy, moves.description FROM pokemon JOIN pokemonmoves ON pokemon.oid = pokemonmoves.pokemonID JOIN moves ON moves.oid = pokemonmoves.moveID ORDER BY pokemon.name"
	database.all(getallmovesets, (error, results) => {
		if (error) {
			console.error(new Error("Could not get all movesets", error))
			response.send("Could not get all movesets")
		}
		else response.json(results)
	})
})

//Get a single pokemon with it's moveset
app.get("/api/movesets/:id", (request, response) => {
	console.log("Getting all movesets for" + request.params.id)
	let getSinglePokemonMoveset = "SELECT pokemon.name AS pokemon, moves.name AS move, moves.type, moves.power, moves.accuracy, moves.description FROM pokemon JOIN pokemonmoves ON pokemon.oid = pokemonmoves.pokemonID JOIN moves ON moves.oid = pokemonmoves.moveID WHERE pokemon.oid = ?"
	database.all(getSinglePokemonMoveset, [request.params.id], (error, results) => {
		if (error) {
			console.error(new Error("Could not get movesets for pokemon", error))
			response.send("Could not get moveset for pokemon with id: " + request.params.id)
		}
		else response.json(results)
	})
})

//Add a move to a pokemon's moveset
app.post("/api/movesets", (request, response) => {
	console.log("Updating moveset")
	let body = request.body
	let addmove = "INSERT INTO pokemonmoves SELECT pokemon.oid, moves.oid FROM pokemon, moves WHERE pokemon.oid = ? AND moves.oid = ?"
	//takes in a JSON with keys of pokemon (Pokemon oid) and move (oid of move being added)
	database.run(addmove,[body.pokemonID, body.moveID], (error) => {
		if (error) {
			console.error(new Error("Could not add new moveset", error))
			response.send("Move failed to be added")
		}
		else response.send("Move added!")
	})
})

//Updates and changes an existing pokemon moveset
app.put("/api/movesets", (request, response) => {
	console.log("Updating pokemon moveset")
	let body = request.body
	let updatemoveset = "UPDATE pokemonmoves SET moveID = ? WHERE pokemonID = ? AND moveID = ?"
	//Takes in a JSON with keys of pokemonID, oldID (old move ID), newID (new move ID)
	database.run(updatemoveset, [body.newID, body.pokemonID, body.oldID], (error) => {
		if (error) {
			console.error(new Error("Could not update move", error))
			response.send("Could not update move")
		}
		else response.send("Move updated!")
	})
})

//Deletes an existing move
app.delete("/api/movesets", (request,response) => {
	console.log("Deleting a move")
	let body = request.body
	let deletemoveset = "DELETE FROM pokemonmoves WHERE pokemonID = ? AND moveID = ? "
	//Takes in a JSON with keys of pokemonID and moveID that is to be deleted
	database.run(deletemoveset, [body.pokemonID, body.moveID], (error) => {
		if (error) {
			console.error(new Error("Could not delete pokemon move"))
		}
		else response.send("Move Deleted!")
	})
})

/////////////////////////////////////////////////
// Routes for Pokemon Types
/////////////////////////////////////////////////

//Returns all pokemon and thier associated type(s)
app.get("/api/pokemontypes", (request, response) => {
	console.log("Getting all pokemontypes")
	let getallpokemontypes = "SELECT pokemon.name, group_concat(types.name) AS type FROM pokemon JOIN pokemontypes ON pokemontypes.pokemonID = pokemon.oid JOIN types ON types.oid = pokemontypes.typeID GROUP BY pokemon.name"
	database.all(getallpokemontypes, (error, results) => {
		if (error) {
			console.error(new Error("Could not get all pokemontypes", error))
			response.send("Could not get all pokemontypes")
		}
		else response.json(results)
	})
})

//Get a single pokemon with it's typing
app.get("/api/pokemontypes/:id", (request, response) => {
	console.log("Getting all pokemontypes for" + request.params.id)
	let getSinglePokemonType = "SELECT pokemon.name, group_concat(types.name) AS type FROM pokemon JOIN pokemontypes ON pokemontypes.pokemonID = pokemon.oid JOIN types ON types.oid = pokemontypes.typeID WHERE pokemon.oid = ? GROUP BY pokemon.name"
	database.all(getSinglePokemonType, [request.params.id], (error, results) => {
		if (error) {
			console.error(new Error("Could not get pokemontype(s) for pokemon", error))
			response.send("Could not get types for pokemon: " + request.params.id)
		}
		else response.json(results)
	})
})

//Add a pokemon type
app.post("/api/pokemontypes", (request, response) => {
	console.log("Updating moveset")
	let body = request.body
	let addtype = "INSERT INTO pokemontypes VALUES (?, ?)"
	//takes in a JSON with keys of pokemon (Pokemon oid) and type (oid of the type being added)
	database.run(addtype,[body.pokemonID, body.typeID], (error) => {
		if (error) {
			console.error(new Error("Could not add new type", error))
			response.send("Type failed to be added")
		}
		else response.send("Type added!")
	})
})

//Updates and changes an existing pokemon type
app.put("/api/pokemontypes", (request, response) => {
	console.log("Updating pokemon type")
	let body = request.body
	let updatepokemontype = "UPDATE pokemontypes SET typeID = ? WHERE pokemonID = ? AND typeID = ?"
	//Takes in a JSON with keys of pokemonID, oldID (old type ID), newID (new type ID)
	database.run(updatepokemontype, [body.newID, body.pokemonID, body.oldID], (error) => {
		if (error) {
			console.error(new Error("Could not update type", error))
			response.send("Could not update type")
		}
		else response.send("type updated!")
	})
})

//Deletes an existing type
app.delete("/api/pokemontypes", (request,response) => {
	console.log("Deleting a type")
	let body = request.body
	let deletepokemontype = "DELETE FROM pokemontypes WHERE pokemonID = ? AND typeID = ? "
	//Takes in a JSON with keys of pokemonID and typeID that is to be deleted
	database.run(deletepokemontype, [body.pokemonID, body.typeID], (error) => {
		if (error) {
			console.error(new Error("Could not delete pokemon type"))
		}
		else response.send("Type deleted!")
	})
})

//Starts Server
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})