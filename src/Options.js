import { Button } from "@mui/material";
import "./App.css";

const InvestOptions = ({
    Action,
    setAction,
    shares,
    stockData,
    index,
    bal,
}) => {
    let isBuyEnabled = (bal, price) => {
        if (bal < price) return false;
        return true;
    };

    let isSellEnabled = (shares) => {
        if (shares == 0) return false;
        return true;
    };

    return (
        <div className="options">
            <Button
                className="options"
                variant="contained"
                disabled={!isBuyEnabled(bal, stockData.results[index].o)}
                onClick={() => {
                    setAction("buy");
                }}
            >
                Buy
            </Button>
            <Button
                className="options"
                disabled={!isSellEnabled(shares)}
                variant="contained"
                onClick={() => {
                    setAction("sell");
                }}
            >
                Sell
            </Button>
            <Button
                className="options"
                variant="contained"
                onClick={() => {
                    setAction("hold");
                }}
            >
                Hold
            </Button>
            <Button
                className="options"
                variant="contained"
                onClick={() => {
                    setAction("quit");
                }}
            >
                Quit
            </Button>
        </div>
    );
};

export default InvestOptions;
