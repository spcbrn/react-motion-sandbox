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

/*
Here we'll use the styled-components library to generate our <Wrapper /> component, and to generate the <*Box /> components that we'll use for our animation.

Benefits of using styled-components are that we can write our CSS with the same syntactic paradigm as a .css file, and additionally we can inject props directly in order to set the values of various attributes.  This makes writing custom animations quite straight-forward and flexible.
*/

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
        {/*
          defaultStyles represents the initial set of values to be modified via animation, formatted as an array.

          styles represents the final values/calculations of the set of defaultStyles values.
          */}
        {/*
          When we use react-motion, it always expects a function between it's elements.  The reason for this is that it will invoke that function repeatedly as it runs it's calculation on our values, passing in the current state/values of the calculation.
          For example, here we've given <StaggeredMotion /> an array with a set of objects containing the property, 'width'.  We've told it that for the first four objects the value of 'width' will initially be 100, and the final value should be 0, but we want it to use spring physics to calculate the progression of those values from 0 to 100.  After the first object, each object will reference the value of the last, to create a staggered effect as the calculation is run.  The fifth value will start at 100, and we'll use spring physics to take it down to, ultimately, 100 - 0 (the final value of the property it references), which allows it to grow in proportion to the collapsing <SlideBox /> elements.  As it runs this calculation, it will invoke the below function many times per second, passing in the current values of our array until the calculation is complete and the desired final values are achieved.  This is called interpolation.
          On each invokation, we take in the objects as 'styles', pull the interpolating values off of the 'width' properties, and pass them into our components via props.  This will update the 'flex-basis' values, or any other attribute we choose to apply them to (sizing, positioning, color etc...) on the fly, in real-time.

          The result is, starting with the first <SlideBox /> element, that the width of each <SlideBox /> will, using spring physics, collapse from 100 to 0, each triggering the next to collapse, until all four have a width of 0.  While this happens, the <ViewBox /> element's width will grow from 0 to 100, to occupy the space we're creating.
        */}
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
