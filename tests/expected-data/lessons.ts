const expectedData = expect.arrayContaining([
    expect.objectContaining({
        course: 'Medicine',
        date: '01/12/2022',
        name: 'Chemistry',
        type: 'lecture'
    }),
    expect.objectContaining({
        course: 'Programming',
        date: '02/12/2022',
        name: 'Math',
        type: 'workshop'
    }),
    expect.objectContaining({
        course: 'Cartography',
        date: '03/12/2022',
        name: 'Geography',
        type: 'lecture'
    }),
    expect.objectContaining({
        course: 'Cartography',
        date: '04/12/2022',
        name: 'Astronomy',
        type: 'lecture'
    }),
    expect.objectContaining({
        course: 'Programming',
        date: '05/12/2022',
        name: 'Information Technology',
        type: 'workshop'
    }),
    expect.objectContaining({
        course: 'Medicine',
        date: '06/12/2022',
        name: 'Biology',
        type: 'workshop'
    }),
    expect.objectContaining({
        course: 'Programming',
        date: '07/12/2022',
        name: 'Math',
        type: 'workshop'
    }),
    expect.objectContaining({
        course: 'Cartography',
        date: '08/12/2022',
        name: 'Geography',
        type: 'lecture'
    }),
    expect.objectContaining({
        course: 'Cartography',
        date: '09/12/2022',
        name: 'Astronomy',
        type: 'workshop'
    }),
    expect.objectContaining({
        course: 'Programming',
        date: '10/12/2022',
        name: 'Information Technology',
        type: 'lecture'
    }),
]);

export default expectedData;