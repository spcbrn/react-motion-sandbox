import React from 'react'
import { Motion, spring } from 'react-motion';


/*
<Content /> is the component that we're animating, we'll achieve this by letting <Motion /> calculate and interpolate our 'width' value, from 0 to 100 using spring(), and passing it in via props to update the 'flex-basis' attribute.
*/
const Content = (props) => {
  let width = `${props.width}%`;
  let style = {
    "flex-basis":width,
    "background":"#333",
    "color":"#FFF"
  }

  return (
    <div style={style}><h1>Hello world!</h1></div>
  )
}

const MotionCSS = () => {

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
        <div className="wrapper">
          <Content width={style.width} />
        </div>
      )}
    </Motion>
  )
}

export default MotionCSS;
