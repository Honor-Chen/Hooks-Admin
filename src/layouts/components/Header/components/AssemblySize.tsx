import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { setAssemblySize } from "@/redux/modules/global/action";
import { connect } from "react-redux";

const AssemblySize = (props: any) => {
	const { assemblySize, setAssemblySize } = props;

	// 切换组件大小
	const handleMenu = (e: MenuInfo) => {
		setAssemblySize(e.key);
	};

	const items: MenuProps["items"] = [
		{
			key: "middle",
			disabled: assemblySize === "middle",
			label: <span>默认</span>
		},
		{
			key: "large",
			disabled: assemblySize === "large",
			label: <span>大型</span>
		},
		{
			key: "small",
			disabled: assemblySize === "small",
			label: <span>小型</span>
		}
	];
	return (
		<Dropdown menu={{ items, onClick: handleMenu }} placement="bottom" trigger={["click"]} arrow={true}>
			<i className="icon-style iconfont icon-contentright"></i>
		</Dropdown>
	);
};

const mapStateToProps = (state: any) => state.global;
const mapDispatchToProps = { setAssemblySize };
export default connect(mapStateToProps, mapDispatchToProps)(AssemblySize);
