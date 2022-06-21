import React, { useState } from "react";
import { Button, ButtonGroup, Modal, Box, TextField, Typography } from "@mui/material"
import { tdb } from "./API"

const BtnGroup = ({orientation = "horizontal", btn, ws, tID}) => {
    const [modalState, setModalState] = useState(false)
    const [count, setCount] = useState("")
    const [countCmd, setCountCmd] = useState('')
    const handleOpen = () => setModalState(true);
    const handleClose = () => setModalState(false);
    const handleChange = (event) => {
        setCount(() => event.target.value);
        
    };
    const handleSubmit = e => {
        e.preventDefault()
        const command = {}
        command[tID] = `return ${countCmd}(${count ? count : ""})`
        ws.send(JSON.stringify(command))
        setCount(() => "")
        setCountCmd(() => '')
        handleClose()
    }
    const sendCMD = (CMD, params, changeDir)=> {
        const command = {}
        tdb.refreshData()
        const ct = tdb.getTurtle(tID)
        const { x, y, z, dir } = ct
        // Turtle does not know what direction it is facing, so it is kept track in the database
        if (changeDir === "left") {
            tdb.updateTurtle(x, y, z, dir === 1 ? 4 : dir - 1, tID, "BtnGroup.js line 31")
        }
        if (changeDir === "right") {
            tdb.updateTurtle(x, y, z, dir === 4 ? 1 : dir + 1, tID, "BtnGroup.js line 34")
        }
        tdb.refreshData()
        // Show popup for numeric input
        if (CMD.includes("drop") || CMD.includes("suck")) {
            handleOpen()
            setCountCmd(() => CMD)
            return
        }
        command[tID] = `return ${CMD}(${params})`
        ws.send(JSON.stringify(command))
        setCount(() => "")
    }
    return (
    <>
        <Modal
        open={modalState}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'secondary.dark',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        }}>
            <form onSubmit={(e)=> { handleSubmit(e) }}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{color:"secondary.light"}}>
                    Enter count
                </Typography>
                <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={handleChange}/>
            </form>
        </Box>
      </Modal>
        <ButtonGroup orientation={orientation} variant="contained" size="large">
            {btn.map(b => <Button key={b.key} variant="outlined" onClick={() => sendCMD(b.cmd, b.params, b.key)}>{b.text}</Button>)}
        </ButtonGroup>
    </>
)};

export default BtnGroup