import {PUBLIC_URL} from '../static'
export enum SourseType {
    Image,
    Video
}
export function getUrl(type: SourseType, name: string) {
    let url = PUBLIC_URL
    switch(type) {
        case SourseType.Image:
            url += ('/image/' + name)
            break
        case SourseType.Video:
            break
    }
    return url
}