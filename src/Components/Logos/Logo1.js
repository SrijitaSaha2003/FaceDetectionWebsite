import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo1.css';
import faceicon2 from './faceicon2.jpg';
const Logo1=()=>{
    return(
            <Tilt className="tilt__new">
            <div style={{ height: '100px'}}>
              <img src={faceicon2} alt='logo'/>
            </div>
            </Tilt>
    )
}

export default Logo1;