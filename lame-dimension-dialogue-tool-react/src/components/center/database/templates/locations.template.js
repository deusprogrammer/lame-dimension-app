export default [
    {
        key: 'id',
        label: 'ID',
        type: 'text',
        defaultValue: '',
    },
    {
        key: 'room',
        label: 'Room',
        type: 'text',
        defaultValue: '',
    },
    {
        key: 'section',
        label: 'Section',
        type: 'text',
        localized: true,
        defaultValue: 'New Location',
    },
    {
        key: 'subsection',
        label: 'Subsection',
        type: 'text',
        localized: true,
        defaultValue: '',
    },
    {
        key: 'gridX',
        label: 'Grid X',
        type: 'number',
        defaultValue: 0,
        min: 0,
        max: 9999,
    },
    {
        key: 'gridY',
        label: 'gridY',
        type: 'number',
        defaultValue: 0,
        min: 0,
        max: 9999,
    },
    {
        key: 'color',
        label: 'Color',
        type: 'text',
        defaultValue: '',
    },
    {
        key: 'shape',
        label: 'Shape',
        type: 'number',
        defaultValue: 0,
        min: 0,
        max: 99,
    },
]