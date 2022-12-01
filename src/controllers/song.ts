import Song, { ISong } from "../models/song";
import { Request, Response } from "express"
import DbConnect from "../utils/DbConnect";

interface ISongGroup {
    name: string,
    location: {
        time: Date,
        latitude: number,
        longitude: number,
    }[]
}

export const addSong = async (req: Request, res: Response) => {
    await DbConnect()
    let songResult = await Song.collection.insertOne(req.body)
    res.status(200).send("dupa")
}

export const getSong = async (req: Request, res: Response) => {
    let db = await DbConnect()
    console.log("d")
    console.log(new Date('2022-11-27'))
    const userId = req.headers.user
    let songs: ISong[] = await Song.aggregate([
        { $match: { userId: userId, 'location.time': { $gte: new Date('2022-11-29').toISOString() } } },
    ])
    console.log(songs)
    let songsGroups: ISongGroup[] = [{ name: '', location: [{latitude: 0, longitude: 0, time: new Date()}]}]
    if (songs.length > 0) {
        songsGroups = createGroups(songs)
    }
    console.log(songsGroups)
    res.status(200).send(songsGroups)
}



const createGroups = (songs: ISong[]) => {
    console.log(songs.length)
    let songsGroup: ISongGroup[] = [{ name: '', location: [{latitude: 0, longitude: 0, time: new Date()}] }]
    let singleGroup: ISongGroup = { name: '', location: [{latitude: 0, longitude: 0, time: new Date()}]}
    songs.forEach((song, i, arr) => {
        if (i != 0 && song.name == arr[i - 1].name) {
            singleGroup = { name: song.name, location: [...singleGroup.location, song.location] }
        }
        else {
            songsGroup.push(singleGroup)
            singleGroup = { name: song.name, location: [song.location] }
        }
    })
    return songsGroup
}