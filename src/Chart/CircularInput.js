import React, { useState, useEffect } from "react";
import {
	CircularInput,
	CircularTrack,
	CircularProgress,
	CircularThumb,
} from "react-circular-input";

export default ({ value, setValue, total, amountOwned }) => {
	const [circularAmount, setCircularAmount] = useState(value / total);

	const setValueWithScale = (newValue) => {
		setCircularAmount(newValue);
		console.log(newValue * total);
		setValue(Math.floor(newValue * total));
	};

	useEffect(() => {
		setCircularAmount(value / total);
	}, [value]);

	return (
		<CircularInput value={circularAmount} onChange={setValueWithScale}>
			<CircularTrack />
			<CircularProgress />
			<text x={100} y={100} textAnchor="middle" dy="0.3em" fontWeight="bold">
				{value}
			</text>
		</CircularInput>
	);
};
