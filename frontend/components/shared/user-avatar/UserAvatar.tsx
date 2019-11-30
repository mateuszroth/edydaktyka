import React from 'react';
import { stringToColor, getUserInitials } from '../../../helpers/ui';
import { Avatar } from 'antd';

const ChangeGroup: React.FC<{ fontSize?: number; size?: number | 'large' | 'small' | 'default'; user: any }> = ({
    size = 'large',
    user,
    fontSize,
}) => {
    const styles = {
        backgroundColor: stringToColor(user.firstName + user.lastName),
        marginLeft: 10,
        marginRight: 10,
        verticalAlign: 'middle',
    } as any;
    if (fontSize) {
        styles.fontSize = fontSize;
    }
    return (
        <Avatar size={size} style={styles}>
            {user && getUserInitials(user)}
        </Avatar>
    );
};

export default ChangeGroup;
