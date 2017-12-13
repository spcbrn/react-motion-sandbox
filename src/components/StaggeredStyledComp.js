import React, { Component } from 'react';
import { StaggeredMotion, spring } from 'react-motion';
import styled from 'styled-components';

const colors = [
  '#80CBC4',
  '#4DB6AC',
  '#26A69A',
  '#009688',
  '#00897B'
]

//<Wrapper /> is going to wrap our animation components.
const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  min-height: 100vh;
`;

//<SlideBox /> will be used as the collapsable element(s) that we'll animate to reveal our content.
const SlideBox = styled.div`
  flex-basis: ${(props) => props.width}%;
  background: ${(props) => props.bgColor};
`

//<ViewBox /> will expand as our <SlideBox /> components collapse, and will render our content container <ViewBody />.
const ViewBox = styled.div`
  flex-basis: ${(props) => props.width}%;
  background: ${(props) => props.bgColor};
  overflow: hidden;
`

//<ViewBody /> will contain the content that is being revealed by our animation.
const ViewBody = styled.div`
  overflow: hidden;
  width: 98vw;
`


class StaggeredStyledComp extends Component {
// could be a functional component just as well

  render() {
    return (

      <StaggeredMotion
        defaultStyles={[
          { width: 100 },
          { width: 100 },
          { width: 100 },
          { width: 100 },
          { width: 0 }
        ]}
        styles={(prevStyles) => [
          { width: spring(0) },
          { width: spring(prevStyles[0].width) },
          { width: spring(prevStyles[1].width) },
          { width: spring(prevStyles[2].width) },
          { width: spring(100-prevStyles[2].width) }
        ]} >
        {(styles) => (
          <Wrapper>
            <SlideBox bgColor={colors[0]} width={styles[0].width} />
            <SlideBox bgColor={colors[1]} width={styles[1].width} />
            <SlideBox bgColor={colors[2]} width={styles[2].width} />
            <SlideBox bgColor={colors[3]} width={styles[3].width} />
            <ViewBox bgColor={colors[4]} width={styles[4].width}>
              <ViewBody>
                {/*could render a commponent/view here so that the animation reveals it*/}
                <h1>GET TO ZE CHOPPAH!</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <img src="http://buzz16.com/wp-content/uploads/2017/01/Arnold-Schwarzenegger-Bodybuilding-Pictures-38.jpg" alt="arnie"/>
              </ViewBody>
            </ViewBox>
          </Wrapper>
        )}
      </StaggeredMotion>
    )
  }
}

export default StaggeredStyledComp;
