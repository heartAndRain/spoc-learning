import {
    AsyncStorage
} from 'react-native'
import * as PubSub from 'pubsub-js'
import {LOGIN_URL, API_URL, UPLOAD_URL} from '../static'
var FileUpload = require('NativeModules').FileUpload

export class Client {
    private static networkInstance: any
    private apiUrl: string

    constructor(url: string) {
        this.apiUrl = url
    }

    static getInstance(): Client {
        if (this.networkInstance) {
            return this.networkInstance
        }
        this.networkInstance = new  Client(API_URL)
        return this.networkInstance
    }

    static async auth(username: string, password: string): Promise<{success: boolean, errNum?: number}> {
        try {
            const data = await fetch(LOGIN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `user=${username}&key=${password}`
            })
            const result = await data.json()

            if (result.errNum === 0) {
                await AsyncStorage.setItem('@userkey', result.token)

                // 获取当前用户信息
                const {currentUser} = await this.getInstance().query(`
                    {
                        currentUser {
                            userId,
                            username,
                            role,
                            stat
                        }
                    }
                `)
                // 持久化
                const cuUserArray = Object.keys(currentUser).map((key) =>[`@${key}`, '' + currentUser[key]])
                await AsyncStorage.multiSet(cuUserArray)

                return {success: true}
            } else {
                return {success: false, errNum: result.errNum}
            }
            
        } catch(e) {
            console.log('login error', e)
        }
        
    }

    async query(gql: string, vars?: any) {
        const bodyJson: any = {
            query: gql
        }
        if (vars) {
            bodyJson.variables = vars
        }

        return this._fetch(JSON.stringify(bodyJson), 'POST')
    }

    private async _fetch(body: any,  method: 'GET' | 'POST' = 'GET', headers: any = {}) {
        const userKey = await AsyncStorage.getItem('@userkey')
        // const headers: any = {}

        if (!headers['Content-Type']) {
            headers['Content-Type'] = 'application/json'
        }
        
        if (userKey) {
            headers.Authorization = `Bearer ${userKey}`
        }
        
        // console.log(`${method}: ${this.apiUrl},headers: ${JSON.stringify(headers)},body: ${body}`)
        
        const data = await fetch(this.apiUrl, {
            method,
            headers,
            body
        })
        return this.dataHandler(data)
    }

    public async upload(files: {filename: string, filepath: string, filetype: string}[]) {
        const userKey = await AsyncStorage.getItem('@userkey')
        const headers: any = {
            'Accept': 'application/json'
        }
        if (userKey) {
            headers.Authorization = `Bearer ${userKey}`
        }
        const options = {
            uploadUrl: UPLOAD_URL,
            method: 'POST',
            headers,
            fields: {
                types: files.map((file) => file.filetype).join(',')
            },
            files
        }

        return new Promise((resolve, reject) => {
            FileUpload.upload(options, async (err: any, result: any) => {
                if (err) {
                    reject(err)
                }
                const res = JSON.parse(result.data)
                if (+res.static === 0) {
                    reject('服务器上传错误')
                }
                resolve(res.fileName)
            })
        })
    }

    private async dataHandler(data: Response) {
        let result: any
        switch(data.status) {
            /** api调用错误 */
            case 400:
                console.log('graphql调用错误')
                result = await data.json()
                return Promise.reject(JSON.stringify(result))
            /** 授权失败 */
            case 401:
                console.log('授权失败')
                PubSub.publish('LOGIN', {})
                return Promise.reject('授权失败')
            /** 请求地址未找到 */
            case 404:
                console.log('请求地址未找到 ')
                return Promise.reject('请求地址未找到')
            default:
                result = await data.json()
                return result.data
        }
    }
}


