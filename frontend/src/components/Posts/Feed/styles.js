import styled from "styled-components"

const FeedContainerLayout = styled.div `    
    //TODO: Implement asymmetric grid layout (see https://www.npmjs.com/package/react-masonry-css, https://masonry.desandro.com/)
    padding: 3% 9%;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > div {
        margin-bottom: 3%;
        width: 50%;
    }

    & > div:last-child {
        margin-bottom: 0;
    }
    
`
export const FeedContainerStyled = (props) => <FeedContainerLayout>{props.children}</FeedContainerLayout>