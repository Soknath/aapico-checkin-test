import React from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import AppBar from '../appBar';
import history from '../history';
import adapter from 'webrtc-adapter';
 
function App (props) {
  function handleTakePhoto (dataUri) {
    // Do stuff with the photo...
    history.push({
        pathname: './CardView', 
        state: {dataUri}
    })
    console.log('takePhoto');
  }
 
  function handleTakePhotoAnimationDone (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
  }
 
  function handleCameraError (error) {
    console.log('handleCameraError', error);
  }
 
  function handleCameraStart (stream) {
    console.log('handleCameraStart');
  }
 
  function handleCameraStop () {
    console.log('handleCameraStop');
  }
 
  return (
    <>
        <AppBar back={true} title={"Please Take Photo"}/>
            <Camera
            onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
            onTakePhotoAnimationDone = { (dataUri) => { handleTakePhotoAnimationDone(dataUri); } }
            onCameraError = { (error) => { handleCameraError(error); } }
            idealFacingMode = {FACING_MODES.USER}
            idealResolution = {{width: 640, height: 480}}
            imageType = {IMAGE_TYPES.JPG}
            imageCompression = {0.75}
            isMaxResolution = {true}
            isImageMirror = {false}
            isSilentMode = {false}
            isDisplayStartCameraError = {true}
            isFullscreen = {false}
            sizeFactor = {0.8}
            onCameraStart = { (stream) => { handleCameraStart(stream); } }
            onCameraStop = { () => { handleCameraStop(); } }
            />
    </>
  );
}
 
export default App;