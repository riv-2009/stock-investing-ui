import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Prompt from "./Prompt";
import BankAccount from "./BankAccount";
import StockSlider from "./StockSlider";
import PieChart from "./PieChart";
import InvestmentAccount from "./InvestmentAccout";
import { useState, useEffect } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

function App() {
    const [message, setMessage] = useState("Enter a ticker symbol");
    const [input, setInput] = useState("");
    const [connection, setConnection] = useState("");
    const [bal, setBal] = useState(10000);
    const [stockOpenMsg, setStockOpenMsg] = useState("");
    const [stockData, setStockData] = useState("");
    const [index, setIndex] = useState(0);
    const [shares, setShares] = useState(0);
    const [investmentBal, setInvestmentBal] = useState(0);

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

        if (stockData == "") {
            connection
                .invoke("StockTickerMessage", input)
                .catch((err) => console.error(err.toString()));
            connection.on("ReceiveMessage", (input) => {
                let tmp = JSON.parse(input);
                console.log(tmp);
                setStockData(tmp);
                setStockOpenMsg(
                    `${tmp.ticker} stock price opened at $${tmp.results[index].o}`
                );
                setMessage("Buy, sell, hold, or quit?");
                setInput("");
            });
        } else {
            switch (input.toLowerCase()) {
                case "buy":
                    let shares = Number(bal) / stockData.results[index].o;
                    setShares(shares);
                    setStockOpenMsg("");
                    setMessage(
                        `You can buy ${Math.trunc(
                            shares
                        )} shares, how many would you like?`
                    );
                    setInput("");
                    break;
                case "sell":
                    setMessage("sell");
                    break;
                case "hold":
                    setMessage("hold");
                    break;
                case "quit":
                    setMessage("quit");
                    break;
                default:
                    setMessage("Invalid choice, try again.");
                    break;
            }
        }
    };

    return (
        <div className="container">
            <Prompt
                handleSubmit={handleSubmit}
                input={input}
                message={message}
                stockOpenMsg={stockOpenMsg}
                setInput={setInput}
            />
            <StockSlider
                shares={shares}
            />
            <PieChart />
            <BankAccount bal={bal} />
            <InvestmentAccount bal={investmentBal} />
        </div>
    );
}

export default App;
