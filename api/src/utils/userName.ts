import { IUser } from "@/contracts/user"
import { Document } from "mongoose"


export const getUserName = (user: Omit<IUser, 'id'> & Document) => {
    if (user.firstName && user.lastName) {
        return `${user.firstName} ${user.lastName}`
    } else if (user.firstName) {
        return user.firstName
    } else if (user.lastName) {
        return user.lastName
    } else {
        return 'Anonymous'
    }
}
