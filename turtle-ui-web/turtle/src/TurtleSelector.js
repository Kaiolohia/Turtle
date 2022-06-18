import React from "react";
import { Select, MenuItem, FormControl, Box, InputLabel, FormHelperText } from "@mui/material"

// Render dropdown menu to select a turtle from database

const TurtleSelector = ({ turtles, tID, setTID }) => {
    const handleChange = (event) => {
        setTID(event.target.value);
      };
    return (
        <Box sx={{width: 250}}>
            <FormControl fullWidth>
                <InputLabel id="turtles">Turtle</InputLabel>
                <Select
                    labelId="turtles"
                    id="turtle-selector"
                    value={tID}
                    label="Turtle"
                    onChange={handleChange}
                    sx={{color:"primary.main"}}
                >
                    {turtles.map(t => (<MenuItem value={t} key={t} sx={{color:"primary.main"}}>Turtle: {t}</MenuItem>))}
                </Select>
                <FormHelperText sx={{color:"primary.dark"}}>Connect Turtles</FormHelperText>
            </FormControl>
        </Box>
    )
}

export default TurtleSelector