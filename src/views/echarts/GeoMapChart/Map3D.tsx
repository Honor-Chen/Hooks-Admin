import React from "react";
import * as echarts from "echarts";
import "echarts-gl";
import ReactECharts from "echarts-for-react";

import xianGeoJson from "../xian.json";
import MapBGImg from "@/assets/images/map_bg.png";

// @ts-ignore
echarts.registerMap("xian", xianGeoJson);

// const data = xianGeoJson.features.map((item, idx) => ({
// 	name: item.properties.name,
// 	selected: idx === 0,
// 	value: [...item.properties.centroid, Math.random() * 10000]
// }));

const GeoOption = () => ({
	// geo3D: {
	// 	map: "xian", // 注册地图的名字
	// 	roam: true, // 开启鼠标缩放和平移漫游。默认不开启
	// 	itemStyle: {
	// 		color: "#4189f2", // 背景
	// 		opacity: 1, //透明度
	// 		borderWidth: 0.1, // 边框宽度
	// 		borderColor: "#eee", // 边框颜色
	// 		fontSize: 0.1 //
	// 	},
	// 	viewControl: {
	// 		distance: 120,
	// 		alpha: 70, // 上下旋转的角度
	// 		beta: 0 // 左右旋转的角度
	// 	}
	// },
	series: [
		{
			type: "map3D",
			map: "xian",
			label: {
				show: true,
				fontSize: 14,
				color: "#fff"
			},
			roam: true, // 开启鼠标缩放和平移漫游。默认不开启
			shading: "realistic", //注意这个属性为realistic 不然背景图无法出现
			itemStyle: {
				// color: "#4189f2", // 背景
				// color: {
				// 	type: "linear", // 指定为线性渐变
				// 	x: 0, // 渐变起点 x 坐标
				// 	y: 0, // 渐变起点 y 坐标
				// 	x2: 0, // 渐变终点 x 坐标
				// 	y2: 1, // 渐变终点 y 坐标
				// 	colorStops: [
				// 		{ offset: 0, color: "#4189f2" }, // 起始颜色
				// 		{ offset: 1, color: "#ffffff" } // 结束颜色
				// 	]
				// },
				// opacity: 1, //透明度
				borderWidth: 1, // 边框宽度
				borderColor: "red" // 边框颜色
			},
			viewControl: {
				distance: 120,
				alpha: 70, // 上下旋转的角度
				beta: 0 // 左右旋转的角度
			},
			realisticMaterial: {
				detailTexture: MapBGImg, // 纹理贴图
				textureTiling: 1 // 纹理平铺，1是拉伸，数字表示纹理平铺次数
			}
		}
	]
});
function Map3D() {
	return (
		<div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
			<ReactECharts echarts={echarts} option={GeoOption()} style={{ width: "100%", height: "100%", overflow: "hidden" }} />
		</div>
	);
}

export default Map3D;
