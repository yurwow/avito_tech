import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/app/styles/index.css';
import App from '@/app/App.tsx';
import { ErrorBoundary } from '@/app/providers/ErrorBoundary';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from '@/app/providers/StoreProvider/config/store.ts';
import { Toast } from '@/shared/ui/Toast';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ErrorBoundary>
                <Provider store={store}>
                    <App />
                    <Toast />
                </Provider>
            </ErrorBoundary>
        </BrowserRouter>
    </StrictMode>,
);
