import { Avatar, Box, Card, CardContent, Chip, Grid, Typography, Skeleton } from '@mui/material';
import { IExtendedTask } from '@/entities/Task/model/types/ITask.ts';
import { getStatus, getStatusColor, getPriorityColor, getPriority } from '@/widgets/IssueList/helpers/helpers.ts';
import { useAppDispatch } from '@/app/providers/StoreProvider/lib/hooks/useAppDispatch.ts';
import { openTaskModal } from '@/features/taskModal/taskModalSlice.ts';
import { TaskFormValues } from '@/widgets/TaskForm/ui/TaskForm.tsx';

interface Props {
    filteredIssues: IExtendedTask[];
    isLoading: boolean;
}

const mapTaskToFormValues = (task: IExtendedTask): TaskFormValues & { id: number } => ({
    id: task.id,
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: task.status,
    boardId: task.boardId,
    assigneeId: task.assignee?.id || undefined,
    assignee: task.assignee
        ? {
              id: task.assignee.id,
              fullName: task.assignee.fullName,
              email: task.assignee.email,
              avatarUrl: task.assignee.avatarUrl,
          }
        : undefined,
});

export const IssueList = ({ filteredIssues, isLoading }: Props) => {
    const dispatch = useAppDispatch();

    return (
        <Grid container spacing={3} justifyContent="center">
            {isLoading
                ? Array.from({ length: 6 }).map((_, index) => (
                      //@ts-ignore
                      <Grid item key={index}>
                          <Card sx={{ width: '400px', height: '300px' }}>
                              <CardContent>
                                  <Skeleton variant="text" width="80%" height={30} />
                                  <Skeleton variant="text" width="60%" height={20} sx={{ my: 1 }} />
                                  <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
                                      <Skeleton variant="rectangular" width={90} height={30} />
                                      <Skeleton variant="rectangular" width={150} height={30} />
                                      <Skeleton variant="rectangular" width={120} height={30} />
                                  </Box>
                                  <Box display="flex" alignItems="center" gap={2}>
                                      <Skeleton variant="circular" width={40} height={40} />
                                      <Box>
                                          <Skeleton variant="text" width={150} height={20} />
                                          <Skeleton variant="text" width={100} height={15} />
                                      </Box>
                                  </Box>
                              </CardContent>
                          </Card>
                      </Grid>
                  ))
                : filteredIssues.map((issue) => (
                      //@ts-ignore
                      <Grid
                          sx={{ cursor: 'pointer' }}
                          item
                          key={issue.id}
                          onClick={() =>
                              dispatch(
                                  openTaskModal({
                                      task: mapTaskToFormValues(issue),
                                      source: 'edit',
                                  }),
                              )
                          }
                      >
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
                                      <Avatar src={issue.assignee?.avatarUrl} alt={issue.assignee?.fullName} />
                                      <Box>
                                          <Typography variant="body2">
                                              {issue.assignee?.fullName || 'Не назначен'}
                                          </Typography>
                                          <Typography variant="caption" color="text.secondary">
                                              {issue.assignee?.email}
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
