import { Link } from "react-router-dom"
import { PostContainerStyled } from "./styles"
import { ButtonStyled, ButtonRoundStyled } from "../../../styles/buttons"
import menuIcon from "../../../assets/icons/menu.png"
import unheartIcon from "../../../assets/icons/unheart.png"
import heartIcon from "../../../assets/icons/heart.png"
import shareIcon from "../../../assets/icons/share.png"
import overlay from "../../../assets/overlay.png"
import { getMockAvatar} from "../../../assets/mockups"
import { useDispatch } from "react-redux"
import { postLikeToggle } from "../../../store/actions/posts"

const Post = (props) => {
    const dispatch = useDispatch()
    const mockAvatar = getMockAvatar(false) //TODO: Remove when not used anymore

    const likeHandler = (id) => {
        if (!id) {return} //TODO: Remove when not used anymore        
        dispatch(postLikeToggle(id))
    }

    const shareHandler = (e) => {
        //TODO: Displays share modal here
    }

    const imageViewHandler = (e) => {
        //TODO: Display full size image view modal here
    }

    const getTimestamp = (dateStr) => {
        let timeCreated = Date.parse(dateStr)
        let timeCurrent = new Date().getTime()
        let millisecs = timeCurrent - timeCreated
        let seconds = (millisecs / 1000).toFixed(0)
        let minutes = (millisecs / (1000 * 60)).toFixed(0)
        let hours = (millisecs / (1000 * 60 * 60)).toFixed(0)
        let days = (millisecs / (1000 * 60 * 60 * 24)).toFixed(0)

        if (seconds < 60) {         
            return "Just now"             
        } else if (minutes < 60) {                 
            return minutes + " minutes ago"             
        } else if (hours < 24) {                 
            return hours + " hours ago"            
        }                
        return days + " Days ago"                      
    }

    return (
        <PostContainerStyled>
            <header>
                <Link to="/profile"><ButtonRoundStyled><img src={props.user.avatar ? props.user.avatar : mockAvatar} alt="Avatar" /></ButtonRoundStyled></Link>
                <div id="info-div">
                    <p>{`${props.user.first_name} ${props.user.last_name}`}</p>
                    <p id="timestamp">{getTimestamp(props.timestamp)}</p>
                </div>
                <ButtonStyled id="menu-btn"><img src={menuIcon} alt="Menu icon" /></ButtonStyled>
            </header>
            <p id="text">{props.text}</p>
            {props.images.length ? 
                <div id="image-container">
                    {props.images.map((image, index) => {
                        if (props.images.length <= 4 || index < 3) {
                            return <button key={index} style={{"backgroundImage": `url(${image})`}} onClick={imageViewHandler} />
                        } else if (index === 3) {
                            return <button key={index} style={{"backgroundImage": `url(${image})`}} onClick={imageViewHandler}><img src={overlay} alt="Overlay" /><p>{`+${props.images.length - 4}`}</p></button>
                        } else {
                            return null
                        }
                    })}
                </div>
                : null
            }
            <footer>
                <ButtonStyled className={`reaction-btn ${props.liked ? "liked" : ""}`} onClick={() => likeHandler(props.id)}><img src={props.liked ? heartIcon : unheartIcon} alt="Like button" />Like</ButtonStyled>
                <ButtonStyled className="reaction-btn" onClick={shareHandler}><img src={shareIcon} alt="Share button" />Share</ButtonStyled>
                <p>{`${props.likes} likes`}</p>
            </footer>
        </PostContainerStyled>
    )
}

export default Post