import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Произошла ошибка:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback ? this.props.fallback : <h1>Что-то пошло не так.</h1>;
        }

        return this.props.children;
    }
}