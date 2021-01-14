import { Link } from "react-router-dom"
import { HeaderContainerStyled } from "./styles"
import searchIcon from "../../../assets/icons/search.png"
import {postsFetch, postsFilterAction} from "../../../store/actions/posts"
import { useSelector, useDispatch } from "react-redux"

const Header = () => {
    const dispatch = useDispatch()
    const filter = useSelector(state => state.postsReducer.postsFilter)

    const searchInputHandler = (e) => {
        console.log(e.target.value)
    }

    const searchHandler = (e) => {
        e.preventDefault()
        //TODO: Make search request here
    }

    const postsFilterHandler = (e) => {
        dispatch(postsFilterAction(e.target.id))
    }

    return (
        <HeaderContainerStyled>
            <form id="search-form" onSubmit={searchHandler} >
                <label>
                    <img src={searchIcon} alt="Search icon"/>
                    <input name="search" type="search" placeholder="Search posts..." onChange={searchInputHandler} required />
                </label> 
                <input type="submit" hidden />
            </form>
            <nav id="nav-bar">
                <Link id="likes" className={`nav-link ${filter === "likes" ? " active" : ""}`} to="/posts/liked" onClick={postsFilterHandler}>Liked</Link>
                <Link id="friends" className={`nav-link ${filter === "friends" ? " active" : ""}`} to="/posts/friends" onClick={postsFilterHandler}>Friends</Link>
                <Link id="following" className={`nav-link ${filter === "following" ? " active" : ""}`} to="/posts/follow" onClick={postsFilterHandler}>Follow</Link>
            </nav>
        </HeaderContainerStyled>
    )
}

export default Header