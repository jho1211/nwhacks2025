export interface User {
    uid: string,
    name: string,
    bio: string,
    profile_img: string,
    role: string // can be one of "mentor" or "mentee"
}

export interface Wish {
    item_name: string,
    url: string,
    priority: number
}

export interface Wishlist {
    uid: string,
    wishlist: Wish[]
}

export interface Message {
    id: string,
    sender_id: string,
    status: string,
    content: string,
    timestamp: Date,
    receiver_id: string
}

export interface Connection {
    id: string,
    participants: User[],
    status: string,
    messages_id: string
}

export interface Messages {
    id: string,
    messages: Message[]
}