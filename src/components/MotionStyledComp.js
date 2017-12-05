import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import styled from 'styled-components';


/*
Here we'll use the styled-components library to generate our <Wrapper /> component, and to generate the <Content /> component, which is the component we'll be animating.

Benefits of using styled-components are that we can write our CSS with the same syntactic paradigm as a .css file, and additionally we can inject props directly in order to set the values of various attributes.  This makes writing custom animations quite straight-forward and flexible.
*/

//<Wrapper /> is going to wrap our animated component.
const Wrapper = styled.div`
  background:#00897B;
  display: flex;
  width: 100vw;
  min-height: 100vh;
`;

//<Content /> is our animated component.
const Content = styled.div`
  flex-basis: ${(props) => props.width}%;
  background: #333;
  color: #FFF;
`

class MotionStyledComp extends Component {

  render() {
    return (
      {/*
        We wrap the element(s)/component(s) that we wish to animate in react-motion's <Motion /> tag. We then pass in a 'defaultStyle' object with the property/value we want react-motion to calculate from, and a 'style' object representing what we want the final value of that property to be.  By wrapping the final value in spring(), we allow react-motion to calculate and interpolate/return the value using spring physics, which we can apply to our UI element(s) in real-time.
      */}
      <Motion
        defaultStyle={{ width: 0 }}
        style={{ width: spring(100)} }
      >
      {/*
        When we use react-motion, it always expects a function between it's elements.  The reason for this is that it will invoke that function repeatedly as it runs it's calculation on our values, passing in the current state/value of the calculation.
        For example, here we've given <Motion /> an object with a single property, 'width'.  We've told it that the value of 'width' will initially be 0, and it's final value should be 100, but we want it to use spring physics to calculate the progression of that value from 0 to 100.  As it runs this calculation, it will invoke the below function many times per second, passing in the current value of 'width' until the calculation is complete and the desired final value is achieved.  This is called interpolation.
        On each invokation, we take in the object as 'style', pull the interpolating value off of 'width', and pass it into our component via props.  This will update the 'flex-basis' value, or any other attribute we choose to apply this to (sizing, positioning, color etc...) on the fly, in real-time.
      */}
        {(style) => (
          <Wrapper>
            <Content width={style.width}>
            {/*
              Notice that when using styled-components, we can inject content/elements/components within the component tags when we render them.
            */}
              <h1>Hello world!</h1>
            </Content>
          </Wrapper>
        )}
      </Motion>
    )
  }
}

export default MotionStyledComp;
