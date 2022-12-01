import mongoose, { Schema, Types } from "mongoose";

export interface ISong{
    name: string,
    spotifyId: string,
    userId: string,
    location:{
        time: Date,
        longitude: number,
        latitude: number,
    }
}

const schema = new Schema<ISong>({
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