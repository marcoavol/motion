import { FeedContainerStyled } from "./styles"
import PostInput from "../PostInput/index"
import Post from "../Post/index"
import { getMockPost } from "../../../assets/mockups"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { postsFetch } from "../../../store/actions/posts"

const Feed = () => {
    const dispatch = useDispatch()
    const filter = useSelector(state => state.postsReducer.postsFilter)
    const postsAll = useSelector(state => state.postsReducer.postsAll)
    const [postsDisplayed, setPostsDisplayed] = useState(postsAll)
    const mockPost = getMockPost() //TODO: Remove when not used anymore

    //TODO: Update liked, followed and friends posts list immediately after dislike, unfollow, unfriend (remove from given list in state)
    //TODO: Fetch all posts once and add self filtered lists (likes, friends, following) as well to state (instead of refetching filtered lists on each user click)
    //TODO: Implement some kind of lazy-loading
    useEffect(() => dispatch(postsFetch()), []) 

    useEffect(() => updatePostsDisplayed(), [filter, postsAll])

    const updatePostsDisplayed = () => {
        let newPostsDisplayed = []
        if (filter === "") {newPostsDisplayed = postsAll}
        if (filter === "likes") {newPostsDisplayed = postsAll.filter(post => post.logged_in_user_liked)}
        if (filter === "friends") {newPostsDisplayed = postsAll.filter(post => post.user.logged_in_user_is_friends)}
        if (filter === "following") {newPostsDisplayed = postsAll.filter(post => post.user.logged_in_user_is_following)}
        setPostsDisplayed(newPostsDisplayed)
    }
    
    return (
        <FeedContainerStyled>
            <PostInput />
            <Post user={mockPost.user} timestamp={mockPost.created} text={mockPost.content} images={mockPost.images} liked={mockPost.logged_in_user_liked} likes={mockPost.amount_of_likes} />
            {postsDisplayed.map((post, index) => <Post key={index} id={post.id} user={post.user} timestamp={post.created} text={post.content} images={post.images} liked={post.logged_in_user_liked} likes={post.amount_of_likes} />)}
        </FeedContainerStyled>
    )
}

export default Feed