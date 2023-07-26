import { FC, ReactNode, useEffect, useState } from "react";

import ErrorBoundary from "@/components/ErrorMessage/ErrorBoundary";
import useThrowAsyncError from "./useThrowAsyncError";
import useCallbackWithErrorHandling from "./useCallbackWithErrorHandling";

const Cmp = () => {
	const [count, setCount] = useState(1);
	useEffect(() => {
		if (count >= 2) {
			// *这个错误将会被错误边界组件捕获
			throw new Error("自定义错误");
		}
	}, [count]);

	const onError = () => {
		// *方法 | Promise 中抛出的错误无法捕获到
		throw new Error("我是方法中抛出的错误");
	};

	return (
		<>
			<button onClick={() => setCount(count + 1)}>在生命周期中抛出错误</button>
			<button onClick={onError}>在方法中抛出错误</button>
		</>
	);
};
const Cmp1: FC<{ fallback: ReactNode }> = ({ fallback }) => {
	const [hasError, setHasError] = useState(false);

	const onError = () => {
		// *方法 | Promise 中抛出的错误通过 try...catch 捕获
		try {
			throw new Error("OH....This is Function Error, Oh my God");
		} catch (error) {
			setHasError(true);
		}
		throw new Error("我是方法中抛出的错误");
	};

	if (hasError) return fallback || null;

	return (
		<>
			<h1>捕获到错误后，改变 state 状态，展示 fallback </h1>
			<button onClick={onError}>Click Me</button>
		</>
	);
};

const Cmp2 = () => {
	const throwAsyncError = useThrowAsyncError();
	const onError = () => {
		// *方法 | Promise 中，将 catch 中捕获到的错误抛出到组件的生命周期中，触发 ErrorBoundary
		// *也可以用在 async / await 或者 Promise 中
		try {
			throw new Error("OH....This is Function Error, Oh my God");
		} catch (error) {
			throwAsyncError(error);
		}
	};
	return (
		<>
			<h1>方法 | Promise 中，将 catch 中捕获到的错误抛出到组件的生命周期中，触发 ErrorBoundary </h1>
			<button onClick={onError}>Click Me</button>
		</>
	);
};

const Cmp3 = () => {
	const onError = () => {
		// *方法 | Promise 中，将 catch 中捕获到的错误抛出到组件的生命周期中，触发 ErrorBoundary
		// *也可以用在 async / await 或者 Promise 中
		throw new Error("OH....This is Function Error, Oh my God");
	};
	const callbackWithErrorHandling = useCallbackWithErrorHandling(onError);

	return (
		<>
			<h1>方法 | Promise 中，将 catch 中捕获到的错误抛出到组件的生命周期中，触发 ErrorBoundary </h1>
			<button onClick={callbackWithErrorHandling}>Click Me</button>
		</>
	);
};

const ErrorComponents = () => {
	return (
		<ErrorBoundary>
			<div>ErrorComponents</div>
			<Cmp />
			<Cmp1 fallback={<div>方法中报错后，展示出来的内容</div>} />
			<Cmp2 />
			<Cmp3 />
		</ErrorBoundary>
	);
};

export default ErrorComponents;
