import { Box, useTheme, useMediaQuery } from '@mui/material';
import { BoardHeader } from '@/widgets/BoardHeader';
import { KanbanBoard } from '@/widgets/KanbanBoard';

export const TaskBoard = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box sx={{ p: isMobile ? 2 : 4 }}>
            <BoardHeader />
            <KanbanBoard />
        </Box>
    );
};
