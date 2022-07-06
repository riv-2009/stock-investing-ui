import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const StockSlider = ({ shares}) => {
    return (
        <Box width={300}>
            <Slider
                defaultValue={0}
                aria-label="Default"
                valueLabelDisplay="auto"
                max={Math.trunc(shares)}
            />
        </Box>
    );
};
export default StockSlider;
