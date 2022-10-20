export interface PostInfo {
    title: string;
    postedBy: string;
    text: string;
    timeDate: string;
    count?: number
}

export interface UserBase {
    userName: string;
    email: string;
    password: string;
    checkPassword: string;
    gender: string
}