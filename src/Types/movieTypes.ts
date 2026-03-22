export type MovieType = {
    title: string,
    overView: string,
    posterPath: string,
    status: number,
    recommendationId: number,
    recommendedByUserName: string,
    reason?: string | null,
    recipientRating?: number | null,
    recipientNotes?: string | null
}

export type LibraryMovieType = {
    title: string,
    overView: string,
    posterPath: string,
    runtime: string
}

export type RecommendationDetailType = {
    recommendationId: number,
    title: string,
    overView: string,
    posterPath: string,
    runtime: string,
    status: number,
    recommendedByUserName: string,
    reason?: string | null,
    recipientRating?: number | null,
    recipientNotes?: string | null
}