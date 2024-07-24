import { useLayoutEffect, useRef } from "react";

// TODO:: 将方法统一提到本 Hooks 中
import { debounce } from "@/utils/util";

const W = 1920;
const H = 1080;

export default function useAutoScreen() {
	const domRef = useRef<HTMLDivElement>(null);

	// * 浏览器监听 resize 事件
	const resize = () => {
		if (domRef.current) {
			domRef.current.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
		}
	};

	// * 根据浏览器大小推断缩放比例
	const getScale = (width = W, height = H) => {
		let ww = window.innerWidth / width;
		let wh = window.innerHeight / height;
		return ww < wh ? ww : wh;
	};

	useLayoutEffect(() => {
		if (domRef.current) {
			domRef.current.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
			domRef.current.style.width = `${W}px`;
			domRef.current.style.height = `${H}px`;
		}

		const debounceResizeFun = debounce(resize, 1000);

		// 为浏览器绑定事件
		window.addEventListener("resize", debounceResizeFun);
		return () => {
			window.removeEventListener("resize", debounceResizeFun);
		};
	}, []);

	return { domRef };
}
