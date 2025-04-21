import { Box, CircularProgress } from '@mui/material';

export const Loading = () => {
    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <CircularProgress size={80} />
        </Box>
    );
};
