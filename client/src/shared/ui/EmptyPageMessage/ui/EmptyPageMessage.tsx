import { Stack, Typography } from '@mui/material';

interface EmptyMessageProps {
    message?: string;
}

export const EmptyMessage = ({ message }: EmptyMessageProps) => {
    return (
        <Stack alignItems="center" justifyContent="center" height="100vh" sx={{ textAlign: 'center', padding: 2 }}>
            <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 500 }}>
                {message}
            </Typography>
        </Stack>
    );
};
