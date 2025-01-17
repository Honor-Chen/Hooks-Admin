import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";

import { HOME_URL } from "@/config/config";
import { Link } from "react-router-dom";

const BreadcrumbNav = (props: any) => {
	const { pathname } = useLocation();
	const { themeConfig } = props.global;
	const breadcrumbList = props.breadcrumb.breadcrumbList[pathname] || [];
	const breadcrumbItems = [{ key: "home", title: <Link to={HOME_URL}>首页</Link> }].concat(
		breadcrumbList.reduce((prev: object[], cur: string) => (cur !== "首页" && prev.push({ key: cur, title: cur }), prev), [])
	);
	return !themeConfig.breadcrumb && <Breadcrumb items={breadcrumbItems} />;
};

const mapStateToProps = (state: any) => state;
export default connect(mapStateToProps)(BreadcrumbNav);
