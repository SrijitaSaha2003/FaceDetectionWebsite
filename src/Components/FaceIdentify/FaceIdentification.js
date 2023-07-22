import React from 'react';
import './FaceIdentification.css'
const FaceIdentification=({imageUrl,box})=>{
    return(
        <div className="center flex justify-center">
            <div className="absolute mt4 mb4">
            <img id="input__image" src={imageUrl} alt="" width="400px" height="auto"/>
            <div className="bounding-box" style={{top: box.toprow,bottom: box.bottomrow,left: box.leftcol,right: box.rightcol}}></div>
            </div>
        </div>
    )
}
export default FaceIdentification;