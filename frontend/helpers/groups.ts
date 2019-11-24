export const getLongGroupName = (group): string =>
    `${group.courseName} (${group.groupNumber || group.groupHalf ? 'grupa ' : ''}${group.groupNumber}${
        group.groupHalf
    }${group.groupNumber || group.groupHalf ? ', ' : ''}${group.fieldOfStudy} ${
        group.modeOfStudy === 'ST' ? 'stacjonarne' : 'niestacjonarne'
    })`;

export const getReadableModeOfStudy = (modeOfStudy): string => (modeOfStudy === 'ST' ? 'stacjonarne' : 'niestacjonarne');
