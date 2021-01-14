import {useSelector} from "react-redux";
import defaultAvatar from "./defaultAvatar.png"
import avatar from "./avatar.png"
import image1 from "./image_samples/image1.JPG"
import image2 from "./image_samples/image2.JPG"
import image3 from "./image_samples/image3.JPG"
import image4 from "./image_samples/image4.JPG"
import image5 from "./image_samples/image5.JPG"
import image6 from "./image_samples/image6.JPG"

export const getAvatar = (user) => {
    return user.avatar ? user.avatar.url : defaultAvatar
}

export const getMockPost = () => {
    const date = new Date().toString()
    const mockPost = {
        user: {
            avatar: avatar,
            first_name: "Marco",
            last_name: "Volken"
        },
        images: [image6, image2, image3, image4, image1, image5],
        content: "Lorem ipsum dolor sit amet, vim ut quas volumus probatus, has tantas laudern iracundia et, ad per utamur ceteros apeirian...",
        logged_in_user_liked: true,
        amount_of_likes: 15,
        created: date,
    }
    return mockPost
}

