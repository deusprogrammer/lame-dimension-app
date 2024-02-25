import DataTable from './DataTable';
import moveTemplate from './templates/move.template';

// TODO Add more templates for each category, or make these customizable through the ui.
export default {
    characters: {
        title: 'Characters',
        template: moveTemplate,
    },
    enemies: {
        title: 'Enemies',
        template: moveTemplate,
    },
    moves: {
        title: 'Moves',
        template: moveTemplate,
    },
    weapons: {
        title: 'Weapons',
        template: moveTemplate,
    },
    armors: {
        title: 'Armors',
        template: moveTemplate,
    },
    items: {
        title: 'Items',
        template: moveTemplate,
    },
    keyItems: {
        title: 'Key-Items',
        template: moveTemplate,
    },
    preBattle: {
        title: 'Pre-Battle',
        template: moveTemplate,
    },
    locations: {
        title: 'Locations',
        template: moveTemplate,
    },
    ui: {
        title: 'UI',
        template: moveTemplate,
    },
    locations: {
        title: 'Locations',
        template: moveTemplate,
    },
    other: {
        title: 'Other',
        template: moveTemplate,
    },
};
