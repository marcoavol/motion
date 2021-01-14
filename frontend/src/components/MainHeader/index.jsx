import { Link } from "react-router-dom"
import { ButtonStyled, ButtonRoundStyled } from "../../styles/buttons"
import { MainHeaderContainerStyled } from "./styles"
import motionLogo from "../../assets/logos/motionColored.png" 
import gridIcon from "../../assets/icons/grid.png" 
import friendsIcon from "../../assets/icons/friends.png" 
import bellIcon from "../../assets/icons/bell.png" 
import menuIcon from "../../assets/icons/menu.png" 
import { getAvatar } from "../../assets/mockups"
import { postsFilterAction } from "../../store/actions/posts"
import { useSelector, useDispatch } from "react-redux"
import {baseURL} from "../../store/constants";

const MainHeader = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.sessionReducer.user)

    //TODO: Implement possibility to scroll to top with click on posts, home or both

    const resetPostsFilter = () => {
        dispatch(postsFilterAction(""))
    }

    return (
        <MainHeaderContainerStyled>
            <nav id="nav-bar">
                <Link id="home-link" className="nav-link" to="/posts"><img src={motionLogo} alt="Link to home" />Motion</Link>
                <Link className="nav-link active" to="/posts" onClick={resetPostsFilter}><img src={gridIcon} alt="Link to posts" />Posts</Link>
                <Link className="nav-link" to="/friendsfinder"><img src={friendsIcon} alt="Link to friendsfinder" />Find Friends</Link>
                <ButtonStyled id="notifications-btn"><img src={bellIcon} alt="Bell icon" /><p id="notifications-count">3</p></ButtonStyled>
                <Link id="profile-link" to="/profile"><ButtonRoundStyled><img src={user.avatar} alt="Avatar" /></ButtonRoundStyled></Link>
                <ButtonStyled id="menu-btn"><img src={menuIcon} alt="Menu icon" /></ButtonStyled>
            </nav>
        </MainHeaderContainerStyled>
    )
}

export default MainHeader