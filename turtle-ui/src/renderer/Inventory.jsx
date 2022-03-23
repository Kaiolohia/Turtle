/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from "react";
import { Grid, Paper, Tooltip, Typography} from  "@mui/material"

// render 4x4 grid for turtle inventory

const Inventory = ({inv, ws, tID, sel, setSel}) => {
    const handleClick = (slot) => {
        setSel(() => slot)
        const command = {}
        command[tID] = `return turtle.select(${slot})`
        ws.send(JSON.stringify(command))
    }
    return (
        <Grid container justify='center' justifyContent="center" alignItems="flex-start" sx={{m: 1, maxWidth:500}}>
            {inv.map((s) => (
                    <Tooltip title={s.name} placement="top" key={s.slot}>
                        <Grid item xs={3} sx={{minHeight:125, maxHeight:125, minWidth:125, maxWidth:125, textAlign:"center", lineHeight:'109px'}}>
                                <Paper elevation={6} sx={{backgroundColor: "secondary.main"}} onClick={()=> handleClick(s.slot)}>
                                    <Typography variant="h1" sx={{color: s.slot === sel ? 'info.main' : 'primary.dark'}}>
                                        {s.count}
                                    </Typography>
                                </Paper>
                        </Grid>
                    </Tooltip>
                
            ))}
            
        </Grid>
    )
}

export default Inventory