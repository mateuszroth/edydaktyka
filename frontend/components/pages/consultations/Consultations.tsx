import React, { useContext, useState, useEffect } from 'react';
import { Table, Alert, Spin } from 'antd';
import Link from 'next/link';
import AuthContext from '../../stores/AuthContext';
import moment from 'moment';
import Centered from '../../shared/centered';
import gql from 'graphql-tag';
import { useLazyQuery } from 'react-apollo';

// How many slots should be available per day
const SLOTS_TO_SHOW = 9;
// Start hour of the consultations span
const START_HOUR = 15;
const START_MINUTES = 0;
// Time span between slots
const TIME_SPAN_MINUTES = 10;
// On which day the consultation should occur
const START_WEEKDAY = 3; // Wednesday, we count from 1
// How many weeks do we want to show in table
const WEEKS_TO_SHOW = 4;

const slotsArray = [...Array(SLOTS_TO_SHOW).keys()];

const getSlotTitle = slotId => {
    const addHours = Math.floor((START_MINUTES + slotId * TIME_SPAN_MINUTES) / 60);
    const addMinutes = slotId * TIME_SPAN_MINUTES - addHours * 60;
    const title = `${String(START_HOUR + addHours).padStart(2, '0')}:${String(START_MINUTES + addMinutes).padStart(
        2,
        '0',
    )}`;
    return title;
};

const getColumns = (onSlotReserve, isLoggedIn: boolean, isAdmin: boolean) => {
    const columns: any[] = [
        {
            title: 'Data',
            dataIndex: 'date',
            key: 'date',
            render: val => new Date(val).toLocaleDateString(),
        },
    ];

    slotsArray.forEach(slot =>
        columns.push({
            title: getSlotTitle(slot),
            dataIndex: String(slot),
            key: String(slot),
            render: obj => {
                if (obj.userId && obj.id) {
                    return obj.userName || 'Twoja rezerwacja';
                }
                if (obj.id) {
                    return '-';
                }
                if (!isLoggedIn) {
                    return 'dostępne';
                }
                return <a onClick={() => onSlotReserve(obj)}>Zapisz</a>;
            },
        }),
    );

    return columns;
};

const getRows = (reservedSlots: Map<string, any>) => {
    const now = moment();
    now.millisecond(0);
    now.second(0);
    now.minute(0);
    now.hour(12);
    const currentWeekDay = now.day();
    if (currentWeekDay <= START_WEEKDAY) {
        now.add(START_WEEKDAY - currentWeekDay, 'days');
    } else {
        now.add(7 - (currentWeekDay - START_WEEKDAY), 'days');
    }

    const rows = [];

    for (let i = 0; i < WEEKS_TO_SHOW; i++) {
        const row: any = {
            date: now.toISOString(),
            key: now.toISOString(),
        };

        const dateSlots = reservedSlots.get(now.format('YYYY-MM-DD')) || {};
        slotsArray.forEach(slot => {
            row[slot] = {
                ...dateSlots[slot],
                date: now.toISOString(),
                slot: slot,
            };
        });

        now.add(7, 'days');
        rows.push(row);
    }

    return rows;
};

const QUERY_CONSULTATION_SLOTS = gql`
    query ConsultationSlots($forHowManyWeeks: Int!) {
        consultationSlots(forHowManyWeeks: $forHowManyWeeks) {
            id
            date
            slot
            userId
            userName
        }
    }
`;

const RESERVE_CONSULTATION_SLOT = gql`
    mutation ReserveConsultationSlot($slot: Int!, $day: Date!) {
        reserveConsultationSlot(slot: $slot, day: $day)
    }
`;

const REMOVE_CONSULTATION_SLOT = gql`
    mutation RemoveConsultationSlot($id: ID!) {
        removeConsultationSlot(id: $id)
    }
`;

export default () => {
    const { state } = useContext(AuthContext);
    const [reservedSlots, setReservedSlots] = useState(new Map());
    const [getConsultatationSlots, { data }] = useLazyQuery(QUERY_CONSULTATION_SLOTS, { fetchPolicy: 'network-only' });

    useEffect(() => {
        const dataConsultationSlots = data && data.consultationSlots;
        if (dataConsultationSlots) {
            const newReservedSlots = new Map();
            dataConsultationSlots.forEach(consultation => {
                const consultationDate = moment(consultation.date).format('YYYY-MM-DD');
                if (!newReservedSlots.has(consultationDate)) {
                    newReservedSlots.set(consultationDate, {});
                }
                const slots = newReservedSlots.get(consultationDate);
                slots[consultation.slot] = {
                    ...consultation,
                    id: consultation.id,
                };
                newReservedSlots.set(consultationDate, slots);
            });
            setReservedSlots(newReservedSlots);
        }
    }, [data]);

    useEffect(() => {
        if (state && state.isInitialized) {
            getConsultatationSlots({ variables: { forHowManyWeeks: WEEKS_TO_SHOW } });
        }
    }, [state.isInitialized]);

    const handleSlotReserve = slot => console.log(slot);

    const rows = getRows(reservedSlots);
    const isLoggedIn = state && state.isInitialized && state.isLoggedIn;
    const isAdmin = state && state.isInitialized && state.user && state.user.isAdmin;
    const columns = getColumns(handleSlotReserve, isLoggedIn, isAdmin);

    if (!reservedSlots.size) {
        return (
            <Centered>
                <Spin
                    style={{ marginTop: 50, marginBottom: 170 }}
                    size="large"
                    tip="Ładowanie terminów konsultacji..."
                />
            </Centered>
        );
    }

    return (
        <>
            <Table columns={columns} dataSource={rows} pagination={false} />
            {state && state.isInitialized && !state.isLoggedIn && (
                <Alert
                    message="Zaloguj się"
                    description={
                        <>
                            Aby rezerwować terminy konsultacji, konieczne jest{' '}
                            <Link href="/login">
                                <a>zalogowanie się</a>
                            </Link>
                            .
                        </>
                    }
                    closable={false}
                    type="warning"
                    showIcon
                    style={{ marginTop: 10 }}
                />
            )}
        </>
    );
};
