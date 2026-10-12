import { Component, type ErrorInfo, type ReactNode } from "react";
import Button from "../ui/Button";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    message: string;
}

export default class ErrorBoundary extends Component<
    Props,
    State
> {
    state: State = {
        hasError: false,
        message: "",
    };

    static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            message: error.message,
        };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error("Frontend error:", error, info);
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <main className="error-screen">
                    <h1>Something went wrong</h1>
                    <p>{this.state.message}</p>

                    <Button onClick={this.handleReload}>
                        Reload application
                    </Button>
                </main>
            );
        }

        return this.props.children;
    }
}