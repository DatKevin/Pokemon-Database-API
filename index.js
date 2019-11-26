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
/////////////ROUTES FOR POKEMON////////////////////////

//Gets all pokemon as well as thier types
app.get("/api/pokemon", (requestuest, response) => {
	console.log("Getting all pokemon!!!!!!!!!!!!")
	let selectpokemon = "SELECT * FROM pokemon"
	database.all(selectpokemon, (error, results) => {
		if (error) console.error(new Error("Error getting all pokemon :", error))
		else response.send(results)
		console.log(results)
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
app.put('/api/pokemon/:id', (request,response) => {
	//Use the keys in request.body to create dynamic SET values for the query string
	let queryHelper = Object.keys(request.body).map(ele => `${ele} = ?`)
	//Use the dynamic SET values in from queryHelper to build full UPDATE string
	let updateOnePokemon = `UPDATE pokemon SET ${queryHelper.join(', ')} WHERE pokemon.oid = ?`;
	//Add values from request.body and the PokemonId to an array for use in database.run()
	let queryValues = [...Object.values(request.body), request.params.id]
	//Runs Query based on what was chosen for updates
	database.run(updateOnePokemon, queryValues, function (error) {
	    if (error) {
	 	    console.log(new Error('Could not update Pokemon'), error)
	     	response.send("Could not update pokemon")
	    } else {
	      	console.log(`Pokemon with ID ${request.params.id} was updated successfully`)
	     	response.send("Update Successful!")
	    }
	  })
})

//Delete pokemon
app.delete('/api/pokemon/:id',  (request, response) => {
	console.log('pokemons delete ', request.params.id);
	let selectpokemonbyID = "DELETE FROM pokemon WHERE oid = ?"
	database.get(selectpokemonbyID, [request.params.id], (error) => {
	    if (error) {
	      	console.error(new Error("Could not delete pokemon", error))
	      	response.send("Could not delete pokemon")
	    }
	    else response.send("Pokemon removed!")
	})
})


//Starts Server
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})