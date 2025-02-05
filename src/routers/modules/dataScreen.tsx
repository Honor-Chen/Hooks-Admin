import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { RouteObject } from "@/routers/interface";

// 数据大屏模块
const dataScreenRouter: Array<RouteObject> = [
	{
		path: "/dataScreen/index",
		element: lazyLoad(React.lazy(() => import("@/views/dataScreen/index"))),
		meta: {
			requiresAuth: true,
			title: "数据大屏",
			key: "dataScreen"
		}
	},
	{
		path: "/autofit/index",
		element: lazyLoad(React.lazy(() => import("@/views/autofit/index"))),
		meta: {
			requiresAuth: false,
			title: "数据大屏-AutoFit",
			key: "autoFit"
		}
	}
];

export default dataScreenRouter;
