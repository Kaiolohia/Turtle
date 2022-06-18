import axios from 'axios'
const URL = "http://localhost:3000"

class WorldData {
    constructor() {
        this.world = {}
        this.getWorld()
    }

    async getWorld () {
        return this.world = await (await axios.get(`${URL}/world`)).data
    }

    updateBlock(x, y, z, block) {
        const path = `${x},${y},${z}`
        if (block === " No Block to inspect" && this.world[path]) {
            console.log("Deleteing void block")
            delete this.world.path
            return
        }
        this.world[path] = block.name
    }

    getBlock(x, y, z) {
        return this.world[`/${x},${y},${z}`]
    }

    getMap() {
        return this.world
    }

    async refreshData () {
        return this.world = await (await axios.put(`${URL}/world`, this.world)).data
    }
}

class TurtleData {
    constructor() {
        this.turtles = {}
        this.getTurtles()
    }
    async getTurtles () {
        return this.turtles = await (await axios.get(`${URL}/turtles`)).data
    }
    updateTurtle (x, y, z, dir, name) {
        this.turtles[name].pos = {
            "x": x,
			"y": y,
			"z": z,
			"dir": dir
        }
    }
    getTurtle (name) {
        return this.turtles[name]
    }
    
    async refreshData() {
        return this.turtles = await (await axios.put(`${URL}/turtles`, this.turtles)).data
    }
}

const wdb = new WorldData()
const tdb = new TurtleData()
export { wdb, tdb }