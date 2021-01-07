import { PostsContainerStyled } from "./styles"
import MainHeader from "../MainHeader/index"
import Header from "./Header/index"
import Feed from "./Feed/index"

const Posts = () => {
    return (
        <>
            <MainHeader />
            <PostsContainerStyled>
                <Header />
                <Feed />
             </PostsContainerStyled>
        </>
    )
}

export default Posts