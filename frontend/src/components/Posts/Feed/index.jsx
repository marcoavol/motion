import { FeedContainerStyled } from "./styles"
import PostInput from "../PostInput/index"
import Post from "../Post/index"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { postsFetch } from "../../../store/actions/posts"
import { getMockPost } from "../../../assets/mockups" //TODO: Remove when not used anymore


const Feed = () => {
    const dispatch = useDispatch()
    const filter = useSelector(state => state.postsReducer.postsFilter)
    const postsAll = useSelector(state => state.postsReducer.postsAll)
    const mockPost = getMockPost() //TODO: Remove when not used anymore

    //TODO: Update liked, followed and friends posts list immediately after dislike, unfollow, unfriend (remove from given list in state)
    //TODO: Fetch all posts once and add self filtered lists (likes, friends, following) as well to state (instead of refetching filtered lists on each user click)
    //TODO: Implement some kind of lazy-loading
    useEffect(() => dispatch(postsFetch()), [])
    
    return (
        <FeedContainerStyled>
            <PostInput />
            <Post user={mockPost.user} timestamp={mockPost.created} text={mockPost.content} images={mockPost.images} liked={mockPost.logged_in_user_liked} likes={mockPost.amount_of_likes} />
            {postsAll.map((post, index) => <Post key={index} id={post.id} user={post.user} timestamp={post.created} text={post.content} images={post.images} liked={post.user in post.liked_by} likes={post.liked_by.length} />)}
        </FeedContainerStyled>
    )
}

export default Feed