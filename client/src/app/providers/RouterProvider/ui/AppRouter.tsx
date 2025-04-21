import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router';
import { AppRoutesProps, routeConfig } from '../config/routeConfig';
import { Layout } from '@/widgets/Layout';
import { Loading } from '@/shared/ui/Loading';

const AppRouter = () => {
    const renderRoute = useCallback((route: AppRoutesProps) => {
        const element = route.hasLayout ? <Layout>{route.element}</Layout> : route.element;
        return <Route key={route.path} path={route.path} element={element} />;
    }, []);

    return (
        <Suspense fallback={<Loading />}>
            <Routes>{Object.values(routeConfig).map(renderRoute)}</Routes>
        </Suspense>
    );
};

export default memo(AppRouter);
