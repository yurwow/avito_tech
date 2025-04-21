import { Box, Typography } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
export const EmptyTaskBoard = () => {
    return (
        <Box
            sx={{
                py: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '8px',
                border: '2px dashed rgba(0, 0, 0, 0.1)',
                bgcolor: 'rgba(0, 0, 0, 0.02)',
            }}
        >
            <Typography variant="body2" sx={{ mb: 1 }}>
                Нет задач
            </Typography>
            <AddCircle sx={{ fontSize: 20 }} />
        </Box>
    );
};
