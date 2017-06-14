namespace Models{
    export declare type loginUserInfo =  {
        userId: number
        username: string
        role: string
        stat: string
    }
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
        episodes: Array<Episode>
    }

    export declare type Category = {
        categoryId: number
        name: string
        cover: string
    }

    export declare type Episode = {
        episodeId: string
        type: number
        name: string,
        itemList: Array<CourseItem>
    }

    export declare type CourseItem = {
        itemId: string
        name: string
        introduce: string
        video: string
        source: Array<Source>
        homework: Array<Homework>
    }

    export declare type Source = {
        type: number
        name: string
        introduce: string
        url: string
    }

    export declare type Homework =  {
        hwId: string
        type: number
        name: string
        deadline: string
        score: number
        pass: number
        questions: Array<Question>
    }

    export declare type Question = {
        title: string
        options?: Array<SelectOption>
    }

    export declare type SelectOption = {
        index: number
        content: string
    }

}

