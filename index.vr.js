import React from 'react';
import {
  Animated,
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
} from 'react-vr';

export default class v1 extends React.Component {
  constructor(props) {
    super(props);
    this.state= {yspin:0,
      x:0,
      y:0,
      z:-3,
      rotate:0};
    setInterval(() => { 
      this.setState(
        {yspin: this.state.yspin+1,
        z: -3 * Math.cos(this.state.yspin/20),
        x: -3 * Math.sin(this.state.yspin/20),
        y:  Math.sin(this.state.yspin/5),
        rotate: 9*this.state.yspin/Math.PI}
      );
    }, 20)
  }

  render() {
    return (
      <View>
        <Pano source={asset('lake.jpg')}
        style={{
          transform: [{rotateY: this.state.yspin}]
        }}/>
        <Text
          style={{
            fontSize: 0.4,
            fontWeight: '400',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [this.state.x, this.state.y, this.state.z]}, {rotateY: this.state.rotate}],
          }}>
          chase me!
        </Text>
        <Text
          style={{
            fontSize: 0.2,
            fontWeight: '400',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [2.1,2,-3]}],
          }}>
          score:
        </Text>
      </View>
    );
  }
};


AppRegistry.registerComponent('v1', () => v1);
