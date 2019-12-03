# Competitive Pokemon Database API
This API was created to store Pokemon and their associated stats for the purposes of competitive battling. The database also contains an assortment of Pokemon abilities and recommended moves for said Pokemon. 

![Table Relationships](https://imgur.com/qzy75gM)

### Table of Contents
- Routes
-- Pokemon
-- Types
-- Abilities
-- Moves
- Technologies Used
- Next Steps
# Routes
## Pokemon 
Get-Put-Delete /api/pokemon/{id}
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
(type should be an array and the relational pokemon types table will update)
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
### Pokemon
| Name    | Description                                                          | Type    |
|---------|----------------------------------------------------------------------|---------|
| name    | Name of Pokemon                                                      | Text    |
| ability | Pokemon's personal ability ID that associates with the ability table | Integer |
| hp      | Pokemon's hitpoints                                                  | Integer |
| atk     | Pokemon Attack stat. Determines damage for physical attacks          | Integer |
| def     | Pokemon Defence stat. Reduces damage from physical attacks           | Integer |
| spatk   | Pokemon Special Attack stat. Determines damage for special attacks   | Integer |
| spdef   | Pokemon Special Defence stat. Reduces damage from special attacks    | Integer |
| spd     | Pokemon Speed Stat. Determines who acts first in battle              | Integer |
| total   | Total sum of all stats                                               | Integer |

## Types
Get-Put-Delete /api/types/{id}
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
### Types
| Name | Description          | Type |
|------|----------------------|------|
| name | Name of Pokemon Type | Text |

## Ability
Get-Put-Delete /api/abilities/{id}
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
### Abilities 
| Name   | Description            | Type |
|--------|------------------------|------|
| name   | Name of ability        | Text |
| effect | Description of ability | Text |

## Moves
Get-Put-Delete /api/moves/{id}
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
    "name": "Hugs",
    "type": 11,
    "power": 100,
    "accuracy": 100,
    "description": "Gives everyone a hug"
}
```

### Moves 
| Name        | Description                                           | Type    |
|-------------|-------------------------------------------------------|---------|
| name        | Name of the Pokemon move                              | Text    |
| type        | Associated Pokemon type of the move                   | Integer |
| power       | Base damage of the Pokemon attack                     | Integer |
| accuracy    | Base accuracy of the attack that determines liklihood | Integer |
| description | The effect of the Pokemon move                        | Text    |


### Pokemon Moves
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


## Technologies Used
- Express
- Node
- SQLite3
- Postman
- DB Browser


## Next Steps
- Develop multiple pokemon sets
- StrategyDex
- Pokemon Rating
- Ev Spread
