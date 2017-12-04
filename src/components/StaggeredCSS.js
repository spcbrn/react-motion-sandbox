import React from 'react';
import { StaggeredMotion, spring } from 'react-motion';

const colors = [
  '#80CBC4',
  '#4DB6AC',
  '#26A69A',
  '#009688',
  '#00897B'
]

const SlideBox = (props) => {
  let { bgColor } = props;
  let width = `${props.width}%`;
  let style = {
    "background": bgColor,
    "flex-basis": width
  };

  return (
    <div className="box" style={style}></div>
  )
}

const ViewBox = (props) => {
  let { bgColor } = props;
  let width = `${props.width}%`;
  let style = {
    "background": bgColor,
    "flex-basis": width
  };

  return (
    <div className="view-box" style={style}>
      <div className="view-body"><h1>Hello world!</h1></div>
    </div>
  )
}

const StaggeredCSS = () => {

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
      ]}
    >
      {(styles) => (
        <div className="wrapper">
          <SlideBox bgColor={colors[0]} width={styles[0].width} />
          <SlideBox bgColor={colors[1]} width={styles[1].width} />
          <SlideBox bgColor={colors[2]} width={styles[2].width} />
          <SlideBox bgColor={colors[3]} width={styles[3].width} />
          <ViewBox bgColor={colors[4]} width={styles[4].width} />
        </div>
      )}
    </StaggeredMotion>
  )
}

export default StaggeredCSS;
