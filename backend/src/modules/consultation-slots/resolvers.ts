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

        if (!auth || !user) {
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

        if (auth && user && !user.isAdmin) {
            return slots.map(slot => {
                slot.userId = slot.user.album === user.album ? user.album : null;
                slot.user = null;
                return slot;
            });
        }
    },
    removeConsultationSlot: async (_, { id }, { auth, user }): Promise<string | Error> => {
        if (!id) {
            throw new Error('Brak id');
        }

        if (!auth) {
            throw new Error('Brak uprawnień');
        }

        const slot = await getRepository(ConsultationSlot).findOne(id);

        if (!user.isAdmin && user && user.album !== slot.userId) {
            throw new Error('Brak uprawnień');
        }

        await getRepository(ConsultationSlot).remove(slot);

        return 'Usunięto rezerwację konsultacji';
    },
    reserveConsultationSlot: async (_, { slot, date }, { auth, user }): Promise<ConsultationSlot | Error> => {
        if (Number.isNaN(slot) || !date) {
            throw new Error('Brak danych');
        }

        if (!auth || !user) {
            throw new Error('Brak uprawnień');
        }

        const consultationSlot = new ConsultationSlot();
        consultationSlot.slot = slot;
        consultationSlot.date = date;
        consultationSlot.user = user;

        const saved = await getRepository(ConsultationSlot).save(consultationSlot);

        return saved;
    },
};
