import { getRepository } from 'typeorm';
import Thesis, { ThesisState } from 'entities/Thesis';
import ThesisVolunteer from 'entities/ThesisVolunteer';

async function addThesis(thesis): Promise<Thesis> {
    const newThesis = new Thesis();
    newThesis.type = thesis.type;
    newThesis.year = thesis.year;
    newThesis.graduateName = thesis.graduateName;
    newThesis.graduateId = thesis.graduateId;
    newThesis.title = thesis.title;
    newThesis.usedTechnologies = thesis.usedTechnologies;
    newThesis.goal = thesis.goal;
    newThesis.sketch = thesis.sketch;
    newThesis.link = thesis.link;

    return await getRepository(Thesis).save(newThesis);
}

async function updateThesis(thesis): Promise<Thesis> {
    const editedThesis = await getRepository(Thesis).findOne(thesis.id);
    if (thesis.type && editedThesis.type !== thesis.type) {
        editedThesis.type = thesis.type;
    }
    if (thesis.year && editedThesis.year !== thesis.year) {
        editedThesis.year = thesis.year;
    }
    if (thesis.graduateName && editedThesis.graduateName !== thesis.graduateName) {
        editedThesis.graduateName = thesis.graduateName;
    }
    if (thesis.graduateId && editedThesis.graduateId !== thesis.graduateId) {
        editedThesis.graduateId = thesis.graduateId;
    }
    if (thesis.title && editedThesis.title !== thesis.title) {
        editedThesis.title = thesis.title;
    }
    if (thesis.usedTechnologies && editedThesis.usedTechnologies !== thesis.usedTechnologies) {
        editedThesis.usedTechnologies = thesis.usedTechnologies;
    }
    if (thesis.goal && editedThesis.goal !== thesis.goal) {
        editedThesis.goal = thesis.goal;
    }
    if (thesis.sketch && editedThesis.sketch !== thesis.sketch) {
        editedThesis.sketch = thesis.sketch;
    }
    if (thesis.link && editedThesis.link !== thesis.link) {
        editedThesis.link = thesis.link;
    }

    return await getRepository(Thesis).save(editedThesis);
}

export default {
    theses: async (_, __, { auth, user }): Promise<Thesis[] | Error> => {
        if (!auth) {
            throw new Error('Brak uprawnień');
        }
        const theses = await getRepository(Thesis).find();
        if (!user || !user.isAdmin) {
            return theses.filter(
                t =>
                    t.type !== ThesisState.SUBMITTED ||
                    (t.type === ThesisState.SUBMITTED && t.graduateId === (user && user.album)),
            );
        }
        return theses;
    },
    thesesVolunteers: async (_, __, { auth, user }): Promise<ThesisVolunteer[] | Error> => {
        if (!auth || !user) {
            throw new Error('Brak uprawnień');
        }
        const theses = await getRepository(ThesisVolunteer).find({ relations: ['user'] });
        if (user && !user.isAdmin) {
            return theses.filter(t => t.user.album === user.album);
        }
        return theses;
    },
    putThesis: async (_, { input }, { auth, user }): Promise<Thesis | Error> => {
        if (!auth || !user) {
            throw new Error('Brak uprawnień');
        }
        if (!user.isAdmin && input.type !== ThesisState.SUBMITTED) {
            throw new Error('Brak uprawnień');
        }

        if (!input.id) {
            const saved = await addThesis(input);
            return saved;
        } else {
            const saved = await updateThesis(input);
            return saved;
        }
    },
    removeThesis: async (_, id, { isAdmin }): Promise<string | Error> => {
        if (!isAdmin) {
            throw new Error('Brak uprawnień');
        }
        await getRepository(Thesis).delete(id);

        return 'Usunięto pracę dyplomową';
    },
    addThesisVolunteer: async (_, { input }, { auth, user }): Promise<ThesisVolunteer | Error> => {
        if (!auth || !user) {
            throw new Error('Brak uprawnień');
        }

        const volunteer = new ThesisVolunteer();
        volunteer.thesisId = input.thesisId;
        volunteer.userId = input.userId;
        const saved = await getRepository(ThesisVolunteer).save(volunteer);
        return saved;
    },
    removeThesisVolunteer: async (_, id, { auth, user, isAdmin }): Promise<string | Error> => {
        if (!auth || !user) {
            throw new Error('Brak uprawnień');
        }
        const entity = await getRepository(ThesisVolunteer).findOne(id, { relations: ['user'] });

        if (!isAdmin && entity.user && entity.user.album !== user.album) {
            throw new Error('Brak uprawnień');
        }

        await getRepository(ThesisVolunteer).remove(entity);

        return 'Usunięto osobę chętną dla tematu';
    },
    acceptThesisVolunteer: async (_, id, { isAdmin }): Promise<string | Error> => {
        if (!isAdmin) {
            throw new Error('Brak uprawnień');
        }

        const volunteer = await getRepository(ThesisVolunteer).findOne(id, { relations: ['user'] });
        const thesis = await getRepository(Thesis).findOne(volunteer.thesisId);
        thesis.type = ThesisState.IN_PROGRESS;
        thesis.graduateId = volunteer.user.album;
        thesis.graduateName = `${volunteer.user.firstName} ${volunteer.user.lastName}`;

        await Promise.all([
            await getRepository(Thesis).save(thesis),
            await getRepository(ThesisVolunteer).delete({ thesisId: thesis.id }),
        ]);

        return 'Zaakceptowano pracę dyplomową dla dyplomanta';
    },
};
