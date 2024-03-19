import mongoose from 'mongoose';

let multilingualField = new mongoose.Schema({
    en: String,
    es: String,
    jp: String,
    fr: String,
    br: String,
    ch: String,
    de: String,
    ru: String,
}, { _id : false });

let categoryData = new mongoose.Schema({}, { strict: false, _id: false });

let categoryField = new mongoose.Schema({
    key: String,
    label: String,
    dataType: {
        type: String,
        enum: [
            'text',
            'number',
            'array'
        ],
        default: 'text'
    },
    collectionType: {
        type: String,
        enum: [
            'none',
            'array'
        ]
    },
    localized: Boolean
}, { _id : false });

let category = new mongoose.Schema({
    title: multilingualField,
    nameField: String,
    template: [categoryField]
}, { _id : false });

let position = new mongoose.Schema({
    name: String,
    override: String,
    emote: String,
}, { _id : false });

let multilingualChoices = new mongoose.Schema({
    en: [String],
    es: [String],
    jp: [String],
    fr: [String],
    br: [String],
    ch: [String],
    de: [String],
    ru: [String],
}, { _id : false });

let multilingualTexts = new mongoose.Schema({
    en: String,
    es: String,
    jp: String,
    fr: String,
    br: String,
    ch: String,
    de: String,
    ru: String,
}, { _id : false });

let dialogue = new mongoose.Schema({
    positions: {
        left: position,
        leftFront: position,
        rightFront: position,
        right: position,
    },
    text: {
        type: multilingualTexts,
        default: {
            en: '',
            es: '',
            jp: '',
            fr: '',
            br: '',
            ch: '',
        },
    },
    choices: {
        type: multilingualChoices,
        default: {
            en: [],
            es: [],
            jp: [],
            fr: [],
            br: [],
            ch: [],
        },
    },
    active: String,
    notes: {
        type: String,
        default: '',
    },
}, { _id : false });

let scene = new mongoose.Schema({
    dialogue: {
        type: [dialogue],
    },
    options: {
        smallerPortraits: {
            type: Boolean,
            default: false,
        },
        disablePortraits: {
            type: Boolean,
            default: false,
        },
        keepBlackBars: {
            type: Boolean,
            default: false,
        },
    },
}, { _id : false });

let chapter = new mongoose.Schema({
    scenes: {
        type: Map,
        of: scene,
    },
}, { _id : false });

let scriptSchema = new mongoose.Schema({
    id: String,
    editor: String,
    type: {
        type: String,
        default: 'script',
    },
    name: {
        type: String,
        default: 'Script',
    },
    categories: {
        type: Map,
        of: category,
        default: {}
    },
    categoryData: {
        type: Map,
        of: categoryData,
        default: {}
    }
});

export default mongoose.model('scripts', scriptSchema);
