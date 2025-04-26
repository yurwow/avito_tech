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
            <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography color="error" variant="h6" sx={{ mb: 2 }}>
                    Ошибка загрузки проектов
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => refetch()}
                    sx={{
                        borderRadius: '8px',
                        textTransform: 'none',
                        px: 3,
                        py: 1,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        '&:hover': {
                            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                        },
                    }}
                >
                    Попробовать снова
                </Button>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                py: 6,
                px: isMobile ? 2 : 4,
                background: 'linear-gradient(180deg, rgba(247, 249, 252, 0.5) 0%, rgba(255, 255, 255, 1) 100%)',
            }}
        >
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
                                    borderRadius: '16px',
                                    transition: 'all 0.3s ease',
                                    border: '1px solid rgba(0, 0, 0, 0.08)',
                                    background: 'white',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                                    overflow: 'hidden',
                                    '&:hover': {
                                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                                        transform: 'translateY(-4px)',
                                        borderColor: 'primary.main',
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
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 48,
                                                height: 48,
                                                borderRadius: '12px',
                                                backgroundColor: 'rgba(25, 118, 210, 0.1)',
                                                mr: 2,
                                            }}
                                        >
                                            <FolderIcon
                                                sx={{
                                                    color: 'primary.main',
                                                    fontSize: 28,
                                                }}
                                            />
                                        </Box>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 600,
                                                lineHeight: 1.2,
                                                color: 'text.primary',
                                                fontSize: '1.1rem',
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
                                                color: 'primary.main',
                                                fontWeight: 500,
                                                textTransform: 'none',
                                                borderRadius: '8px',
                                                px: 2,
                                                py: 1,
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
                    // @ts-ignore
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                textAlign: 'center',
                                py: 4,
                                background: 'rgba(0, 0, 0, 0.02)',
                                borderRadius: '12px',
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    color: 'text.secondary',
                                    fontWeight: 500,
                                }}
                            >
                                Нет доступных проектов
                            </Typography>
                        </Box>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};
