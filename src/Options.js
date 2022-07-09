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
    return (
        <div className="options">
            {bal < stockData.results[index].o && (
                <>
                    <Button
                        className="options"
                        disabled={true}
                        variant="contained"
                        onClick={() => {
                            setAction("buy");
                        }}
                    >
                        Buy
                    </Button>
                </>
            )}
            {bal > stockData.results[index].o && (
                <>
                    <Button
                        className="options"
                        variant="contained"
                        onClick={() => {
                            setAction("buy");
                        }}
                    >
                        Buy
                    </Button>
                </>
            )}

            {shares == 0 && (
                <>
                    <Button
                        className="options"
                        disabled={true}
                        variant="contained"
                        onClick={() => {
                            setAction("sell");
                        }}
                    >
                        Sell
                    </Button>
                </>
            )}
            {shares > 0 && (
                <>
                    <Button
                        className="options"
                        variant="contained"
                        onClick={() => {
                            setAction("sell");
                        }}
                    >
                        Sell
                    </Button>
                </>
            )}
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
