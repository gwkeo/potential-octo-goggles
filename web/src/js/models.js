export const fieldsConfig = [
    {
        id: 'name',
        label: 'Название',
        jsonKey: 'name',
        required: true,
        type: 'select'
    },
    {
        id: 'formula',
        label: 'Формула',
        jsonKey: 'formula',
        required: true,
        type: 'text',
        hasPreview: true
    },
    {
        group: 'Фокусы',
        fields: [
            {
                id: 'focus1_x',
                label: 'Фокус 1 (x)',
                jsonKey: 'focus1.x',
                required: true,
                type: 'text'
            },
            {
                id: 'focus1_y',
                label: 'Фокус 1 (y)',
                jsonKey: 'focus1.y',
                required: true,
                type: 'text'
            },
            {
                id: 'focus2_x',
                label: 'Фокус 2 (x)',
                jsonKey: 'focus2.x',
                required: true,
                type: 'text'
            },
            {
                id: 'focus2_y',
                label: 'Фокус 2 (y)',
                jsonKey: 'focus2.y',
                required: true,
                type: 'text'
            }
        ]
    },
    {
        group: 'Центр',
        fields: [
            {
                id: 'center_x',
                label: 'Центр (x)',
                jsonKey: 'center.x',
                required: true,
                type: 'text'
            },
            {
                id: 'center_y',
                label: 'Центр (y)',
                jsonKey: 'center.y',
                required: true,
                type: 'text'
            }
        ]
    },
    {
        group: 'Директрисы',
        fields: [
            {
                id: 'direct1',
                label: 'Директриса 1',
                jsonKey: 'direct1',
                required: true,
                type: 'text'
            },
            {
                id: 'direct2',
                label: 'Директриса 2',
                jsonKey: 'direct2',
                required: true,
                type: 'text'
            },
        ]
    },
    {
        group: "Ассимптоты",
        fields: [
            {
                id: 'asymptote1',
                label: 'Асимптота 1 (если есть)',
                jsonKey: 'asymptote1',
                required: false,
                type: 'text'
            },
            {
                id: 'asymptote2',
                label: 'Асимптота 2 (если есть)',
                jsonKey: 'asymptote2',
                required: false,
                type: 'text'
            }
        ]
    },
    {
        group: 'Полуоси',
        fields: [
            {
                id: 'semiaxis_a',
                label: 'Большая полуось (a)',
                jsonKey: 'semiaxis_a',
                required: true,
                type: 'text'
            },
            {
                id: 'semiaxis_b',
                label: 'Малая полуось (b)',
                jsonKey: 'semiaxis_b',
                required: true,
                type: 'text'
            }
        ]
    },
    {
        group: 'Другие параметры',
        fields: [
            {
                id: 'eccenter',
                label: 'Эксцентриситет',
                jsonKey: 'eccenter',
                required: true,
                type: 'text'
            },
            {
                id: 'parameter',
                label: 'Фокальный параметр',
                jsonKey: 'parameter',
                required: true,
                type: 'text'
            }
        ]
    }
];

export const curves = [
    "Эллипс",
    "Парабола",
    "Гипербола",
    "Мнимый эллипс",
]