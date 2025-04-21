import { Box, Link } from '@mui/material';
import { Dashboard as DashboardIcon, FolderOpen as FolderIcon } from '@mui/icons-material';
import { AppRoutes, RoutePath } from '@/app/providers/RouterProvider/config/routeConfig';

export const MobileMenu = () => (
    <Box
        sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            bgcolor: 'rgba(0,0,0,0.05)',
        }}
    >
        <Link
            href={RoutePath[AppRoutes.Issues]}
            color="inherit"
            underline="none"
            sx={{
                p: 1.5,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                },
            }}
        >
            <DashboardIcon />
            Все задачи
        </Link>
        <Link
            href={RoutePath[AppRoutes.Boards]}
            color="inherit"
            underline="none"
            sx={{
                p: 1.5,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                },
            }}
        >
            <FolderIcon />
            Проекты
        </Link>
    </Box>
);
