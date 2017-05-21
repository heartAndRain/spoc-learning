import {Lokka} from 'lokka'
import {Transport} from 'lokka-transport-http'
import {API_URL} from '../static'

export const Client = new Lokka({
    transport: new Transport(API_URL)
})