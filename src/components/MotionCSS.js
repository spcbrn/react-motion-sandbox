import React from 'react'
import { Motion, spring } from 'react-motion';



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

const MotionCSS = () => {

  return (
    <Motion
      defaultStyle={ { width: 0 } }
      style={ { width: spring(100) } }
    >
      {(style) => (
        <div className="wrapper">
          <Content width={style.width} />
        </div>
      )}
    </Motion>
  )
}

export default MotionCSS;
