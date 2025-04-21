import { Header } from '@/widgets/Header';
import { ReactNode } from 'react';

interface LayoutProps {
    children?: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
};
