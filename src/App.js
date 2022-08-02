import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import GameBoard from './wordBoard/wordBoard';
import Login from './login';
import { ChakraProvider } from '@chakra-ui/react';

const App = () => {
    const [connection, setConnection] = useState('');
    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');
    const [Letters, setLetters] = useState();

    useEffect(() => {
        setLetters([
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
            'G',
            'H',
            'I',
            'J',
            'K',
            'L',
            'M',
            'N',
            'O',
            'P',
        ]);
    }, []);

    useEffect(() => {
        // const connection = new HubConnectionBuilder()
        //     .withUrl('https://localhost:7097/wordHub')
        //     .configureLogging(LogLevel.Information)
        //     .build();
        // async function start() {
        //     try {
        //         await connection.start();
        //         console.log('SignalR Connected.');
        //     } catch (err) {
        //         console.log(err);
        //         setTimeout(start, 5000);
        //     }
        // }
        // connection.onclose(async () => {
        //     await start();
        // });
        // // Start the connection.
        // start();
        // setConnection(connection);
    }, []);

    //replace true with player2 so that gamebaord shows when players are logged in

    return (
        <ChakraProvider>
            <div className="game-container">
                {/* add game items here */}
                <GameBoard Letters={Letters} />
            </div>
        </ChakraProvider>
    );
};

export default App;
