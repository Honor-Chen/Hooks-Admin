import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

// 超级表格模块
const proTableRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "超级表格"
		},
		children: [
			{
				path: "/proTable/useHooks", // 没有适配动态路由
				element: lazyLoad(React.lazy(() => import("@/views/proTable/useHooks/index"))),
				meta: {
					requiresAuth: true,
					title: "使用 Hooks",
					key: "useHooks"
				}
			},
			{
				path: "/proTable/useComponent",
				element: lazyLoad(React.lazy(() => import("@/views/proTable/useComponent/index"))),
				meta: {
					requiresAuth: true,
					title: "使用 Component",
					key: "useComponent"
				}
			},
			{
				path: "/proTable/agGrid",
				element: lazyLoad(React.lazy(() => import("@/views/proTable/agGrid/index"))),
				meta: {
					requiresAuth: false,
					title: "使用 AG Grid",
					key: "agGrid"
				}
			}
		]
	}
];

export default proTableRouter;
