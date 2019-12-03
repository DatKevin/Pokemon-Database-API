# Competitive Pokemon Database API
This API was created to store Pokemon and their associated stats for the purposes of competitive battling. The database also contains an assortment of Pokemon abilities and recommended moves for said Pokemon. 

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
Post /api/pokemon
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
Get /api/types/{id}
```
{
	"name": "Fire"
}
```
Post /api/types
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
Get /api/abilities/{id}
```
{
	"name": "Cursed Body",
	"effect": "When hit with a damaging move, has a 30% chance to disable that move"
}
```
Post /api/abilities/
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
Post /api/moves/
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
