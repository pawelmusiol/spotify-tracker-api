import { Router } from "express";
import axios from 'axios'

let router = Router()

const CLIENT_ID = '13468edbe14f4dffb0d9b40c7b3480cd'
const CLIENT_SECRET = 'd099fc5a25de49568071f1b8cb5d3f5e'

router.get('/login', (req, res) => {
    const params = new URLSearchParams();
    params.append('client_id', CLIENT_ID)
    params.append('response_type', 'code')
    params.append('redirect_uri', 'http://192.168.0.168:9000/callback')
    params.append('state', 'dupa')
    params.append('scope', 'user-read-private user-read-playback-state user-modify-playback-state')
    params.append('show_dialog', 'true')

    const spotifyUri = `https://accounts.spotify.com/authorize?${params.toString()}`

    res.redirect(spotifyUri)
})

router.get('/callback', async (req, res) => {
    if (req.query.error) {
        res.send(req.query.error)
    }
    else if(!req.query.access_token) {
        let code = req.query.code || null;
        let state = req.query.state || null;
        if (code !== null) {
            let response = await axios.post('https://accounts.spotify.com/api/token', {
                code: code,
                redirect_uri: 'http://192.168.0.168:9000/callback',
                grant_type: 'authorization_code'
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')}`
                }
            })
            let params = new URLSearchParams()
            Object.entries(response.data).forEach((key) => {
                if(typeof key[1] === 'string') params.append(key[0],key[1])
                else if (typeof key[1] === 'number') params.append(key[0],String(key[1]))
            })
            res.redirect(`http://192.168.0.168:9000/callback?${params.toString()}`)
        }
    } else {
        res.send(req.query)
    }

})

export default router