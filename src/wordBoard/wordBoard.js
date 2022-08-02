import { useEffect, useState } from 'react';
import './wordBoard.css';
import { Box, Center, Spinner } from '@chakra-ui/react';

const GameBoard = ({ Letters }) => {
    const [SelectedTiles, setSelectedTiles] = useState([]);
    const [CurrentTile, setCurrentTile] = useState({
        letter: null,
        TileIndex: null,
    });
    const [AvailableTiles, setAvailableTiles] = useState([]);
    const [Style, setStyle] = useState('Blue');
    const [Message, setMessage] = useState();

    useEffect(() => {
        setTiles();
    }, [CurrentTile]);

    const handleTileClick = (letter, index) => {
        setCurrentTile({ letter, TileIndex: index });
        setSelectedTiles([index, ...SelectedTiles]);
    };

    const setTiles = () => {
        switch (CurrentTile.TileIndex) {
            case 0:
                setAvailableTiles([1, 4, 5]);
                break;
            case 1:
                setAvailableTiles([0, 1, 4, 5, 6, 2]);
                break;
            case 2:
                setAvailableTiles([1, 5, 6, 7, 3]);
                break;
            case 3:
                setAvailableTiles([2, 6, 7]);
                break;
            case 4:
                setAvailableTiles([0, 1, 5, 8, 9]);
                break;
            case 5:
                setAvailableTiles([0, 1, 2, 6, 10, 9, 8, 4]);
                break;
            case 6:
                setAvailableTiles([1, 2, 3, 5, 7, 9, 10, 11]);
                break;
            case 7:
                setAvailableTiles([3, 2, 6, 10, 11]);
                break;
            case 8:
                setAvailableTiles([4, 5, 9, 12, 13]);
                break;
            case 9:
                setAvailableTiles([4, 5, 6, 8, 10, 12, 13, 14]);
                break;
            case 10:
                setAvailableTiles([5, 6, 7, 9, 11, 13, 14, 15]);
                break;
            case 11:
                setAvailableTiles([6, 7, 10, 14, 15]);
                break;
            case 12:
                setAvailableTiles([8, 9, 13]);
                break;
            case 13:
                setAvailableTiles([8, 9, 10, 12, 14]);
                break;
            case 14:
                setAvailableTiles([13, 9, 10, 11, 15]);
                break;
            case 15:
                setAvailableTiles([14, 10, 11]);
                break;
            default:
                break;
        }
        return;
    };


    const colorStyle = (index) => {
        for(let i in AvailableTiles){
            if (AvailableTiles[i] === index){
                return 'lightblue'
            }
        }
        if (index > -1) {
            return 'lightgreen';
        }
    };

    return Letters ? (
        <Box className="board-container">
            {Letters.map((letter, index) => (
                <Box
                    className={'board-tile '}
                    backgroundColor={colorStyle(index)}
                    onClick={() => {
                        handleTileClick(letter, index);
                    }}
                    key={index}
                    id={index}
                    color={'green'}
                >
                    {letter}-{index}
                </Box>
            ))}
            <Center>{Message}</Center>
            {Message}
        </Box>
    ) : (
        <Center>
            <h1>
                <Spinner size="lg">Loading...</Spinner>
            </h1>
        </Center>
    );
};

export default GameBoard;
