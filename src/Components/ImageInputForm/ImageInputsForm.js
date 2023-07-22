import React from 'react';
import './ImageInputsForm.css';

const ImageInputsForm=({onInputChange,onButtonSubmit})=>{
    return(
        <div>
            <p className="pa3 f4">Give us the image of a person and See the magic...</p>
            <div>
                <input type="text" 
                placeholder="Enter your URL" 
                className="pa3 w-60"
                onChange={onInputChange}/>
                <button className="pa3 ma3 w5" onClick={onButtonSubmit}>DETECT</button>
            </div>
        </div>
    )
}

export default ImageInputsForm;