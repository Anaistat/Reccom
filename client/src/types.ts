export enum Role{
    Admin = 'Admin',
    User = 'User'
}

export enum Category{
    Game = "Game",
    Book = "Book",
    Film = "Film"
}

export enum UserStatus{
    Block,
    Active
}


export type Product = {
    id: number
    title: string
    category: Category
    image: string
}


export type Review = {
    id: number
    product: Product
    title: string
    author: User
    date: Date
    tags: string[]
    score: number
    text: string
    images: string[]
    likes: number
    commentsCount: number
    isLikedByUser?: boolean
}

export type Comment = {
    id: number
    user: User
    text: string
    date: Date
    reviewId: number
}

export type UserForAdmin = {isChecked: boolean} & User


// Backend

export type Candidate = {
    uid: string
    name: string
    photo: string
}

export type User = {
    id: number
    uid: string
    name: string
    photo: string
    role: string
    status: string
    registrationDate: Date | string
    lastLoginDate: Date | string
}

// =========== Database types

export type DBUser = {
    id: number
    uid: string
    name: string
    photo: string
    role_id: number
    status_id: number
    registration_date: string
    last_login_date: string
}

export type DBReview = {
    id: number
    product_id: number
    title: string
    author_id: number
    date: string
    tags: string[]
    score: number
    text: string
    likes: number
    comments_count?: number
    images: string[]
}

export type DBComment = {
    id: number
    author_id: number
    text: string
    review_id: number
    date: string
}

export type DBProduct = {
    id: number
    title: string
    category_id: number
    image: string
}

type IdType = {
    id: number
    type: string
}

export type DBRole = IdType
export type DBStatus = IdType
export type DBCategory = IdType
export type DBUserStatus = IdType
