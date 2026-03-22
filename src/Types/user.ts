export type UserBasicType = {
    userName: string,
    id: string
}

import type { MovieType } from "./movieTypes";

export type UserFullType = {
    userName: string,
    id: string,
    userMovies: MovieType[]
}