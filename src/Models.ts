namespace Models{
    export declare type User = {
        userId: number
        username: string
        nickname: string
        role: string
        stat: string
        school: string
        selectedCourse: Array<Course>
    }

    export declare type Course = {
        courseId: number,
        name: string,
        type: number,
        cover: string,
        teacher: User
    }

    export declare type Category = {
        categoryId: number
        name: string
        cover: string
    }

    export declare type Episode = {
        type: number
        name: string,
        itemList: Array<CourseItem>
    }

    export declare type CourseItem = {
        itemId: string
        name: string
        introduce: string
        video: string
        source: Array<any>
    }
}