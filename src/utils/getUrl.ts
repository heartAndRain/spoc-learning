import {PUBLIC_URL, IMAGE_URL, VIDEO_URL} from '../static'
export enum SourseType {
    Image,
    Video,
    File
}
export function getUrl(type: SourseType, name: string) {
    let url = ''
    switch(type) {
        case SourseType.Image:
            url += `${IMAGE_URL}/${name}`
            break
        case SourseType.Video:
            url += `${VIDEO_URL}/${name}`
            break
        case SourseType.File:
            url += `${PUBLIC_URL}/${name}`
    }
    return url
}