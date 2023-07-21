import { Login } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
import qs from "qs";

import http from "@/api";
import mockMenuJSON from "@/api/modules/menu.json";

export function sleep(payload: any): Promise<{ msg: string; code: number; data: any }> {
	return new Promise(resolve =>
		setTimeout(() => {
			resolve(payload);
		}, Math.floor(Math.random() * 1000))
	);
}

/**
 * @name 登录模块
 */
// * 用户登录接口
export const loginApi = (params: Login.ReqLoginForm) => {
	return sleep({ code: 200, data: { access_token: "bqddxxwqmfncffacvbpkuxvwvqrhln" }, msg: "成功" });
	return http.post<Login.ResLogin>(PORT1 + `/login`, params);
	return http.post<Login.ResLogin>(PORT1 + `/login`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
	return http.post<Login.ResLogin>(PORT1 + `/login`, qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
	return http.post<Login.ResLogin>(PORT1 + `/login`, params, { headers: { noLoading: true } }); // 控制当前请求不显示 loading
};

// * 获取按钮权限
export const getAuthorButtons = () => {
	return sleep({ code: 200, data: { useHooks: { add: true, delete: true } }, msg: "成功" });
	return http.get<Login.ResAuthButtons>(PORT1 + `/auth/buttons`);
};

// * 获取菜单列表
export const getMenuList = () => {
	return sleep(mockMenuJSON);
	return http.get<Menu.MenuOptions[]>(PORT1 + `/menu/list`);
};
