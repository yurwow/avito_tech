import { Box, Typography, Button, Card, CardContent, Grid, useTheme, useMediaQuery } from '@mui/material';
import { ArrowForward as ArrowForwardIcon, FolderOpen as FolderIcon } from '@mui/icons-material';
import { useGetProjectsQuery } from '@/shared/api/projectsApi.ts';
import { Loading } from '@/shared/ui/Loading';
import { generatePath, RoutePath } from '@/app/providers/RouterProvider';
import { AppRoutes } from '@/app/providers/RouterProvider/config/routeConfig.tsx';
import { Title } from '@/widgets/Title';

export const ProjectsList = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { data, isLoading, error, refetch } = useGetProjectsQuery();
    const projects = data?.data ?? [];

    if (isLoading) return <Loading />;

    if (error) {
        return (
            <Box sx={{ textAlign: 'center' }}>
                <Typography color="error" variant="h6">
                    Ошибка загрузки проектов
                </Typography>
                <Button variant="contained" color="primary" onClick={() => refetch()}>
                    Попробовать снова
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ py: 4, px: isMobile ? 2 : 4 }}>
            <Title title={'Ваши проекты'} />

            <Grid container spacing={3}>
                {projects.length > 0 ? (
                    projects.map((project) => (
                        // @ts-ignore
                        <Grid item xs={12} sm={6} md={4} key={project.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: '12px',
                                    transition: 'all 0.3s ease',
                                    border: '1px solid #e0e0e0',
                                    overflow: 'hidden',
                                    '&:hover': {
                                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                                        transform: 'translateY(-4px)',
                                        borderColor: '#bbdefb',
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        height: '8px',
                                        background: 'linear-gradient(90deg, #1976d2 0%, #1565c0 100%)',
                                    }}
                                />

                                <CardContent
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%',
                                        p: 3,
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <FolderIcon
                                            sx={{
                                                mr: 1.5,
                                                color: '#1976d2',
                                                fontSize: 28,
                                            }}
                                        />
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 600,
                                                lineHeight: 1.2,
                                                color: '#333',
                                            }}
                                        >
                                            {project.name}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button
                                            variant="text"
                                            endIcon={<ArrowForwardIcon />}
                                            href={generatePath(RoutePath[AppRoutes.Board], { id: project.id })}
                                            sx={{
                                                color: '#1976d2',
                                                fontWeight: 500,
                                                '&:hover': {
                                                    backgroundColor: 'rgba(25, 118, 210, 0.08)',
                                                },
                                            }}
                                        >
                                            Перейти к доске
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography>Нет доступных проектов</Typography>
                )}
            </Grid>
        </Box>
    );
};
