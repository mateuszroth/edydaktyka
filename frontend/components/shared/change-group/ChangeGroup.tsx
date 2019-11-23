import React, { useContext } from 'react';
import noop from 'lodash/noop';
import { List } from 'antd';
import { getLongGroupName } from '../../../helpers/groups';
import AuthContext from '../../stores/AuthContext';
import styles from './ChangeGroup.module.scss';

const ChangeGroup: React.FC<{ onChange?: any }> = ({ onChange = noop }) => {
    const { currentGroup, setCurrentGroup, state: authState } = useContext(AuthContext);
    const { user } = authState;

    return (
        <List
            size="large"
            bordered
            style={{ marginBottom: 30 }}
            dataSource={
                (user &&
                    user.groups &&
                    user.groups.map(group => {
                        const isCurrentGroup = currentGroup && currentGroup.id === group.id;
                        const className = isCurrentGroup ? styles.selectedGroup : styles.group;
                        return (
                            <List.Item
                                className={className}
                                onClick={() => {
                                    setCurrentGroup(group);
                                    onChange();
                                }}
                            >
                                {getLongGroupName(group)} {isCurrentGroup ? ' - obecnie przeglądana' : null}
                            </List.Item>
                        );
                    })) ||
                []
            }
            renderItem={item => item}
        />
    );
};

export default ChangeGroup;
