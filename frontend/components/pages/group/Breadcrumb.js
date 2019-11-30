import React from 'react';
import Link from 'next/link';
import { Breadcrumb } from 'antd';

const styles = {
    root: {
        margin: '12px 0',
    },
};

export default ({ id, groupName = '', classId = null, className = '', userId = null, userName = '' }) => (
    <Breadcrumb style={styles.root}>
        <Breadcrumb.Item>
            <Link href="/">
                <a>Strona główna</a>
            </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
            <Link href="/groups">
                <a>Zarządzanie grupami zajęciowymi</a>
            </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
            <Link href="/group/[id]" as={`/group/${id}`}>
                <a>
                    Grupa {id} {groupName ? `- ${groupName}` : ''}
                </a>
            </Link>
        </Breadcrumb.Item>
        {classId && (
            <Breadcrumb.Item>
                <Link href="/group/[id]/class/[classId]" as={`/group/${id}/class/${classId}`}>
                    <a>{className}</a>
                </Link>
            </Breadcrumb.Item>
        )}
        {userId && (
            <Breadcrumb.Item>
                <Link href="/group/[id]/student/[album]" as={`/group/${id}/student/${userId}`}>
                    <a>Student {userName}</a>
                </Link>
            </Breadcrumb.Item>
        )}
    </Breadcrumb>
);
