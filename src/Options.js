import { Button } from "@mui/material";
import "./App.css";


const InvestOptions = ({Action, setAction}) => {

    return (
        <div className="options">
            <Button className="options" variant="contained" onClick={()=>{setAction('buy')}}>Buy</Button>
            <Button className="options" variant="contained" onClick={()=>{setAction('sell')}}>Sell</Button>
            <Button className="options" variant="contained" onClick={()=>{setAction('hold')}}>Hold</Button>
        </div>
    );
};

export default InvestOptions;
