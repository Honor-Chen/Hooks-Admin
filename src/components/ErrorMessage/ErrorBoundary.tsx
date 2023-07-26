import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}
	static getDerivedStateFromError(error: ErrorInfo) {
		console.log("🌐 ~ file: ErrorBoundary.tsx:13 ~ ErrorBoundary ~ getDerivedStateFromError ~ error:", error);
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.log("🌐 ~ file: ErrorBoundary.tsx:23 ~ ErrorBoundary ~ componentDidCatch ~ errorInfo:", errorInfo);
		console.log("🌐 ~ file: ErrorBoundary.tsx:23 ~ ErrorBoundary ~ componentDidCatch ~ error:", error);
	}

	render() {
		if (this.state.hasError) {
			return this.props.fallback || <>Oh!!! has Error...</>;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
