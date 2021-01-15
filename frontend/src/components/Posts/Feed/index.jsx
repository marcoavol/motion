import { FeedContainerStyled } from "./styles"
import PostInput from "../PostInput/index"
import Post from "../Post/index"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { postsFetch } from "../../../store/actions/posts"

const Feed = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.sessionReducer.user)
    const filter = useSelector(state => state.postsReducer.postsFilter)
    const posts = useSelector(state => state.postsReducer.postsList)

    //TODO: Implement some kind of lazy-loading
    //TODO: Update liked, followed and friends posts list immediately after dislike, unfollow, unfriend (remove from given list in state)

    useEffect(() => dispatch(postsFetch(filter)), [filter])

    return (
        <FeedContainerStyled>
            <PostInput />
            {posts.map((post, index) => <Post key={index} post={post} currentUser={currentUser} />)}
        </FeedContainerStyled>
    )
}

export default Feed