import { Stack, Typography } from '@mui/material';
import { Component, ErrorInfo, ReactNode, Suspense } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // eslint-disable-next-line  no-console
        console.info(error, errorInfo);
    }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;

        if (hasError) {
            return (
                <Suspense fallback="">
                    <Stack sx={{ width: '100wh', height: '100vh' }} justifyContent="center" alignItems="center">
                        <Typography variant="h2">Что-то пошло не так :(</Typography>
                    </Stack>
                </Suspense>
            );
        }

        return children;
    }
}
