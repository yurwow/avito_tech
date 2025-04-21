export const getStatusColor = (status: string) => {
    switch (status) {
        case 'Done':
            return 'success';
        case 'Backlog':
            return 'default';
        case 'In Progress':
            return 'warning';
        default:
            return 'primary';
    }
};

export const getStatus = (status: string) => {
    switch (status) {
        case 'Done':
            return 'Сделано';
        case 'Backlog':
            return 'Нужно сделать';
        case 'InProgress':
            return 'В процессе';
        default:
            return 'default';
    }
};

export const getPriority = (priority: string) => {
    switch (priority) {
        case 'High':
            return 'Высокий';
        case 'Medium':
            return 'Средний';
        case 'Low':
            return 'Низкий';
        default:
            return 'Не определен';
    }
};

export const getPriorityColor = (priority: string) => {
    switch (priority) {
        case 'High':
            return 'error';
        case 'Medium':
            return 'warning';
        case 'Low':
            return 'success';
        default:
            return 'default';
    }
};
