import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router';
import { Loading } from '@/shared/ui/Loading';
import { useGetProjectsQuery } from '@/shared/api/projectsApi.ts';
import { useMemo } from 'react';

export const BoardHeader = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetProjectsQuery();

    const board = useMemo(() => {
        return data?.data.find((board) => board.id === Number(id));
    }, [data, id]);

    if (isLoading) return <Loading />;

    return (
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    color: '#1565c0',
                    position: 'relative',
                    '&:after': {
                        content: '""',
                        position: 'absolute',
                        width: '60px',
                        height: '4px',
                        background: 'linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)',
                        left: 0,
                        bottom: '-8px',
                        borderRadius: '4px',
                    },
                }}
            >
                {board?.name || 'Проект'}
            </Typography>
        </Box>
    );
};
