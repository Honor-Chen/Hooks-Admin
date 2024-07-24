import { Navigate, useRoutes } from "react-router-dom";
import { RouteObject } from "@/routers/interface";
import Login from "@/views/login/index";

// * 导入所有router
const metaRouters = import.meta.glob("./modules/*.tsx", { eager: true });

// * 处理路由
export const routerArray: RouteObject[] = [];

for (const module of Object.values(metaRouters)) {
	const moduleObj = module as { [key: string]: any };
	Object.keys(moduleObj).forEach((key: string) => {
		routerArray.push(...moduleObj[key]);
	});
}

// console.log(routerArray);

export const rootRouter: RouteObject[] = [
	{
		path: "/",
		element: <Navigate to="/login" />
	},
	{
		path: "/login",
		element: <Login />,
		meta: {
			requiresAuth: false,
			title: "登录页",
			key: "login"
		}
	},
	...routerArray,
	{
		path: "*",
		element: <Navigate to="/404" />
	}
];

const Router = () => {
	// console.log(rootRouter);
	const routes = useRoutes(rootRouter as any);
	return routes;
};

export default Router;
