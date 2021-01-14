import { Link } from "react-router-dom"
import { PostContainerStyled } from "./styles"
import { ButtonStyled, ButtonRoundStyled } from "../../../styles/buttons"
import menuIcon from "../../../assets/icons/menu.png"
import unheartIcon from "../../../assets/icons/unheart.png"
import heartIcon from "../../../assets/icons/heart.png"
import shareIcon from "../../../assets/icons/share.png"
import overlay from "../../../assets/overlay.png"
import { getAvatar } from "../../../utils.js"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { postLikeToggle } from "../../../store/actions/posts"

const Post = (props) => {
    const dispatch = useDispatch()
    const [post, setPost] = useState(props.post)

    const likeHandler = (id) => {
        dispatch(postLikeToggle(id))
            .then(result => {
                if (result) {
                    setPost(result)
                }
            })
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
                <Link to="/profile"><ButtonRoundStyled><img src={getAvatar(post.user)} alt="Avatar"/></ButtonRoundStyled></Link>
                <div id="info-div">
                    <p>{`${post.user.first_name} ${post.user.last_name}`}</p>
                    <p id="timestamp">{getTimestamp(post.created)}</p>
                </div>
                <ButtonStyled id="menu-btn"><img src={menuIcon} alt="Menu icon"/></ButtonStyled>
            </header>
            <p id="text">{post.content}</p>
            {post.images.length ?
                <div id="image-container">
                    {post.images.map((image, index) => {
                        if (post.images.length <= 4 || index < 3) {
                            return <button key={index} style={{"backgroundImage": `url(${image})`}} onClick={imageViewHandler} />
                        } else if (index === 3) {
                            return <button key={index} style={{"backgroundImage": `url(${image})`}} onClick={imageViewHandler}>
                                <img src={overlay} alt="Overlay"/>
                                <p>{`+${post.images.length - 4}`}</p>
                            </button>
                        } else {
                            return null
                        }
                    })}
                </div>
                : null
            }
            <footer>
                <ButtonStyled className={`reaction-btn ${post.liked_by.map(user => user.id).includes(props.currentUser.id) ? "liked" : ""}`} onClick={() => likeHandler(post.id)}>
                    <img src={post.liked_by.map(user => user.id).includes(props.currentUser.id) ? heartIcon : unheartIcon} alt="Like button"/>
                    Like
                </ButtonStyled>
                <ButtonStyled className="reaction-btn" onClick={shareHandler}>
                    <img src={shareIcon} alt="Share button"/>
                    Share
                </ButtonStyled>
                <p>{`${post.liked_by.length} likes`}</p>
            </footer>
        </PostContainerStyled>
    )
}

export default Post