import { Box, Typography } from '@mui/material';

interface Prop {
    title: string;
}

export const Title = ({ title }: Prop) => {
    return (
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 600,
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
                {title}
            </Typography>
        </Box>
    );
};
