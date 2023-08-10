// @ts-nocheck
import { useCallback, useRef, useState, useMemo } from "react";

import { AgGridReact } from "ag-grid-react";
// !重要：只是修改了此文件中的许可证书
import "ag-grid-enterprise/dist/ag-grid-enterprise.cjs.js";
import "ag-grid-enterprise/styles/ag-grid.css";
import "ag-grid-enterprise/styles/ag-theme-alpine.css";

import MyTooltip from "./MyTooltip";
import "./index.less";

const sizeList = [50, 100, 300, 500, 1000];
const defaultPagination = { current: 1, size: sizeList[0], total: 0 };

function MyRenderer(params) {
	return (
		<span className="my-renderer">
			<img src="https://d1yk6z6emsz7qy.cloudfront.net/static/images/loading.gif" className="my-spinner" />
			{params.value}
		</span>
	);
}

const agGrid = () => {
	const gridRef = useRef();
	const [rowData, setRowData] = useState();

	/*
		minWidth: 指定
		headerCheckboxSelection: 表头复选框
		tooltipField: Tooltip 提示
		showDisabledCheckboxes: 展示禁用的复选框
	*/
	const columnDefs = useMemo(
		() => [
			{
				headerName: "序号",
				width: 100,
				checkboxSelection: true,
				headerCheckboxSelection: true,
				showDisabledCheckboxes: true,
				valueFormatter: params => {
					return `${parseInt(params.node.id) + 1}`;
				}
			},
			{ field: "athlete" },
			{ field: "age", cellRenderer: MyRenderer },
			{ field: "country" },
			{ field: "year" },
			{ field: "date" },
			{ field: "sport", tooltipField: "sport" },
			{ field: "gold" },
			{ field: "silver" },
			{ field: "bronze" },
			{ field: "total", minWidth: 300 }
		],
		[]
	);

	// 点击单元格
	const cellClickedListener = useCallback(event => {
		console.log("🌐 ~ file: index.tsx:16 ~ cellClickedListener ~ cellClicked:", event);
	}, []);

	const defaultColDef = useMemo(() => ({
		resizable: true,
		flex: 1, // Column 自适应表格容器
		editable: true, // 开启 Cell 编辑
		tooltipComponent: MyTooltip, // 自定义 Tooltip
		sortable: true // 排序
	}));

	/* useEffect(() => {
		fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
			.then(result => result.json())
			.then(rowData => setRowData(rowData));
	}, []); */

	// grid 准备OK
	const onGridReady = () => {
		console.log("onGridReady....");
		fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
			.then(result => result.json())
			.then(rowData => setRowData(rowData));
	};

	// 清空勾选项
	const onDeselectAll = useCallback(() => {
		gridRef.current.api.deselectAll();
	}, []);

	// 获取勾选项
	const onSelectionChanged = useCallback(event => {
		const rowList = event.api.getSelectedRows();
		console.log("🌐 ~ file: index.tsx:82 ~ onSelectionChanged ~ rowList:", rowList);
	}, []);

	// 可勾选复选框的 Row
	/* const isRowSelectable = useMemo(() => {
		// 只有 year === 2012 的行，复选框可操作
		return params => !!params.data && params.data.year === 2012;
	}, []); */

	// grid 第一次渲染
	/* const onFirstDataRendered = useCallback(() => {
		const nodesToSelect = [];
		gridRef.current.api.forEachNode(node => {
			if (node.data && node.data.year === 2012) {
				nodesToSelect.push(node);
			}
		});
		gridRef.current.api.setNodesSelected({
			nodes: nodesToSelect,
			newValue: true
		});
	}, []); */

	return (
		<div className="card content-box">
			<h1>Ag - Grid 🍓🍇🍈🍉</h1>
			<button onClick={onDeselectAll} style={{ width: "100px", margin: "20px auto" }}>
				清空勾选项
			</button>
			<div className="ag-theme-alpine" style={{ height: "100%" }}>
				<AgGridReact
					ref={gridRef}
					animateRows // sort 时是否有动画
					enableRangeSelection // 是否开启范围选中
					suppressRowClickSelection // 禁止点击 Row 时，复选框选中
					rowSelection="multiple" // 点击行，选中高亮
					rowData={rowData}
					columnDefs={columnDefs}
					// isRowSelectable={isRowSelectable} // 可勾选复选框的 Row
					defaultColDef={defaultColDef} // 全部 Column 属性
					onCellClicked={cellClickedListener} // 点击单元格
					onGridReady={onGridReady} // grid 准备OK
					// onFirstDataRendered={onFirstDataRendered} // grid 第一次渲染
					onSelectionChanged={onSelectionChanged}
					pagination // 是否分页
					paginationPageSize={defaultPagination.size}
				/>
			</div>
		</div>
	);
};

export default agGrid;
