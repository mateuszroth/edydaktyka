import React from 'react';
import { Layout } from 'antd';

interface PageContentProps {
    children: React.ReactNode;
    center?: boolean;
}

export const PageContent: React.FC<PageContentProps> = ({ children, center }) => {
    return (
        <Layout.Content
            style={{
                background: '#fff',
                padding: 24,
                margin: '0 auto',
                minHeight: 280,
                width: '100%',
                maxWidth: 1150,
                textAlign: center ? 'center' : 'initial',
            }}
        >
            {children}
        </Layout.Content>
    );
};
