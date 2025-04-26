import { useMemo, useState } from 'react';
import { useGetIssueQuery } from '@/shared/api/IssueApi.ts';
import { Searchs } from '@/widgets/Searchs';
import { IssueList } from '@/widgets/IssueList';

export const SearchIssues = () => {
    const { data, isLoading } = useGetIssueQuery();

    const [statusFilter, setStatusFilter] = useState('');
    const [boardFilter, setBoardFilter] = useState('');
    const [searchTitle, setSearchTitle] = useState('');
    const [searchAssignee, setSearchAssignee] = useState('');

    const filteredIssues = useMemo(() => {
        if (!data?.data) return [];

        return data.data.filter((issue) => {
            const matchesStatus = statusFilter ? issue.status === statusFilter : true;
            const matchesBoard = boardFilter ? issue.boardName === boardFilter : true;
            const matchesTitle = issue.title.toLowerCase().includes(searchTitle.toLowerCase());
            const matchesAssignee = issue.assignee.fullName.toLowerCase().includes(searchAssignee.toLowerCase());

            return matchesStatus && matchesBoard && matchesTitle && matchesAssignee;
        });
    }, [data, statusFilter, boardFilter, searchTitle, searchAssignee]);

    const uniqueBoards = useMemo(() => {
        if (!data?.data) return [];
        return [...new Set(data.data.map((i) => i.boardName))];
    }, [data]);

    const filters = {
        searchTitle,
        searchAssignee,
        boardFilter,
        statusFilter,
    };

    const setters = {
        setSearchTitle,
        setSearchAssignee,
        setBoardFilter,
        setStatusFilter,
    };

    return (
        <>
            <Searchs isLoading={isLoading} filters={filters} setters={setters} uniqueBoards={uniqueBoards} />
            <IssueList filteredIssues={filteredIssues} isLoading={isLoading} />
        </>
    );
};
