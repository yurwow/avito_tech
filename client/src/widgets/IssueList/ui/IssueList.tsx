import { Avatar, Box, Card, CardContent, Chip, Grid, Typography } from '@mui/material';
import { IExtendedTask } from '@/entities/Task/model/types/ITask.ts';
import { getStatus, getStatusColor, getPriorityColor, getPriority } from '@/widgets/IssueList/helpers/helpers.ts';
import { useAppDispatch } from '@/app/providers/StoreProvider/lib/hooks/useAppDispatch.ts';
import { openTaskModal } from '@/features/taskModal/taskModalSlice.ts';

interface Props {
    filteredIssues: IExtendedTask[];
}

export const IssueList = ({ filteredIssues }: Props) => {
    const dispatch = useAppDispatch();

    return (
        <Grid container spacing={3} justifyContent="center">
            {filteredIssues.map((issue) => (
                // @ts-ignore
                <Grid sx={{ cursor: 'pointer' }} item key={issue.id} onClick={() => dispatch(openTaskModal(issue))}>
                    <Card sx={{ width: '400px', height: '300px' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                {issue.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" mb={2}>
                                {issue.description}
                            </Typography>

                            <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
                                <Chip
                                    label={getStatus(issue.status)}
                                    color={getStatusColor(issue.status)}
                                    size="small"
                                />
                                <Chip
                                    label={`Приоритет: ${getPriority(issue.priority)}`}
                                    color={getPriorityColor(issue.priority)}
                                    size="small"
                                />
                                <Chip label={issue.boardName} size="small" />
                            </Box>
                            <Box display="flex" alignItems="center" gap={2}>
                                <Avatar src={issue.assignee.avatarUrl} alt={issue.assignee.fullName} />
                                <Box>
                                    <Typography variant="body2">{issue.assignee.fullName}</Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {issue.assignee.email}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};
