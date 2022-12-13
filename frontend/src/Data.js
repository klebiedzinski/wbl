import wbl from "./Data/Teams_pics/wbl.jpg"
import player from "./Data/player.jpg"
const { v4: uuidv4 } = require('uuid');

export class Team {
    constructor (config) {
        this.name = config.name || "";
        this.id = config.id || uuidv4();
        this.image = new Image();
        this.image.src = config.src || wbl;
        this.players = config.players || [...Array(10).keys()].map(el => new Player({
            firstName: "player's name",
            lastName: "player's last name",
        }))
    }
}

export class Player {
    constructor(config) {
        this.firstName = config.firstName || "Imie";
        this.lastName = config.lastName || "Nazwisko";
        this.id = config.id || uuidv4();
        this.image = new Image();
        this.image.src = config.src || player
        this.age = config.age || 24
    }
}

