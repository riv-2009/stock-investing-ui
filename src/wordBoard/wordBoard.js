import { useEffect, useState } from 'react';
import './wordBoard.css';

const GameBoard = ({ Letters }) => {
    const [SelectedTiles, setSelectedTiles] = useState([]);
    const [CurrentTile, setCurrentTile] = useState();




    useEffect(() => {
        console.log(Letters);
    }, [Letters]);

    const handleTileClick = (letter, index) => {
        setCurrentTile(letter, index)
    };

    const availableTiles = () =>{
        return 
    }

    return Letters ? (
        <div className="board-container">
            {Letters.map((letter, index) => (
                <div
                    className="board-tile"
                    onClick={() => {
                        handleTileClick(letter, index);
                    }}
                    key={index}
                    id={index}
                    color={'green'}
                >
                    {letter}-{index}
                </div>
            ))}
        </div>
    ) : (
        <>Loading</>
    );
};

export default GameBoard;
