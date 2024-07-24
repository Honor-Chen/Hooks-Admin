import React from "react";
import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";

import xianGeoJson from "../xian.json";
// @ts-ignore
echarts.registerMap("xian", xianGeoJson);

const data = xianGeoJson.features.map((item, idx) => ({
	name: item.properties.name,
	selected: idx === 0,
	value: [...item.properties.centroid, Math.random() * 10000]
}));

const GeoOption = () => ({
	tooltip: {
		trigger: "item",
		formatter: "{b}<br/>{c} (p / km2)"
	},
	series: [
		{
			type: "map",
			map: "xian",
			label: {
				show: true
			},
			data: data
		}
	]
});

function GeoMapChart() {
	return (
		<div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
			<ReactECharts echarts={echarts} option={GeoOption()} style={{ width: "100%", height: "100%", overflow: "hidden" }} />
		</div>
	);
}

export default GeoMapChart;
