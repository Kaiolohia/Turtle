import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import { wdb, tdb } from "./API";

// Generate Block

const Block = ({col, ...props}) => {
    
    const getCol = () => {
        const listName = col.split("")
        let tot = 0
        for (let i = 0; i < listName.length; i++) {
            tot = listName[i].charCodeAt(0) + tot
        }
        return `hsl(${tot % 360}, 100%, 50%)`
    }

    return (
        <>
            <mesh {...props}>
                <boxGeometry args={[0.8,0.8,0.8]} attach="geometry"/>
                <meshStandardMaterial color={getCol()} attach="material" opacity={0.5} transparent/>
                
            </mesh>
            <mesh {...props}>
                <boxGeometry args={[1,1,1]} attach="geometry"/>
                <meshStandardMaterial color="black" attach="material" wireframe/>
            </mesh>
        </>
    )
}

// Generate turtle with arrow indicating current direction

const Turtle = (props) => {
    return (
        <mesh {...props}>
            <boxGeometry args={[0.8, 0.8, 0.8]} attach="geometry"/>
            <meshStandardMaterial color="orange" attach="material"/>
            <arrowHelper/>
        </mesh>
        
    )
}

// Read world data and place blocks and turtles in the right place

const World = ({tPos, tID}) => {
    const [worldData, setWorldData] = useState(wdb.getMap())
    const [tDir, setTDir] = useState()
    useEffect(() => {
        setWorldData(() => wdb.getMap())
        setTDir(() => {
            if (tID) {
                const cts = tdb.getTurtles()
                if (cts[tID] !== undefined) {
                    return cts[tID].dir
                }
            }
            return 1
        })
    }, [tPos])
    return (
        <Canvas>
            <OrbitControls target={[tPos.x, tPos.y, tPos.z]} />
            <ambientLight/>
            <Stars/>
            <pointLight position={[tPos.x + 10, tPos.y + 10, tPos.z + 10]}/>
            {Object.keys(worldData).map(key => {
                const coords = key.split(',')
                const [x, y, z] = coords
                return (
                    <Block position={[x, y, z]} col={worldData[key]}/>
                )
            })}
            <Turtle position={[ tPos.x, tPos.y, tPos.z]} rotation={[0, ((-Math.abs(tDir) / 2) - 0.5) * Math.PI , 0]}/>
        </Canvas>
    )
}

export default World