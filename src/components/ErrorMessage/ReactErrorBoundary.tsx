/*
 *使用异常捕获插件：react-error-boundary
 */

import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import type { FallbackProps } from "react-error-boundary";

import { sleep } from "@/utils/util";

// const ErrorCmp = ({ subject }) => {
// 	return <h1>ErrorCmp{subject.toUpperCase()}</h1>;
// };

const AsyncErrorCmp = () => {
	const { showBoundary, resetBoundary } = useErrorBoundary();
	console.log("🌐 ~ file: ReactErrorBoundary.tsx:16 ~ AsyncErrorCmp ~ resetBoundary:", resetBoundary);
	const asyncEvent = () => {
		sleep()
			.then(res => {
				console.log("res :>> ", res);
			})
			.catch(error => {
				showBoundary(error);
			});
	};
	return (
		<h1>
			AsyncErrorCmp<button onClick={asyncEvent}>Click Me</button>
		</h1>
	);
};

const FallbackRender = ({ error, resetErrorBoundary }: FallbackProps) => {
	// console.log("🌐 ~ file: ReactErrorBoundary.tsx:20 ~ FallbackRender ~ resetErrorBoundary:", resetErrorBoundary);
	// Call resetErrorBoundary() to reset the error boundary and retry the render.

	return (
		<div role="alert">
			<p>Something went wrong:</p>
			<pre style={{ color: "red" }}>{error}</pre>
			<button onClick={resetErrorBoundary}>Try again</button>
		</div>
	);
};

const ReactErrorBoundary = () => {
	const logError = (error: Error, info: { componentStack: string }) => {
		console.log(
			"🌐 ~ file: ReactErrorBoundary.tsx:48 ~ logError ~ componentStack:",
			info.componentStack,
			info.componentStack.length
		);
		console.log("🌐 ~ file: ReactErrorBoundary.tsx:27 ~ logError ~ error:", error);
	};
	return (
		<ErrorBoundary
			fallbackRender={FallbackRender}
			onError={logError}
			onReset={details => {
				console.log("🌐 ~ file: ReactErrorBoundary.tsx:57 ~ ReactErrorBoundary ~ details:", details);
			}}
		>
			{/* <ErrorCmp /> */}
			<AsyncErrorCmp />
		</ErrorBoundary>
	);
};

export default ReactErrorBoundary;
