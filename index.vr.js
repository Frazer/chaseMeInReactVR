import React from 'react';
import {
  Animated,
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Sound,
  VrHeadModel
} from 'react-vr';

export default class v1 extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      timer:0
    };
    this.targetYspin = 0;
    this.x = 0;
    this.y = 0;
    this.z = -3;
    this.rotate = 0;
    this.targetSpeed = 0;
    this.score = 0;
    this.scoreHeight = 2;
    this.musicVolume = 1;

    this.lastFrame = null;

    this.hittingObject = false;
    
  }

  componentDidMount(){
    requestAnimationFrame(this.calc.bind(this));
  }

  calc(timestamp){ 
    // debugger
      this.setState({timer: this.state.timer+1});

      if (!this.lastFrame) this.lastFrame = timestamp;
      var delta = timestamp - this.lastFrame ;
      this.lastFrame = timestamp;

      this.targetYspin += this.targetSpeed*delta/5;
      this.z =  -3* Math.cos(this.targetYspin/20);
      this.x =  -3 * Math.sin(this.targetYspin/20);
      this.y =   Math.sin(this.targetYspin/5);
      this.rotate = (9*this.targetYspin/Math.PI)%360;

      if(this.hittingObject){
        this.score++;
        this.targetSpeed = this.targetSpeed+0.0002;
        
      }

      requestAnimationFrame(this.calc.bind(this));
    };


  // need to add an 'ended' event to the audio

  /*
  <VrButton
          style={{width: 0.7}}
          onClick={()=>this.scoreUpdate()}>
          CHASE ME
    </VrButton>
    */

  render() {
    // console.log( VrHeadModel.position());
     // VrHeadModel... rotation, rotationInRadians, yawPitchRoll or yawPitchRollInRadians
    // console.log( VrHeadModel.horizontalFov());
     // console.log(VrHeadModel.verticalFov());

    var rot = VrHeadModel.rotation();
    var vr = VrHeadModel.inVR();
    // var vrs = VrHeadModel.getVRStatus();
    var rotx = rot[0];
    if(vr){
      this.scoreHeight = 2.8;
    }else{
      this.scoreHeight = 2;
    }

    var targetX = rot[0];
    var targetY = rot[1];

    if(Math.abs(rot[2])>90){
      targetX = targetX>0? 180-targetX : -180-targetX;
      targetY = targetY>0? 180-targetY : -180-targetY;
    }
    targetY = (targetY+360)%360;



    if(targetY<this.rotate+15 && targetY>this.rotate-15  && ( (rot[1]>54 && rot[1]<85) || (rot[1]>-80 && rot[1]<-50) || Math.abs(Math.tan(targetX /180*Math.PI)*3 - this.y) < 0.2)  ){
      this.hittingObject = true;
    }else{
      this.hittingObject = false
    }

    // if(this.state.timer%50 ==0){
    //   if(!this.hittingObject){
    //     console.log("rot",rot);
    //     console.log("tx",targetX);

    //     console.log("calc",Math.tan(targetX /180*Math.PI)*3 );
    //     console.log("y",this.y)
    //   }
    // // console.log("target",targetX - this.rotate);
    // // console.log("ate",this.rotate);

    // }


  
    return (
      <View>
        
        <Pano source={asset('lake.jpg')}
        style={{
          transform: [{rotateY: -this.targetYspin*this.targetYspin/1000}]
        }}/>
        
          <Text
            style={{
              fontSize: 0.4,
              fontWeight: '400',
              layoutOrigin: [0.5, 0.5],
              paddingLeft: 0.2,
              paddingRight: 0.2,
              color: this.hittingObject?'red':'white',
              textAlign: 'center',
              textAlignVertical: 'center',
              transform: [{translate: [this.x, this.y, this.z]}, {rotateY: this.rotate}],

            }}
            onEnter= {()=>{this.hittingObject = true}}
            onExit= {()=>{this.hittingObject = false}}
            >
            {this.score? 'chase me!':'look at me'}
            <Sound
              source={{mp3: asset('Jahzzar_-_05_-_Siesta.mp3')}}
              loop={true}
              volume={1} />
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
            transform: [   {rotateX: rotx}, {rotateY: rot[1]}, {rotateZ: rot[2]}, {translate: [0,this.scoreHeight,-3]},  ],
          }}>
          score: {this.score}
          
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
            transform: [   {rotateX: rotx}, {rotateY: rot[1]}, {rotateZ: rot[2]}, {translate: [0,0.7,-3]},  ],
          }}>
          *
        </Text>
        
      </View>
    );
  }
};


AppRegistry.registerComponent('v1', () => v1);
