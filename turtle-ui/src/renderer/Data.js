/* eslint-disable prettier/prettier */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable max-classes-per-file */
const { JsonDB } = require('node-json-db')

// Json DB API class

export class WorldData {
    constructor () {
        this.wdb = new JsonDB("WorldData", true, true)
    }
    updateBlock (x, y, z, block) {
        const path = `/${x},${y},${z}`
        if (block === "No block to inspect") {
            const allBlocks = this.getMap()
            if (allBlocks[`${x},${y},${z}`] !== undefined) {
                console.log("Deleting void block")
                this.wdb.delete(path)
            }
            return
        }
        this.wdb.push(`/${x},${y},${z}`, block.name)
    }
    getBlock (x, y, z) {
        return this.wdb.getData(`/${x},${y},${z}`)
    }
    getMap () {
        return this.wdb.getData("/")
    }
    refreshData() {
        this.wdb.reload()
    }
}

export class TurtleData {
    constructor() {
        this.tdb = new JsonDB("TurtleData", true, true)
    }
    updateTurtle (x, y, z, dir, name) {
        this.tdb.push(`/${name}`, { pos: {x : x, y : y, z : z, dir : dir}})
        this.tdb.save()
    }
    getTurtle (name) {
        return this.tdb.getData(`/${name}`)
    }
    getTurtles () {
        return this.tdb.getData('/')
    }
    refreshData() {
        this.tdb.reload()
    }
}