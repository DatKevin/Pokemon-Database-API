
# Competitive Pokemon Database API
This API was created to store Pokemon and their associated stats for the purposes of competitive battling. The database also contains an assortment of Pokemon abilities and recommended moves for said Pokemon. 

![Table Relationships](/table-relationships.png)

### Table of Contents
- Routes
-- Pokemon
-- Types
-- Abilities
-- Moves
-- Pokemon Moves
-- Pokemon Types
- Technologies Used
- Next Steps
# Routes
## Pokemon 
Cute magical creatures for one to attempt to collect them all and do battle with. 

| Route  | url               | Description                        |
|--------|-------------------|------------------------------------|
| GET    | /api/pokemon/{id} | Reads one Pokemon with the same ID |
| GET    | /api/pokemon/     | Reads all Pokemon in the database  |
| POST   | /api/pokemon/     | Creates one new Pokemon. Requires a JSON body with keys listed in the POST example below            |
| PUT    | /api/pokemon/{id} | Updates one Pokemon based on ID. Requires a JSON body with keys listed in the POST example below    |
| DELETE | /api/pokemon/{id} | Deletes one Pokemon based on ID    |


Get /api/pokemon/{id}
```

{
	"name": "Gyrados",
	"type": "Flying,Water",
	"ability": "Intimidate",
	"hp": 95,
	"atk": 125,
	"def": 79,
	"sp	atk": 60,
	"spdef": 100,
	"spd": 81,
	"total": 540
}
```
Post /api/pokemon (requires JSON body)
(type should be an array and the relational Pokemon types table will update)
```
{
    "name": "Dragapult",
    "type": ["Dragon", "Ghost"],
    "ability": 3,
    "hp": 88,
    "atk": 120,
    "def": 75,
    "spatk": 100,
    "spdef": 75,
    "spd": 142,
    "total": 600
}
```
### Pokemon Table Data
| Name    | Description                                                          | Type    |
|---------|----------------------------------------------------------------------|---------|
| name    | Name of Pokemon                                                      | Text    |
| ability | Pokemon's personal ability ID that associates with the ability table | Integer |
| hp      | Pokemon's hitpoints                                                  | Integer |
| atk     | Pokemon Attack stat. Determines damage for physical attacks          | Integer |
| def     | Pokemon Defense stat. Reduces damage from physical attacks           | Integer |
| spatk   | Pokemon Special Attack stat. Determines damage for special attacks   | Integer |
| spdef   | Pokemon Special Defense stat. Reduces damage from special attacks    | Integer |
| spd     | Pokemon Speed Stat. Determines who acts first in battle              | Integer |
| total   | Total sum of all stats                                               | Integer |

## Types
A trait that determines a Pokemon's strength and weakness against other types
| Route  | url               | Description                        |
|--------|-------------------|------------------------------------|
| GET    | /api/types/{id} | Reads one type with the same ID |
| GET    | /api/types/     | Reads all types in the database  |
| POST   | /api/types/     | Creates one new type. Requires a JSON body with keys listed in the POST example below            |
| PUT    | /api/types/{id} | Updates one type based on ID. Requires a JSON body with keys listed in the POST example below    |
| DELETE | /api/types/{id} | Deletes one type based on ID    |
Get /api/types/{id}
```
{
    "name": "Fire"
}
```
Post /api/types (requires JSON body)
```
{
    "name": "Fairy"
}
```
### Types Table Data
| Name | Description          | Type |
|------|----------------------|------|
| name | Name of Pokemon Type | Text |

## Ability
A trait that provides an additional effect for a Pokemon. Each Pokemon can only have one ability at a time and the same ability can be on different Pokemon
| Route  | url               | Description                        |
|--------|-------------------|------------------------------------|
| GET    | /api/abilities/{id} | Reads one ability with the same ID |
| GET    | /api/abilities/     | Reads all abilities in the database  |
| POST   | /api/abilities/     | Creates one new ability. Requires a JSON body with keys listed in the POST example below            |
| PUT    | /api/abilities/{id} | Updates one ability based on ID. Requires a JSON body with keys listed in the POST example below    |
| DELETE | /api/abilities/{id} | Deletes one ability based on ID    |
Get /api/abilities/{id}
```
{
	"name": "Cursed Body",
	"effect": "When hit with a damaging move, has a 30% chance to disable that move"
}
```
Post /api/abilities/ (requires JSON body)
```
{
        "name": "Cursed Bunny",
        "effect": "When hit summons a ghost bunny"
}
```
### Abilities Table Data
| Name   | Description            | Type |
|--------|------------------------|------|
| name   | Name of ability        | Text |
| effect | Description of ability | Text |

