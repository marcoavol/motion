import defaultAvatar from "./assets/defaultAvatar.png"

export const getAvatar = (user) => {
    return user.avatar ? user.avatar : defaultAvatar
}