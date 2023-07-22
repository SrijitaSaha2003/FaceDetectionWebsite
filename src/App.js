import React,{Component} from 'react';
import './App.css';
import Navigation from './Components/NavigationBar/Navigation';
import FaceIdentification from './Components/FaceIdentify/FaceIdentification';
import Logo1 from './Components/Logos/Logo1';
import ImageInputsform from './Components/ImageInputForm/ImageInputsForm';
import ParticlesBg from 'particles-bg';
   

const returnClarifaiRequestOptions=(imageUrl)=>{
  ///////////////////////////////////////////////////////////////////////////////////////////////////
    // In this section, we set the user authentication, user and app ID, model details, and the URL
    // of the image we want as an input. Change these strings to run your own example.
    //////////////////////////////////////////////////////////////////////////////////////////////////
  
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  //const PAT = '52790c813b904c39a5aabf43dd677f8a';
  const REACT_APP_PAT=process.env.REACT_APP_PAT;
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = 'srijita2003';       
  const APP_ID = 'facedetectionproject';
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = 'face-detection';   
  const IMAGE_URL = imageUrl; 
  const raw = JSON.stringify({ 
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    }, 
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
});
   const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + REACT_APP_PAT
      },
      body: raw
  };
  return requestOptions;
}   
//
class App extends Component{
  constructor(){
    super();
    this.state={
      input:'',
      imageUrl:'',
      box: {} 
    }
  }
  
  calculateFaceLocation=(value)=>{
    const face=value.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('input__image');
    const width=Number(image.width);
    const height=Number(image.height);
    const boxdetails={
      leftcol: face.left_col * width,                      //
      rightcol: width- (face.right_col * width),
      toprow: face.top_row * height,
      bottomrow: height - (face.bottom_row * height),
    }
    return boxdetails;
  }

  displayFaceBox=(box)=>{
    this.setState({box: box});
  }

  onInputChange=(event)=>{
    //console.log(event.target.value);
    this.setState({input: event.target.value});
  }
  onButtonSubmit=()=>{
    this.setState({imageUrl: this.state.input});
    fetch("https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs",returnClarifaiRequestOptions(this.state.input))
        .then(response => response.json())
        .then(response=>this.displayFaceBox(this.calculateFaceLocation(response)))
        .catch(error=>console.log(error));
  }
  render(){
    return (
      <div className="App">
        <ParticlesBg className="particles" num="140" type="cobweb" bg={true} />
        <Navigation/>
        <Logo1/>
        <ImageInputsform onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceIdentification box={this.state.box} imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
