import { useState, ErrorInfo } from "react";

export default function useThrowAsyncError() {
	const [, setErrorState] = useState<ErrorInfo>();
	return (error: unknown) => {
		setErrorState(() => {
			throw error;
		});
	};
}
