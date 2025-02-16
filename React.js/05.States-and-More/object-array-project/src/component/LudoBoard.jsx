import { useState } from "react";
import './Style.css';

function LudoBoard() {

    // Using multiple useState
    let [redMove, setRedMove] = useState(0);
    let [blueMove, setBlueMove] = useState(0);
    let [greenMove, setGreenMove] = useState(0);
    let [yellowMove, setYellowMove] = useState(0);

    function redCounter() {
        setRedMove(redMove + 1);
    }

    function blueCounter() {
        setBlueMove(blueMove + 1);
    }

    function greenCounter() {
        setGreenMove(greenMove + 1);
    }

    function yellowCounter() {
        setYellowMove(yellowMove + 1);
    }

    // Using objects in useState
    let [moves, setMoves] = useState( {red: 0, blue: 0, green: 0, yellow: 0} );

    let updateRedMove = () => {
        moves.red += 1;
        setMoves( { ...moves } );
    }

    let updateBlueMove = () => {
        moves.blue += 1;
        setMoves( { ...moves } );
    }

    let updateGreenMove = () => {
        moves.green += 1;
        setMoves( { ...moves } );
    }

    let updateYellowMove = () => {
        moves.yellow += 1;
        setMoves( { ...moves } );
    }

    return (

        <>

        <h2>Objects & Array</h2>
        <div className="full-box">

            {/* Column 1 */}
            <div className="ludo-board ludo-board-1">
                <h3>Using multiple useState </h3>

                <p>Red Moves: {redMove}</p>
                <button style={{backgroundColor: "red"}} onClick={redCounter}>+1</button>

                <p>Blue Moves: {blueMove}</p>
                <button style={{backgroundColor: "blue", color: "white"}} onClick={blueCounter}>+1</button>

                <p>Green Moves: {greenMove}</p>
                <button style={{backgroundColor: "green", color: "white"}} onClick={greenCounter}>+1</button>

                <p>Yellow Moves: {yellowMove}</p>
                <button style={{backgroundColor: "yellow"}} onClick={yellowCounter}>+1</button>
            </div>

            {/* Column 2 */}
            <div className="ludo-board ludo-board-2">
                <h3>Using objects in useState </h3>

                <p>Red Moves: {moves.red}</p>
                <button style={{backgroundColor: "red"}} onClick={updateRedMove}>+1</button>

                <p>Blue Moves: {moves.blue}</p>
                <button style={{backgroundColor: "blue", color: "white"}} onClick={updateBlueMove}>+1</button>

                <p>Green Moves: {moves.green}</p>
                <button style={{backgroundColor: "green", color: "white"}} onClick={updateGreenMove}>+1</button>

                <p>Yellow Moves: {moves.yellow}</p>
                <button style={{backgroundColor: "yellow"}} onClick={updateYellowMove}>+1</button>
            </div>

        </div>
        
        </>
    );
}

export default LudoBoard;