import React from 'react';
import { Layout } from 'antd';

interface PageContentProps {
    children: React.ReactNode;
}

export const PageContent: React.FC<PageContentProps> = ({ children }) => {
    return (
        <Layout.Content
            style={{
                background: '#fff',
                padding: 24,
                margin: '0 auto',
                minHeight: 280,
                width: '100%',
                maxWidth: 1150,
            }}
        >
            {children}
        </Layout.Content>
    );
};
