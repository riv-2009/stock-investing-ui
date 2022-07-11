import { useEffect, useRef } from "react";
// import d3 from "https://d3js.org/d3.v4.min.js";
import * as d3 from "d3";

export const Chart = () => {
	const ref = useRef(null);
	var data = [
		{ index: 0, value: 3 },
		{ index: 1, value: 5 },
		{ index: 2, value: 12 },
		{ index: 3, value: 8 },
		{ index: 4, value: 20 },
		{ index: 5, value: 7 },
		{ index: 6, value: 2 },
		{ index: 7, value: 15 },
	];

	//--------------- HORIZONTAL --------------------

	var widthX = 300,
		heightX = 250,
		delim = 4;

	var scaleX = d3.scaleLinear().domain([0, 21]).rangeRound([0, widthX]);

	var y = d3.scaleLinear().domain([0, data.length]).rangeRound([0, heightX]);

	useEffect(() => {
		var svgX = d3
			.select(ref.current)
			.append("svg")
			.attr("width", widthX)
			.attr("height", heightX)
			.append("g");

		svgX
			.append("rect")
			.attr("x", 0)
			.attr("y", 0)
			.style("stroke", "black")
			.style("fill", "white")
			.attr("width", widthX)
			.attr("height", heightX);

		// Moveable barChart

		var brushX = d3
			.brushX()
			.extent(function (d, i) {
				return [
					[0, y(i) + delim / 2],
					[widthX, y(i) + heightX / data.length - delim / 2],
				];
			})
			.on("brush", brushmoveX)
			.on("end", brushendX);

		var svgbrushX = svgX
			.selectAll(".brush")
			.data(data)
			.enter()
			.append("g")
			.attr("class", "brush")
			.append("g")
			.call(brushX)
			.call(brushX.move, function (d) {
				return [0, d.value].map(scaleX);
			});

		svgbrushX
			.append("text")
			.attr("x", function (d) {
				return scaleX(d.value) - 10;
			})
			.attr("y", function (d, i) {
				return y(i) + y(0.5);
			})
			.attr("dy", ".35em")
			.attr("dx", -15)
			.style("fill", "black")
			.text(function (d) {
				return d3.format(".0f")(Math.floor(d.value));
			});

		function brushendX() {
			if (!d3.event.sourceEvent) return;
			if (d3.event.sourceEvent.type === "brush") return;
			if (!d3.event.selection) {
				// just in case of click with no move
				svgbrushX.call(brushX.move, function (d) {
					console.log(d.value);
					return [0, d.value].map(scaleX);
				});
			}
		}

		function brushmoveX() {
			if (!d3.event.sourceEvent) return;
			if (d3.event.sourceEvent.type === "brush") return;
			if (!d3.event.selection) return;

			var d0 = d3.event.selection.map(scaleX.invert);
			var d = d3.select(this).select(".selection");

			d.datum().value = d0[1]; // Change the value of the original data

			update();
		}

		function update() {
			svgbrushX
				.call(brushX.move, function (d) {
					return [0, d.value].map(scaleX);
				})
				.selectAll("text")
				.attr("x", function (d) {
					return scaleX(d.value) - 10;
				})
				.text(function (d) {
					return d3.format(".2")(Math.floor(d.value));
				});
		}
	}, []);

	return <div ref={ref} />;
};
