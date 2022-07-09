import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const StockSlider = ({ sharesPurchased, shares, Value, setValue, Action }) => {
    return (
        <Box width={300}>
            {Action == "buy" && (
                <Slider
                    value={Value}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    max={Math.trunc(shares)}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                />
            )}
            {Action == "sell" && (
                <Slider
                    value={Value}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    max={Math.trunc(sharesPurchased)}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                />
            )}
        </Box>
    );
};
export default StockSlider;
