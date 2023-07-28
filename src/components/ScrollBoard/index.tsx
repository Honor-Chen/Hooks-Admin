import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import classnames from "classnames";
import type classNames from "classnames";
import { merge, cloneDeep } from "lodash";
import { useInterval } from "ahooks";

import { co } from "@/utils/util";
import useAutoResize from "@/hooks/useAutoResize";

import "./style.less";

interface IConfig {
	header: string[];
	data: [];
	rowNum: number;
	headerBGC: string;
	oddRowBGC: string;
	evenRowBGC: string;
	waitTime: number;
	headerHeight: number;
	columnWidth: number[];
	align: Array<"left" | "center" | "right">;
	index: boolean;
	indexHeader: string;
	carousel: "single" | "page";
	hoverPause: boolean;
}

const defaultConfig: IConfig = {
	/**
	 * @description Board header 表头数据
	 * @type {Array<String>}
	 * @default header = []
	 * @example header = ['column1', 'column2', 'column3']
	 */
	header: [],
	/**
	 * @description Board data 表数据
	 * @type {Array<Array>}
	 * @default data = []
	 */
	data: [],
	/**
	 * @description Row num 表行数
	 * @type {Number}
	 * @default rowNum = 5
	 */
	rowNum: 5,
	/**
	 * @description Header background color 表头背景色
	 * @type {String}
	 * @default headerBGC = '#00BAFF'
	 */
	headerBGC: "#00BAFF",
	/**
	 * @description Odd row background color 奇数行背景色
	 * @type {String}
	 * @default oddRowBGC = '#003B51'
	 */
	oddRowBGC: "#003B51",
	/**
	 * @description Even row background color 偶数行背景色
	 * @type {String}
	 * @default evenRowBGC = '#003B51'
	 */
	evenRowBGC: "#0A2732",
	/**
	 * @description Scroll wait time 轮播时间间隔(ms)
	 * @type {Number}
	 * @default waitTime = 3000
	 */
	waitTime: 3000,
	/**
	 * @description Header height 表头高度
	 * @type {Number}
	 * @default headerHeight = 35
	 */
	headerHeight: 35,
	/**
	 * @description Column width 列宽度
	 * @type {Array<Number>}
	 * @default columnWidth = []
	 */
	columnWidth: [],
	/**
	 * @description Column align 列对齐方式
	 * @type {Array<String>}
	 * @default align = []
	 * @example align = ['left', 'center', 'right']
	 */
	align: ["center"],
	/**
	 * @description Show index 显示行号
	 * @type {Boolean}
	 * @default index = false
	 */
	index: false,
	/**
	 * @description index Header 行号表头
	 * @type {String}
	 * @default indexHeader = '#'
	 */
	indexHeader: "#",
	/**
	 * @description Carousel type 轮播方式。TODO:当 carousel 为 page 时，整屏滚动，不追加数据
	 * @type {String}
	 * @default carousel = 'single'
	 * @example carousel = 'single' | 'page'
	 */
	carousel: "single",
	/**
	 * @description Pause scroll when mouse hovered 悬浮暂停轮播
	 * @type {Boolean}
	 * @default hoverPause = true
	 * @example hoverPause = true | false
	 */
	hoverPause: true
};

// *构建表头元素
function calcHeaderData({ header, index, indexHeader }: any) {
	if (!header.length) {
		return [];
	}

	header = [...header];

	if (index) header.unshift(indexHeader);

	return header;
}

// *构建表格行元素
function calcRows({ data, index, headerBGC, rowNum }: any) {
	if (index) {
		data = data.map((row: any, i: number) => {
			row = [...row];

			const indexTag = `<span class="index" style="background-color: ${headerBGC};">${i + 1}</span>`;

			row.unshift(indexTag);

			return row;
		});
	}

	data = data.map((ceils: any, i: number) => ({ ceils, rowIndex: i }));

	const rowLength = data.length;

	if (rowLength > rowNum && rowLength < 2 * rowNum) {
		data = [...data, ...data];
	}

	return data.map((d: any, i: number) => ({ ...d, scroll: i }));
}

