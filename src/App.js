import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import GameBoard from "./wordBoard";
import Login from "./login";

const App = () => {
    const [UserName, setUserName] = useState();
    let player2 = "";
    const [connection, setConnection] = useState("");

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

    return UserName ? (
        <>
            {/* add game items here */}
            <GameBoard />
        </>
    ) : (
        <Login setUserName={setUserName} connection={connection} />
    );
};

export default App;
