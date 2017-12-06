# React-Motion Sandbox


Use the react-motion library to animate UI and components in React.

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Examples](#examples)


## Installation

    $ npm install


## Usage

This is the working directory.

## Examples

* [Slide Transition w/ styled-components](#Slide Transition w/ styled-components)

After running `npm install`, run `npm start` and navigate to <a href="http://localhost:3000">http://localhost:3000</a>.
Here you'll be able to navigate between views, and see examples of the animations covered in this repo.
<br /><br />

### Slide Transition w/ styled-components

` /components/MotionStyledComp.js ` => A simple slide-in animation using styled-components.
<br />

#### Creating our Components
Here we'll use the styled-components library to generate our `<Wrapper />` component, and to generate the `<Content />` component, which is the component we'll be animating:

```
import styled from 'styled-components';

const Wrapper = styled.div`
  background:#00897B;
  display: flex;
  width: 100vw;
  min-height: 100vh;
`;

const Content = styled.div`
  flex-basis: ${(props) => props.width}%;
  background: #333;
  color: #FFF;
`;
```

Benefits of using styled-components are that we can write our CSS with the same syntactic paradigm as a .css file, and additionally we can inject props directly into our CSS in order to set the values of various attributes.  This makes writing custom animations quite straight-forward and flexible.

#### Wrapping our Components

We wrap the element(s)/component(s) that we wish to animate in react-motion's `<Motion />` tag. We then pass an object into the `defaultStyle` prop with the property/value we want react-motion to calculate from, and another into the `style` prop representing what we want the final value of that property to be.  By wrapping the final value in `spring()`, we allow react-motion to calculate and interpolate/return the value using spring physics, which we can apply to our UI element(s) in real-time:

```
<Motion
  defaultStyle={ { width: 0 } }
  style={ { width: spring(100) } }
>
  {(style) => (
    <Wrapper>
      <Content width={style.width}>
        <h1>Hello world!</h1>
      </Content>
    </Wrapper>
  )}
</Motion>
```

When we use react-motion, it always expects a function as it's child.  The reason for this is that it will invoke that function repeatedly as it runs it's calculation on our values, passing in the current state/value of the calculation.
For example, here we've giving `<Motion />` an object with a single property, `width`.  We've told it that the value of `width` will initially be `0`, and it's final value should be `100`, but we want it to use spring physics to calculate the progression of that value from `0` to `100`.  As it runs this calculation, it will invoke the child function many times per second, passing in the current value of `width` until the calculation is complete and the desired final value is achieved.  This is called interpolation.


On each invocation, we take in the object as `style`, pull the interpolating value off of `width`, and pass it into our component via props.  This will update our `flex-basis` value, or any other attribute(s) we choose to apply this to (sizing, positioning, color etc...) on the fly, in real-time.

Notice that when using styled-components, we can inject content/elements/child components into the component tags when we render them:

```
<Content width={style.width}>
  <h1>Hello world!</h1>
</Content>
```
<br />

### Slide Transition w/o styled-components

`/components/MotionCSS.js` => The same slide-in animation using traditional CSS and custom styling.

#### Creating our components

Here we'll forego using the styled-components library and generate our `<Content />` component by writing a function that takes in props and returns our HTML/JSX (a functional component):

```
const Content = (props) => {
  let width = `${props.width}%`;
  let style = {
    "flex-basis": width,
    "background": "#333",
    "color": "#FFF"
  }

  return (
    <div style={style}>
      <h1>Hello world!</h1>
    </div>
  )
}
```

Notice that we're creating a custom `style` object containing the CSS properties for our `<Content />` component, and using the incoming `props` to determine the value of our `flex-basis` attribute.  Also notice that if we want `<Content />` to render other content/elements/child components, we must add them here, rather than when we render the component.  The reason being that React components, whether class-based or functional, are self-closing, so we cannot use them to wrap other content.

#### Wrapping our Components

This is essentially the same as the above example, though here we are simply wrapping `<Content />` in a `div` with a `className` of `wrapper`, and defining `wrapper`'s attributes in our css file:

```
{(style) => (
  <div className="wrapper">
    <Content width={style.width} />
  </div>
)}
```

### Staggered Transition w/ styled-components

`/components/StaggeredStyledComp.js` => A simple staggered page transition using styled-components.

#### Creating our components

Here we'll use the styled-components library to generate our `<Wrapper />` component, and to generate the `<***Box />` components that we'll use for our animation, taking in props and assigning their values to the CSS attributes we'll be animating:

```
const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  min-height: 100vh;
`;

const SlideBox = styled.div`
  flex-basis: ${(props) => props.width}%;
  background: ${(props) => props.bgColor};
`

const ViewBox = styled.div`
  flex-basis: ${(props) => props.width}%;
  background: ${(props) => props.bgColor};
  overflow: hidden;
`

const ViewBody = styled.div`
  overflow: hidden;
  width: 98vw;
`
```

`/components/StaggeredCSS.js` => the same staggered page transition using traditional CSS and custom styling.
