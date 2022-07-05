import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Prompt from "./Prompt";
import { useState, useEffect } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

function App() {
    const [message, setMessage] = useState("Enter a ticker symbol");
    const [input, setInput] = useState("");
    const [connection, setConnection] = useState();

    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl("https://localhost:7097/stockHub")
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

    const handleSubmit = (e) => {
        e.preventDefault();

        connection
            .invoke("StockTickerMessage", input)
            .catch((err) => console.error(err.toString()));
        connection.on("ReceiveMessage", (input) => {
            let tmp = JSON.parse(input);
            console.log(tmp);
            //only get 7 days of stock data,
            //the number of day's returned varies depending if the stock market was open
            for (let index = 0; index < 7; index++) {
                console.log(tmp.results[index].o);
            }
        });
    };

    return (
        <div className="container">
            <Prompt
                handleSubmit={handleSubmit}
                input={input}
                message={message}
                setInput={setInput}
            />
        </div>
    );
}

export default App;
