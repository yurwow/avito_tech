import { BoardsPage } from '@/pages/BoardsPage';
import { BoardPage } from '@/pages/BoardPage';
import { IssuesPage } from '@/pages/IssuesPage';
import { RouteProps } from 'react-router';
import { NotFoundPage } from '@/pages/NotFoundPage';

export type AppRoutesProps = RouteProps & {
    hasLayout?: boolean;
};

export enum AppRoutes {
    Boards = 'Boards',
    Board = 'Board',
    Issues = 'Issues',
    NotFound = 'NotFound',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.Boards]: '/',
    [AppRoutes.Board]: '/board/:id',
    [AppRoutes.Issues]: '/issues',
    [AppRoutes.NotFound]: '*',
};

export type RoutePathType = (typeof RoutePath)[keyof typeof RoutePath];

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.Boards]: {
        path: RoutePath.Boards,
        element: <BoardsPage />,
        hasLayout: true,
    },
    [AppRoutes.Board]: {
        path: RoutePath.Board,
        element: <BoardPage />,
        hasLayout: true,
    },
    [AppRoutes.Issues]: {
        path: RoutePath.Issues,
        element: <IssuesPage />,
        hasLayout: true,
    },
    [AppRoutes.NotFound]: {
        path: RoutePath.NotFound,
        element: <NotFoundPage />,
        hasLayout: true,
    },
};
