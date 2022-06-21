import { Grid, Typography } from "@mui/material"
import BtnGroup from "./BtnGroup";

// Create buttons for commands

const BtnContainer = ({ws, tID,}) => {
    if (tID) return (
        <>
            <Grid item>
                <Grid container justify="center">
                    <BtnGroup
                        ws={ws}
                        tID={tID}
                        btn={[{key: "left", text: "\u25C0", cmd: "turtle.turnLeft"}]}
                    />
                    <BtnGroup
                        orientation="vertical"
                        ws={ws}
                        tID={tID}
                        btn={[{key: "up", text: "\u25B2", cmd: "turtle.up"},{key:"front", text: "\u2726", cmd: "turtle.forward"},{key:"down", text:"\u25BC", cmd: "turtle.down"}]}
                    />
                    <BtnGroup
                        display="flex"
                        justify="center"
                        textAlign="center"
                        ws={ws}
                        tID={tID}
                        btn={[{key: "right", text: "\u25B6", cmd: "turtle.turnRight"}]}
                    />
                </Grid>
            </Grid>
            <Grid item>
                <BtnGroup
                orientation="vertical"
                ws={ws}
                tID={tID}
                btn={[{key: "digUp", text: "\u25B2", cmd: "turtle.digUp"},{key:"dig", text: "\u26CF", cmd: "turtle.dig"},{key:"digDown", text:"\u25BC", cmd: "turtle.digDown"}]}
                />
            </Grid>
            <Grid item>
                <BtnGroup
                orientation="vertical"
                ws={ws}
                tID={tID}
                btn={[{key: "placeUp", text: "\u25B2", cmd: "turtle.placeUp"},{key:"place", text: "\u25A3", cmd: "turtle.place"},{key:"placeDown", text:"\u25BC", cmd: "turtle.placeDown"}]}
                />
            </Grid>
            <Grid item>
                <BtnGroup
                orientation="vertical"
                ws={ws}
                tID={tID}
                btn={[{key: "dropUp", text: "\u25B2", cmd: "turtle.dropUp", params: "count"},{key:"drop", text: "\u27D8", cmd: "turtle.drop", params: "count"},{key:"dropDown", text:"\u25BC", cmd: "turtle.dropDown", params: "count"}]}
                />
            </Grid>
            <Grid item>
                <BtnGroup
                orientation="vertical"
                ws={ws}
                tID={tID}
                btn={[{key: "suckUp", text: "\u25B2", cmd: "turtle.suckUp", params: "count"},{key:"suck", text: "\u27D9", cmd: "turtle.suck", params: "count"},{key:"suckDown", text:"\u25BC", cmd: "turtle.suckDown", params: "count"}]}
                />
            </Grid>
            <Grid item>
                <BtnGroup
                orientation="vertical"
                ws={ws}
                tID={tID}
                btn={[{key: "reboot", text: "reboot turtle in front", cmd: "peripheral.call", params: '"front","reboot"'}, {key: "refuel", text: "refuel turtle", cmd: "turtle.refuel"}]}
                />
            </Grid>   
        </>
    )

    // ONLY RETURN HERE WHEN NO TURTLE IS SELECTED
    return (
        <>
            <Typography variant="h4" sx={{color:'primary.main'}}>Please connect and select a turtle</Typography>
        </>
    )
}

export default BtnContainer