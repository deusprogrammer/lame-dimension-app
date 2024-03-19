import mongoose from 'mongoose';

let multilingualTexts = new mongoose.Schema({
    en: String,
    es: String,
    jp: String,
    fr: String,
    br: String,
    ch: String,
    de: String,
    ru: String,
});

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
});

let categorySchema = new mongoose.Schema({
    title: multilingualTexts,
    nameField: String,
    template: [categoryField]
});

export default mongoose.model('categories', categorySchema);