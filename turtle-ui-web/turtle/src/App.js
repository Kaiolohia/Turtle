import { useEffect, useState } from "react"
import BtnContainer from "./BtnContainer"
import TurtleSelector from "./TurtleSelector"
import Inventory from "./Inventory"
import { Grid, CssBaseline } from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import World from "./World"
import { wdb, tdb } from "./API"
import Fuel from './Fuel';

// Connect to websocket server
const ws = new WebSocket("ws://localhost:43509")
ws.onopen = () => {
  console.debug("Connected to WS")
  ws.send(JSON.stringify({wData: "Connected"}))
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#b71c1c',
      light: '#f05545',
      dark: '#7f0000'
    },
    secondary: {
      main: '#616161',
      light: '#8e8e8e',
      dark: '#373737'
    },
    background: {
      default: "#222222"
    },
    text: {
      primary: "#222222"
    }
  }
})
export default function Main() {
  const [turtles, setTurtles] = useState([])
  const [selected, setSelected] = useState(1)
  const [inv, setInv] = useState([])
  const [tID, setTID] = useState("")
  const [tPos, setTPos] = useState({x:0,y:0,z:0})
  const [tFuel, setTFuel] = useState(100)
  // when the current turtle is changed, send an empty command to request data from the turtle
  useEffect(() => {
    if (ws && tID !== "") {
      const command = {}
      command[tID] = "return"
      ws.send(JSON.stringify(command))
    }
  }, [tID])
  // Handles inbound data from the websocket
  useEffect(() => {
    ws.onmessage = (msg) => {
      const parsedMsg = JSON.parse(msg.data)
      // Checks if turtle is apart of known turtles, will always change to the most updated turtle
      if (parsedMsg["tName"] !== undefined) {
        if (turtles.every(e => e !== parsedMsg["tName"])) {
          setTurtles((t) => [...t, parsedMsg["tName"]])
        }
        setTID(() => parsedMsg["tName"])
      }
      // Updates inventory UI
      if (parsedMsg["tInv"] !== undefined) {
        setInv(() => parsedMsg["tInv"])
      }
      // Gathers coordinates
      const {x, y, z} = parsedMsg["tPos"] !== undefined ? parsedMsg["tPos"] : {x:undefined, y:undefined, z:undefined}
      if(parsedMsg["tPos"] !== undefined) {
        setTPos(() => ({
          x:x,
          y:y,
          z:z
        }))
        // check if turtle exists, if so grab dir from there
        tdb.refreshData()
        const allTurtles = tdb.getTurtles()
        if (allTurtles[tID] !== undefined) {
          const curTurtle = tdb.getTurtle(tID)
          tdb.updateTurtle(x,y,z, curTurtle.pos.dir, tID)
        } 
        else if (allTurtles[parsedMsg["tID"]] === undefined) {
          const name = parsedMsg["tID"]
          tdb.updateTurtle(x, y, z, 1, name )
        }
      }
      // Update world view with new blocks
      if(parsedMsg["tBlocks"] !== undefined) {
        const {down, front, up} = parsedMsg["tBlocks"]
        const ct = tdb.getTurtle(parsedMsg["tID"])
        const { dir } = ct.pos
        wdb.updateBlock(x, y - 1, z, down)
        if (dir === 1) {
          wdb.updateBlock(x, y, z - 1, front)
        }
        else if (dir === 2) {
          wdb.updateBlock(x + 1, y, z, front)
        }          
        else if (dir === 3) {
          wdb.updateBlock(x, y, z + 1, front)
        }          
        else if (dir === 4) {
          wdb.updateBlock(x - 1, y, z, front)
        }
        wdb.updateBlock(x, y + 1, z, up)
      }
      // Update fuel gauge 
      if(parsedMsg["tFuel"] !== undefined) {
        setTFuel(() => parsedMsg["tFuel"])
      }
    }
  })
  return (
  <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Grid container spacing={2} justify='center' justifyContent="flex-start" alignItems="center" sx={{m: 1, p:2}}>
          <BtnContainer ws={ws} tID={tID}/>
        <Grid item>
          <TurtleSelector turtles={turtles} tID={tID} setTID={setTID}/>
        </Grid>
        <Grid item>
          <Fuel fuelPercent={tFuel}/>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{m: 1, p:2}}>
        <Grid item xs={5}>
          <Inventory inv={inv} ws={ws} tID={tID} sel={selected} setSel={setSelected}/>
        </Grid>
        <Grid item xs={7}>
          <World tPos={tPos} tID={tID}/> 
        </Grid>
      </Grid>
  </ThemeProvider>
  )
};