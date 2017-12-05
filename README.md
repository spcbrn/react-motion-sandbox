# React-Motion Sandbox


Use the react-motion library to animate UI and components in React.

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)


## Installation

    $ npm install


## Usage

This is the working directory.

### Examples

After running `npm install`, run `npm start` and navigate to <a href="http://localhost:3000">http://localhost:3000</a>.
Here you'll be able to navigate between views, and see examples of the animations covered in this repo.
<br /><br />
To understand how the animations work, and how react-motion is being implemented, navigate into the `/components` directory, and you'll find the React components that contain the code for the animations, which is extensively commented on.
<br /><br />

#### Slide Transition
`/components/MotionStyledComp.js` => A simple slide-in animation using styled-components.
<br /><br />

##### Creating our Components
Here we'll use the styled-components library to generate our `<Wrapper />` component, and to generate the `<Content />` component, which is the component we'll be animating:

```
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

##### Wrapping our Components

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

When we use react-motion, it always expects a function between it's elements.  The reason for this is that it will invoke that function repeatedly as it runs it's calculation on our values, passing in the current state/value of the calculation.
For example, here we've giving `<Motion />` an object with a single property, `width`.  We've told it that the value of `width` will initially be `0`, and it's final value should be `100`, but we want it to use spring physics to calculate the progression of that value from `0` to `100`.  As it runs this calculation, it will invoke the below function many times per second, passing in the current value of `width` until the calculation is complete and the desired final value is achieved.  This is called interpolation.
<br  />

On each invocation, we take in the object as `style`, pull the interpolating value off of `width`, and pass it into our component via props.  This will update our `flex-basis` value, or any other attribute(s) we choose to apply this to (sizing, positioning, color etc...) on the fly, in real-time.

Notice that when using styled-components, we can inject content/elements/child components into the component tags when we render them:

```
<Content width={style.width}>
  <h1>Hello world!</h1>
</Content>
```

`/components/MotionCSS.js` => The same slide-in animation using traditional CSS and custom styling.

#### Staggered Transition
`/components/StaggeredStyledComp.js` => A simple staggered page transition using styled-components.
`/components/StaggeredCSS.js` => the same staggered page transitino using traditional CSS and custom styling.
