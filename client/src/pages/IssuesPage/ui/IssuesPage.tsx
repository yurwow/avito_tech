import { Box } from '@mui/material';
import { Title } from '@/widgets/Title/index.ts';
import { SearchIssues } from '@/widgets/SearchIssues';

const IssuesPage = () => {
    return (
        <Box p={4}>
            <Title title={'Все задачи'} />
            <SearchIssues />
        </Box>
    );
};

export default IssuesPage;