function calcAligns(mergedConfig: any, header: any) {
	const columnNum = header.length;

	let aligns = new Array(columnNum).fill("left");

	const { align } = mergedConfig;

	return merge(aligns, align);
}

interface IScrollBoardProps {
	onClick: (...args: any[]) => void;
	onMouseOver: (...args: any[]) => void;
	config: Partial<IConfig>;
	className: classNames.ArgumentArray;
}
const ScrollBoard = forwardRef<IScrollBoardProps, any>(function ScrollBoard(props, ref) {
	const { onClick, onMouseOver, config = {}, className, style } = props;

	// *容器的宽高、DOM节点
	const { width, height, domRef } = useAutoResize(ref);

	useInterval(
		() => {
			console.log(new Date().toLocaleTimeString());
		},
		1000,
		{ immediate: true }
	);

	// *mergedConfig: xx | header: xx | rows: xxx | widths: xxx | heights: xxx | aligns: xxx
	const [state, setState] = useState<any>({ mergedConfig: null, header: [], rows: [], widths: [], heights: [], aligns: [] });

	const { mergedConfig, header, rows, widths, heights, aligns } = state;

	const stateRef = useRef({
		...state,
		rowsData: [],
		avgHeight: 0,
		animationIndex: 0
	});

	Object.assign(stateRef.current, state);

	function calcWidths({ columnWidth, header }: any, rowsData: any) {
		const usedWidth = columnWidth.reduce((all: any, w: any) => all + w, 0);

		let columnNum = 0;
		if (rowsData[0]) {
			columnNum = rowsData[0].ceils.length;
		} else if (header.length) {
			columnNum = header.length;
		}

		const avgWidth = (width - usedWidth) / (columnNum - columnWidth.length);

		const widths = new Array(columnNum).fill(avgWidth);

		return merge(widths, columnWidth);
	}

	function calcHeights({ headerHeight, rowNum, data }: any, header: any) {
		let allHeight = height;

		if (header.length) allHeight -= headerHeight;

		const avgHeight = allHeight / rowNum;

		Object.assign(stateRef.current, { avgHeight });

		return new Array(data.length).fill(avgHeight);
	}

	function onResize() {
		if (!mergedConfig) return;

		const widths = calcWidths(mergedConfig, stateRef.current.rowsData);

		const heights = calcHeights(mergedConfig, header);

		const data = { widths, heights };

		Object.assign(stateRef.current, data);
		setState((state: any) => ({ ...state, ...data }));
	}

	function calcData() {
		const __mergedConfig = merge(cloneDeep(defaultConfig), config || {});
		// 表头元素[]
		const header = calcHeaderData(__mergedConfig);

		// 行元素，item: {ceil: [col1, col2, ...], rowIndex: 1, scroll: 1}
		const rows = calcRows(__mergedConfig);

		// 列宽，widths: [avgW, avgW, customW, avgW, ...]
		const widths = calcWidths(__mergedConfig, stateRef.current.rowsData);

		// 行高（除去：表头行高）
		const heights = calcHeights(__mergedConfig, header);

		// 每一列文字对齐方式
		const aligns = calcAligns(__mergedConfig, header);

		const data = {
			mergedConfig: __mergedConfig,
			header,
			rows,
			widths,
			aligns,
			heights
		};

		Object.assign(stateRef.current, data, {
			rowsData: rows,
			animationIndex: 0
		});

		setState((state: any) => ({ ...state, ...data }));
	}

	function emitEvent(handle: (...args: any[]) => void, ci: number, row: any, ceil: any) {
		const { ceils, rowIndex } = row;

		handle && handle({ row: ceils, ceil, rowIndex, columnIndex: ci });
	}
	function handleHover({ enter, ci, row, ceil }: any) {
		if (enter) emitEvent(onMouseOver, ci, row, ceil);

		if (!mergedConfig.hoverPause) return;

		const { pause, resume } = task.current;

		enter && pause && resume ? pause() : resume && resume();
	}

	function* animation(start = false) {
		let {
			avgHeight,
			animationIndex,
			mergedConfig: { waitTime, carousel, rowNum },
			rowsData
		} = stateRef.current;

		const rowLength = rowsData.length;

		if (start) yield new Promise(resolve => setTimeout(resolve, waitTime));

		const animationNum = carousel === "single" ? 1 : rowNum;

		let rows = rowsData.slice(animationIndex);
		rows.push(...rowsData.slice(0, animationIndex));
		rows = rows.slice(0, carousel === "page" ? rowNum * 2 : rowNum + 1);

		const heights = new Array(rowLength).fill(avgHeight);
		setState((state: any) => ({ ...state, rows, heights }));

		yield new Promise(resolve => setTimeout(resolve, 300));

		animationIndex += animationNum;

		const back = animationIndex - rowLength;
		if (back >= 0) animationIndex = back;

		const newHeights = [...heights];
		newHeights.splice(0, animationNum, ...new Array(animationNum).fill(0));

		Object.assign(stateRef.current, { animationIndex });
		setState((state: any) => ({ ...state, heights: newHeights }));
	}

	const getBackgroundColor = (rowIndex: number) => mergedConfig[rowIndex % 2 === 0 ? "evenRowBGC" : "oddRowBGC"];
	const task = useRef<any>({});

	useEffect(() => {
		// *构建数据完成
		calcData();

		let start = true;
		function* loop() {
			while (true) {
				yield* animation(start);

				start = false;

				const { waitTime } = stateRef.current.mergedConfig;

				yield new Promise(resolve => setTimeout(resolve, waitTime - 300));
			}
		}

		const {
			mergedConfig: { rowNum },
			rows: rowsData
		} = stateRef.current;
		const rowLength = rowsData.length;
		if (rowNum >= rowLength) return;

		task.current = co(loop);

		return task.current.end;
	}, [config, domRef.current]);

	useEffect(onResize, [width, height, domRef.current]);
	const classNames = useMemo(() => classnames("cl-scroll-board", className), [className]);

	return (
		<div className={classNames} style={style} ref={domRef}>
			{!!header.length && !!mergedConfig && (
				<div className="header" style={{ backgroundColor: `${mergedConfig.headerBGC}` }}>
					{header.map((headerItem: any, i: number) => (
						<div
							className="header-item"
							key={`${headerItem}-${i}`}
							style={{
								height: `${mergedConfig.headerHeight}px`,
								lineHeight: `${mergedConfig.headerHeight}px`,
								width: `${widths[i]}px`,
								textAlign: aligns[i]
							}}
							dangerouslySetInnerHTML={{ __html: headerItem }}
						/>
					))}
				</div>
			)}

			{!!mergedConfig && (
				<div className="rows" style={{ height: `${height - (header.length ? mergedConfig.headerHeight : 0)}px` }}>
					{rows.map((row: any, ri: number) => (
						<div
							className="row-item"
							key={`${row.toString()}-${row.scroll}`}
							style={{
								height: `${heights[ri]}px`,
								lineHeight: `${heights[ri]}px`,
								backgroundColor: `${getBackgroundColor(row.rowIndex)}`
							}}
						>
							{row.ceils.map((ceil: any, ci: number) => (
								<div
									className="ceil"
									key={`${ceil}-${ri}-${ci}`}
									style={{ width: `${widths[ci]}px`, textAlign: aligns[ci] }}
									dangerouslySetInnerHTML={{ __html: ceil }}
									// align={aligns[ci]}
									onClick={() => emitEvent(onClick, ci, row, ceil)}
									onMouseEnter={() => handleHover({ enter: true, ci, row, ceil })}
									onMouseLeave={() => handleHover({ enter: false })}
								/>
							))}
						</div>
					))}
				</div>
			)}
		</div>
	);
});

export default ScrollBoard;
