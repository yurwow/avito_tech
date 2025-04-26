import { ToastContainer } from 'react-toastify';

export const Toast = () => {
    return (
        <ToastContainer
            toastStyle={{
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
                padding: '16px',
                fontSize: '16px',
                color: 'black',
                backgroundColor: '#fff',
                fontFamily: "'Montserrat', sans-serif",
            }}
        />
    );
};
