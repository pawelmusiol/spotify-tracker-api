import mongoose, { Schema, Types } from "mongoose";

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    spotifyId: {
        type: String,
        required: true,
    },
    userId: String,
    location: {
        time: {
            type:Date,
            required: true
        },
        longitude: {
            type: Number,
            required: true,
        },
        latitude: {
            type: Number,
            required: true,
        }
    }
})

export default mongoose.models.Song || mongoose.model('song', schema)