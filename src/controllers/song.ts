import { Song } from "../models";
import { Request, Response } from "express"
import DbConnect from "../utils/DbConnect";

export const addSong = async (req: Request, res: Response) => {
    await DbConnect()
    let songResult = await Song.collection.insertOne(req.body)
    res.status(200).send("dupa")
}

export const getSong = async (req: Request, res: Response) => {
    let db = await DbConnect()
    console.log("d")
    console.log(new Date('2022-11-27'))
    const userId =  req.headers.user
    let songs = await Song.aggregate([
        { $match: { userId: userId, 'location.time': { $gte: new Date('2022-11-29').toISOString() } } },
        /*{
            $project: {
                'location': {
                    $filter: {
                        input: '$location',
                        as: 'location',
                        cond: {$gte: ["$$location.time", new Date('2022-11-27').toISOString()]}
                    }
                }
            }
        }*/
    ])
    console.log(songs)
    res.status(200).send(songs)
}