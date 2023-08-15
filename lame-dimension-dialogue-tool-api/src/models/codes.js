import mongoose from 'mongoose';

let codeSchema = new mongoose.Schema({
    code: String,
});

export default mongoose.model('codes', codeSchema);
