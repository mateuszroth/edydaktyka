import { getRepository, Between } from 'typeorm';
import ConsultationSlot from 'entities/ConsultationSlot';
import * as moment from 'moment';

export default {
    consultationSlots: async (_, { forHowManyWeeks }, { auth, user }): Promise<ConsultationSlot[] | Error> => {
        const today = moment();
        today.millisecond(0);
        today.second(0);
        today.minute(0);
        today.hour(12);
        const slots = await getRepository(ConsultationSlot).find({
            where: [
                {
                    date: Between(
                        today.format('YYYY-MM-DD'),
                        today.add(forHowManyWeeks * 7, 'days').format('YYYY-MM-DD'),
                    ),
                },
            ],
            order: {
                date: 'ASC',
                slot: 'ASC',
            },
            relations: ['user'],
        });

        if (!auth || !user.isAdmin) {
            return slots.map(slot => {
                slot.user = null;
                return slot;
            });
        }

        if (auth && user.isAdmin) {
            return slots.map(slot => {
                slot.userId = slot.user.album;
                slot.userName = `${slot.user.firstName} ${slot.user.lastName}`;
                return slot;
            });
        }

        if (auth && !user.isAdmin) {
            return slots.map(slot => {
                slot.userId = slot.user.album === user.album ? user.album : null;
                slot.user = null;
                return slot;
            });
        }
    },
};
