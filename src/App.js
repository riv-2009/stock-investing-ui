import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import GameBoard from "./wordBoard";
import Login from "./login";

const App = () => {
    const [connection, setConnection] = useState("");
    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");

    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl("https://localhost:7097/wordHub")
            .configureLogging(LogLevel.Information)
            .build();
        async function start() {
            try {
                await connection.start();
                console.log("SignalR Connected.");
            } catch (err) {
                console.log(err);
                setTimeout(start, 5000);
            }
        }
        connection.onclose(async () => {
            await start();
        });
        // Start the connection.
        start();

        setConnection(connection);
    }, []);

    return player2 ? (
        <>
            {/* add game items here */}
            <GameBoard player1={player1} player2={player2} />
        </>
    ) : (
        <Login
            connection={connection}
            setPlayer1={setPlayer1}
            setPlayer2={setPlayer2}
        />
    );
};

export default App;
