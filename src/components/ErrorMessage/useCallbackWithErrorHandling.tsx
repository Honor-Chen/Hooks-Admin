import { useState } from "react";

export default function useCallbackWithErrorHandling(callback: (...args: unknown[]) => any) {
	const [, setErrorState] = useState();

	return (...restProps: unknown[]) => {
		try {
			callback(restProps);
		} catch (error) {
			setErrorState(() => {
				throw error;
			});
		}
	};
}
