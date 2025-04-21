import { Avatar, Box, Card, CardContent, Chip, Typography } from '@mui/material';
import { Assignment as AssignmentIcon } from '@mui/icons-material';
import { getPriority } from '@/widgets/IssueList/helpers/helpers.ts';

export const PRIORITY_COLORS = {
    High: '#ef5350',
    Medium: '#ffa726',
    Low: '#66bb6a',
    '': '#66bb6a',
};

export interface Issue {
    id: string | number;
    title: string;
    description: string;
    priority: 'High' | 'Medium' | 'Low' | '';
    assignee: {
        fullName: string;
        avatarUrl: string;
        email: string;
    };
}

interface CardContentTaskProps {
    task: Issue;
    onClick?: () => void;
}

export const CardContentTask = ({ task, onClick }: CardContentTaskProps) => {
    return (
        <Card
            onClick={onClick}
            key={task.id}
            sx={{
                mb: 2,
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                transition: 'all 0.2s ease',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                cursor: 'pointer',
                '&:hover': {
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    transform: 'translateY(-2px)',
                },
            }}
        >
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AssignmentIcon
                            sx={{
                                mr: 1.5,
                                color: PRIORITY_COLORS[task.priority],
                                fontSize: 20,
                            }}
                        />
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: 500,
                                lineHeight: 1.3,
                            }}
                        >
                            {task.title}
                        </Typography>
                    </Box>
                </Box>
                <Typography
                    variant="body2"
                    sx={{
                        mt: 1,
                        color: '#616161',
                    }}
                >
                    {task.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Chip
                        label={getPriority(task.priority)}
                        size="small"
                        sx={{
                            bgcolor: `${PRIORITY_COLORS[task.priority]}20`,
                            color: PRIORITY_COLORS[task.priority],
                            fontWeight: 500,
                            fontSize: '0.7rem',
                            height: 24,
                        }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar
                            alt={task.assignee.fullName}
                            src={task.assignee.avatarUrl}
                            sx={{ width: 28, height: 28 }}
                        />
                        <Typography variant="caption" sx={{ color: '#424242' }}>
                            {task.assignee.email}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};
