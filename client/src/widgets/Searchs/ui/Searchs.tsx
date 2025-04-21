import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

interface SearchsProps {
    filters: {
        searchTitle: string;
        searchAssignee: string;
        boardFilter: string;
        statusFilter: string;
    };
    setters: {
        setSearchTitle: (val: string) => void;
        setSearchAssignee: (val: string) => void;
        setBoardFilter: (val: string) => void;
        setStatusFilter: (val: string) => void;
    };
    uniqueBoards: string[];
}

export const Searchs = ({ filters, setters, uniqueBoards }: SearchsProps) => {
    const { searchTitle, searchAssignee, boardFilter, statusFilter } = filters;
    const { setSearchTitle, setSearchAssignee, setBoardFilter, setStatusFilter } = setters;

    return (
        <Box gap={2} flexWrap="wrap" mb={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <TextField
                size="small"
                label="Поиск по названию"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
            />

            <TextField
                size="small"
                label="Поиск по исполнителю"
                value={searchAssignee}
                onChange={(e) => setSearchAssignee(e.target.value)}
            />

            <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel>Доска</InputLabel>
                <Select value={boardFilter} onChange={(e) => setBoardFilter(e.target.value)} label="Доска">
                    <MenuItem value="">Все</MenuItem>
                    {uniqueBoards.map((name) => (
                        <MenuItem key={name} value={name}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel>Статус</InputLabel>
                <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} label="Статус">
                    <MenuItem value="">Все</MenuItem>
                    <MenuItem value="Backlog">Нужно сделать</MenuItem>
                    <MenuItem value="InProgress">В процессе</MenuItem>
                    <MenuItem value="Done">Сделано</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};
