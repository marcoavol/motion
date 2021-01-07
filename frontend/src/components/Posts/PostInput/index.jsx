import { ButtonRoundStyled } from "../../../styles/buttons"
import { PostInputContainerStyled } from "./styles"
import arrowIcon from "../../../assets/icons/arrow.png" 
import { getMockAvatar} from "../../../assets/mockups" 
import { useSelector } from "react-redux"

const PostInput = () => {
    const user = useSelector(state => state.sessionReducer.user)
    const mockAvatar = getMockAvatar(true) //TODO: Remove when not used anymore

    const postInputHandler = (e) => {
        e.preventDefault()
        //TODO: Make post request here
    }

    return (
        <PostInputContainerStyled>
            <form onSubmit={postInputHandler} >
                <label htmlFor="post-input"><img id="avatar" src={user.avatar ? user.avatar : mockAvatar} alt="Avatar" /></label>
                <input id="post-input" name="post" type="text" placeholder={`What's on your mind, ${user.first_name}?`} />
                <ButtonRoundStyled id="submit-btn" colored={true} type="submit"><img src={arrowIcon} alt="Create post button" /></ButtonRoundStyled>
            </form>
        </PostInputContainerStyled>
    )
}

export default PostInput