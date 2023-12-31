import mongoose from 'mongoose';

let position = new mongoose.Schema({
    name: String,
    override: String,
    emote: String,
});

let multilingualChoices = new mongoose.Schema({
    en: [String],
    es: [String],
    jp: [String],
    fr: [String],
    br: [String],
    ch: [String],
});

let multilingualTexts = new mongoose.Schema({
    en: String,
    es: String,
    jp: String,
    fr: String,
    br: String,
    ch: String,
});

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
});

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
});

let chapter = new mongoose.Schema({
    scenes: {
        type: Map,
        of: scene,
    },
});

let character = new mongoose.Schema({
    name: String,
    emotes: [String],
});

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
    characters: {
        type: Map,
        of: character,
    },
    chapters: {
        type: Map,
        of: chapter,
    },
});

export default mongoose.model('scripts', scriptSchema);
