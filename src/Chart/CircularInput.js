import React, { useState, useEffect } from 'react';
import {
    CircularInput,
    CircularTrack,
    CircularProgress,
    CircularThumb,
} from 'react-circular-input';

export default ({ value, setValue, total, sharesPurchased, Action }) => {
    const [circularAmount, setCircularAmount] = useState(value / total);

    const setValueWithScale = (newValue) => {
        if (Action === 'buy') {
            setCircularAmount(newValue);
            console.log(newValue * total);
            setValue(Math.floor(newValue * total));
        } else {
            setCircularAmount(newValue);
            console.log(newValue * sharesPurchased);
            setValue(Math.floor(newValue * sharesPurchased));
        }
    };

    useEffect(() => {
        if (Action === 'buy'){
            setCircularAmount(value / total);
        } else {
            setCircularAmount(value / sharesPurchased);
        }
    }, [value]);

    return (
        <CircularInput value={circularAmount} onChange={setValueWithScale}>
            <CircularTrack />
            <CircularProgress />
            <text
                x={100}
                y={100}
                textAnchor="middle"
                dy="0.3em"
                fontWeight="bold"
            >
                {value}
            </text>
        </CircularInput>
    );
};
