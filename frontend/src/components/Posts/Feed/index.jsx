import { FeedContainerStyled } from "./styles"
import PostInput from "../PostInput/index"
import Post from "../Post/index"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { postsFetch } from "../../../store/actions/posts"
import { getMockPost } from "../../../assets/mockups" //TODO: Remove when not used anymore

const Feed = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.sessionReducer.user)
    const filter = useSelector(state => state.postsReducer.postsFilter)
    const postsAll = useSelector(state => state.postsReducer.postsAll)
    const [postsDisplayed, setPostsDisplayed] = useState(postsAll)
    const mockPost = getMockPost() //TODO: Remove when not used anymore

    //TODO: Implement some kind of lazy-loading
    useEffect(() => dispatch(postsFetch()), [])

    useEffect(() => updatePostsDisplayed(), [filter, postsAll])

    //TODO: Make requests to respective endpoints instead of filtering here?
    //TODO: Update liked, followed and friends posts list immediately after dislike, unfollow, unfriend (remove from given list in state)
    const updatePostsDisplayed = () => {
        let newPostsDisplayed = []
        if (filter === "") {newPostsDisplayed = postsAll}
        if (filter === "likes") {newPostsDisplayed = postsAll.filter(post => post.liked_by.map(user => user.id).includes(currentUser.id))}
        if (filter === "friends") {newPostsDisplayed = postsAll.filter(post => currentUser.friends.map(user => user.id).includes(post.user.id))}
        if (filter === "following") {newPostsDisplayed = postsAll.filter(post => currentUser.followees.map(user => user.id).includes(post.user.id))}
        setPostsDisplayed(newPostsDisplayed)
    }

    return (
        <FeedContainerStyled>
            <PostInput />
            {/*<Post user={mockPost.user} timestamp={mockPost.created} text={mockPost.content} images={mockPost.images} liked={mockPost.logged_in_user_liked} likes={mockPost.amount_of_likes} />*/}
            {postsDisplayed.map((post, index) => <Post key={index} post={post} currentUser={currentUser} />)}
        </FeedContainerStyled>
    )
}

export default Feed