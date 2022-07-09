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
    const [message, setMessage] = useState("Enter a ticker symbol:");
    const [day, setDay] = useState(1);
    const [dayMsg, setDayMsg] = useState("");
    const [input, setInput] = useState("");
    const [connection, setConnection] = useState("");
    const [bal, setBal] = useState(10000);
    const [stockData, setStockData] = useState("");
    const [index, setIndex] = useState(0);
    const [sharesPurchaseLimit, setSharesPurchaseLimit] = useState(0);
    const [sharesPurchased, setSharesPurchased] = useState(0);
    const [Value, setValue] = useState(0);
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
        if ((stockData && Action == "quit") || day == 8) {
            setAction("quit");
            let balance = sharesPurchased * stockData.results[index].o + bal;
            setDayMsg(
                `Bank account balance: $${balance.toLocaleString("en-US")}`
            );
            let gain = (balance - 10000).toFixed(2);
            if (day === 1) {
                setMessage(`You never played.`);
            } else if (gain > 0) {
                setMessage(`Your account gained $${gain} in ${day} day's.`);
            } else {
                setMessage(`Your account lost $${gain} in ${day} day's.`);
            }
        } else if (stockData && Action == "buy") {
            setDayMsg("");
            let shares = Number(bal) / stockData.results[index].o.toFixed(2);
            setSharesPurchaseLimit(shares);
            setMessage(
                `You can buy ${Math.trunc(
                    shares
                )} shares, how many would you like?`
            );
        } else if (stockData && Action == "sell") {
            setDayMsg("");
            setMessage(
                `You can sell ${Math.trunc(
                    sharesPurchased
                )} shares, how many would you like to sell?`
            );
        } else if (stockData && Action == "hold") {
            setAction("");
            setDay(day + 1);
            setIndex(index + 1);
            setInvestmentBal(sharesPurchased * stockData.results[index + 1].o);
            setDayMsg(`Day: ${day + 1}`);
            setMessage(
                `${stockData.ticker} stock price opened at $${stockData.results[
                    index + 1
                ].o.toFixed(2)}`
            );
        }
    }, [Action]);

    const handleAction = () => {
        setAction("");
        setValue(0);
        setDay(day + 1);
        setIndex(index + 1);
        setDayMsg(`Day: ${day + 1}`);
        switch (Action) {
            case "buy":
                setBal(bal - Value * stockData.results[index].o);
                setInvestmentBal(Value * stockData.results[index + 1].o);
                setSharesPurchased(Value + sharesPurchased);
                setMessage(
                    `${
                        stockData.ticker
                    } stock price opened at $${stockData.results[
                        index + 1
                    ].o.toFixed(2)}`
                );
                // move index to next day and set next day stock data
                break;
            case "sell":
                setBal(bal + Value * stockData.results[index].o);
                setSharesPurchased(sharesPurchased - Value);
                setInvestmentBal(Value * stockData.results[index + 1].o);
                setMessage(
                    `${
                        stockData.ticker
                    } stock price opened at $${stockData.results[
                        index + 1
                    ].o.toFixed(2)}`
                );
                // move index to next day and set next day stock data

                break;
            case "hold":
                break;
            case "quit":
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
                if (tmp.queryCount == 0) {
                    setMessage("Invaild ticker try again:");
                    setInput("");
                } else {
                    setStockData(tmp);
                    setDayMsg(`Day ${day}:`);
                    setMessage(
                        `${tmp.ticker} stock price opened at $${tmp.results[
                            index
                        ].o.toFixed(2)}`
                    );
                }
            });
        }
    };

    return (
        <div className="container m-4">
            {stockData === "" && (
                <Prompt
                    message={message}
                    handleSubmit={handleSubmit}
                    input={input}
                    setInput={setInput}
                />
            )}
            {stockData !== "" && stockData.queryCount !== 0 && (
                <>
                    <h5>{dayMsg}</h5>
                    <h5>{message}</h5>
                </>
            )}

            {stockData !== "" && Action !== "quit" && (
                <>
                    <InvestmentAccount
                        bal={investmentBal}
                        shares={sharesPurchased}
                    />
                    <BankAccount bal={bal} />
                </>
            )}
            {stockData !== "" && Action == "" && (
                <>
                    <br />
                    <InvestOptions
                        action={Action}
                        setAction={setAction}
                        shares={sharesPurchased}
                        stockData={stockData}
                        index={index}
                        bal={bal}
                    />
                </>
            )}
            {(Action == "buy" || Action == "sell") && (
                <div className="value-options">
                    <Input
                        variant="outlined"
                        type="text"
                        className="ticker-input"
                        value={Value}
                        onKeyUp={(e) => {
                            const num = parseInt(e.target.value);
                            if (!isNaN(num)) {
                                setValue(e.target.value);
                            }
                        }}
                        onChange={(e) => {
                            setValue(e.target.value);
                        }}
                    />
                    <StockSlider
                        setValue={setValue}
                        Value={Value}
                        shares={sharesPurchaseLimit}
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
        </div>
    );
}

export default App;
