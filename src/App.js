import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Prompt from "./Prompt";
import BankAccount from "./BankAccount";
import StockSlider from "./StockSlider";
import PieChart from "./PieChart";
import InvestmentAccount from "./InvestmentAccout";
import { useState, useEffect } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import InvestOptions from "./Options";
import { Button, Input } from "@mui/material";

function App() {
    const [message, setMessage] = useState("");
    const [input, setInput] = useState("");
    const [connection, setConnection] = useState("");
    const [bal, setBal] = useState(10000);
    const [stockOpenMsg, setStockOpenMsg] = useState("");
    const [stockData, setStockData] = useState("");
    const [index, setIndex] = useState(0);
    const [shares, setShares] = useState(0);
    //entered 25 shares purchased for testing slider, we will reset it to 0 on load later
    const [sharesPurchased, setSharesPurchased] = useState(25);
    const [Value, setValue] = useState(7);

    const [investmentBal, setInvestmentBal] = useState(0);
    const [Action, setAction] = useState("");

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

    useEffect(() => {
        console.log(Action);
        if (stockData && Action == "buy") {
            let shares = Number(bal) / stockData.results[index].o;
            setShares(shares);
            setStockOpenMsg("");
            setMessage(
                `You can buy ${Math.trunc(
                    shares
                )} shares, how many would you like?`
            );
        } else if (stockData && Action == "sell") {
            setStockOpenMsg("");
            setMessage(
                `You can sell ${Math.trunc(
                    sharesPurchased
                )} shares, how many would you like to sell?`
            );
        } else if (stockData && Action == "hold") {
            setStockOpenMsg("");
            setMessage("hold and move to next day");
        }
    }, [Action]);

    const handleAction = () => {
        //console.log(Action)
        switch (Action) {
            case "buy":
                setMessage("buy and move to next day");
                // move index to next day and set next day stock data
                break;
            case "sell":
                setMessage("sell and move to next day");
                // move index to next day and set next day stock data

                break;
            case "hold":
                setMessage("hold and move to next day");
                // move index to next day and set next day stock data

                break;
            case "quit":
                setMessage(
                    "quit sell remaining shares at next day opening and close game"
                );
                break;
            default:
                setMessage("Invalid choice, try again.");
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //if stock data is not set pull from signalR
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
        }
    };

    return (
        <div className="container">
            {stockData === "" && (
                <Prompt
                    handleSubmit={handleSubmit}
                    input={input}
                    stockOpenMsg={stockOpenMsg}
                    setInput={setInput}
                />
            )}
            {stockOpenMsg}
            <br />
            {message}
            {stockData !== "" && Action == "" && (
                <>
                    <br />
                    <InvestOptions action={Action} setAction={setAction} />
                </>
            )}
            {(Action == "buy" || Action == "sell") && (
                <div className="value-options">
                    <Input value={Value} name="input-value" />
                    <StockSlider
                        setValue={setValue}
                        value={Value}
                        shares={shares}
                        setInput={setInput}
                        Action={Action}
                        sharesPurchased={sharesPurchased}
                    />

                    <PieChart />
                    <Button
                        name="action"
                        variant="contained"
                        onClick={() => {
                            handleAction();
                        }}
                    >
                        Submit
                    </Button>
                </div>
            )}
            {stockData !== "" && (
                <>
                    <InvestmentAccount
                        bal={investmentBal}
                        shares={sharesPurchased}
                    />
                    <BankAccount bal={bal} />
                </>
            )}
        </div>
    );
}

export default App;
