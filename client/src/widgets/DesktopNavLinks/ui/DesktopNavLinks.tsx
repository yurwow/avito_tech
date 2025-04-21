import { Box, Link } from '@mui/material';
import { Dashboard as DashboardIcon, FolderOpen as FolderIcon } from '@mui/icons-material';
import { AppRoutes, RoutePath } from '@/app/providers/RouterProvider/config/routeConfig';

export const DesktopNavLinks = () => (
    <Box sx={{ display: 'flex', gap: 3 }}>
        <Link
            href={RoutePath[AppRoutes.Issues]}
            color="inherit"
            underline="none"
            sx={{
                fontSize: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                py: 1,
                px: 2,
                borderRadius: 1,
                transition: 'all 0.2s',
                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
            }}
        >
            <DashboardIcon fontSize="small" />
            Все задачи
        </Link>
        <Link
            href={RoutePath[AppRoutes.Boards]}
            color="inherit"
            underline="none"
            sx={{
                fontSize: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                py: 1,
                px: 2,
                borderRadius: 1,
                transition: 'all 0.2s',
                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
            }}
        >
            <FolderIcon fontSize="small" />
            Проекты
        </Link>
    </Box>
);