## Moves
An attack a Pokemon can use in battle. Each Pokemon can have up to 4 moves and multiple Pokemon can learn the same move
| Route  | url               | Description                        |
|--------|-------------------|------------------------------------|
| GET    | /api/moves/{id} | Reads one move with the same ID |
| GET    | /api/moves/     | Reads all moves in the database  |
| POST   | /api/moves/     | Creates one new move. Requires a JSON body with keys listed in the POST example below            |
| PUT    | /api/moves/{id} | Updates one move based on ID. Requires a JSON body with keys listed in the POST example below    |
| DELETE | /api/moves/{id} | Deletes one move based on ID    |
Get /api/moves/{id}
```
{
	"name": "Earthquake",
	"type": "Ground",
	"power": 100,
	"accuracy": 100,
	"description": "Doubles damage if the opponent uses dig"
}
```
Post /api/moves/ (requires JSON body)
(type should be the associated type ID)
```
{
  	"name": "Rock Slide",
	"type": 12,
 	"power": 85,
 	"accuracy": 95,
 	"description": "Has a small chance to flinch the opponent"
}
```

### Moves 
| Name        | Description                                           | Type    |
|-------------|-------------------------------------------------------|---------|
| name        | Name of the Pokemon move                              | Text    |
| type        | Associated Pokemon type of the move                   | Integer |
| power       | Base damage of the Pokemon attack                     | Integer |
| accuracy    | Base accuracy of the attack that determines likelihood | Integer |
| description | The effect of the Pokemon move                        | Text    |


### Pokemon Move Sets
Join table that shows the many to many relationship of Pokemon and the moves they can learn. 
| Route  | url               | Description                        |
|--------|-------------------|------------------------------------|
| GET    | /api/movesets/{id} | Reads one moveset with the same ID |
| GET    | /api/movesets/     | Reads all movesets in the database  |
| POST   | /api/movesets/     | Creates one new moveset. Requires a JSON body with keys listed in the POST example below            |
| PUT    | /api/movesets/ | Updates one moveset based on ID. Requires a JSON body with keys listed in the PUT example below    |
| DELETE | /api/movesets/ | Deletes one moveset based on ID. Requires a JSON body with keys listed in the DELETE example below    |
Get /api/movesets/{id}
```
    {
        "pokemon": "Arcanine",
        "move": "Play Rough",
        "type": 7,
        "power": 90,
        "accuracy": 90,
        "description": "Has a 10% chance to lower the opponent's attack by 1 stage"
    },
    {
        "pokemon": "Arcanine",
        "move": "Snarl",
        "type": 17,
        "power": 55,
        "accuracy": 95,
        "description": "Lowers the opponent's special attack by 1 stage"
    },
    {
        "pokemon": "Arcanine",
        "move": "Close Combat",
        "type": 8,
        "power": 120,
        "accuracy": 100,
        "description": "Lowers the user's defense and special defence by 1 stage"
    },
    {
        "pokemon": "Arcanine",
        "move": "Crunch",
        "type": 17,
        "power": 80,
        "accuracy": 100,
        "description": "Has a 20% chance to lower opponent's defencec by 1 stage"
    }
```
Post-Delete /api/movesets (requires JSON body)
```
{
    "pokemonID":"3",
    "moveID":"1"
}
```
Put /api/movesets (requires JSON body)
```
{
    "pokemonID": "3",
    "oldID": "11",
    "newID": "14"
}
```
### Pokemon Types
Join table that shows the many to many relationship of Pokemon and their typing. 
| Route  | url               | Description                        |
|--------|-------------------|------------------------------------|
| GET    | /api/pokemontypes/{id} | Reads one Pokemon's type with the same ID |
| GET    | /api/pokemontypes/     | Reads all Pokemons' type in the database  |
| POST   | /api/pokemontypes/     | Creates one new Pokemon's type. Requires a JSON body with keys listed in the POST example below            |
| PUT    | /api/pokemontypes/ | Updates one Pokemon's type based on ID. Requires a JSON body with keys listed in the PUT example below    |
| DELETE | /api/pokemontypes/ | Deletes one Pokemon's type based on ID. Requires a JSON body with keys listed in the DELETE example below    |
Get /api/pokemontypes/{id}
```
 {
    "name": "Hawlucha",
    "type": "Flying,Fighting"
}
```
Post-Delete /api/pokemontypes (requires JSON body)
```
{
    "pokemonID":"3",
    "typeID":"11"
}
```
Put /api/pokemontypes (requires JSON body)
```
{
    "pokemonID": "3",
    "oldID": "11",
    "newID": "14"
}
```


## Technologies Used
- Express
- Node
- SQLite3
- Postman
- DB Browser
- Trello: https://trello.com/b/3FA2gwLp/pokemon-database-api


## Next Steps
- Develop multiple pokemon sets
- StrategyDex
- Pokemon Rating
- Ev Spread
