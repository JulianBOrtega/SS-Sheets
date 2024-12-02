export const sheetClasses = {
    bard: {
        id: 1,
        name: 'Bardo',
        baseHP: 6,
        damageDice: '1d6',
    },
    cleric: {
        id: 2,
        name: 'Clérigo',
        baseHP: 8,
        damageDice: '1d6',
    },
    druida: {
        id: 3,
        name: 'Druida',
        baseHP: 6,
        damageDice: '1d6',
    },
    ranger: {
        id: 4,
        name: 'Explorador',
        baseHP: 8,
        damageDice: '1d8',
    },
    warrior: {
        id: 5,
        name: 'Guerrero',
        baseHP: 10,
        damageDice: '1d10',
    },
    rogue: {
        id: 6,
        name: 'Ladrón',
        baseHP: 6,
        damageDice: '1d8',
    },
    paladin: {
        id: 7,
        name: 'Paladín',
        baseHP: 10,
        damageDice: '1d10',
    },
    mage: {
        id: 8,
        name: 'Mago',
        baseHP: 4,
        damageDice: '1d4',
    },
    barbarian: {
        id: 9,
        name: 'Barbaro',
        baseHP: 8,
        damageDice: '1d10'
    }
}

export const getClass = (classId: number) => {
    return Object.values(sheetClasses)
        .find(sheetClass => sheetClass.id == classId);
}

export const getClassOptions = () => {
    return Object.values(sheetClasses)
        .map(c => ({display: c.name, value: c.id}));
}