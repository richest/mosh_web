import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { Button, Input } from '../../../library/common/components';
import { changeLoginStep, changeUploadImageInput } from '../LoginActions';
import { addValidation, handleChoosePhotoValidation } from '../validations';

const UploadImage = ({ step }) => {
  const dispatch = useDispatch();
  const openRegisterFile = useRef(null);
  const { addToast } = useToasts();
  const openFileValidation = useRef(null);
  const uploadImageState = useSelector(state => state.LoginReducer);
  const { uploadImage: { img_data, picture } } = uploadImageState;
  console.log(uploadImageState, "check");

  const handleFileChange = (e) => {
    var data = e.target.files[0];
    const fileName = data.name.split(".");
    const imageFormat = fileName[fileName.length - 1];
    if (e.target.files[0]) {
      if (imageFormat === "png" || imageFormat === "jpg" || imageFormat === "jpeg" ||
        imageFormat === "SVG" || imageFormat === "svg" || imageFormat === "PNG" || imageFormat === "JPG" || imageFormat === "JPEG") {
        dispatch(changeUploadImageInput({ picture: e.target.files[0] }));
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          dispatch(changeUploadImageInput({ img_data: reader.result }));
        });
        reader.readAsDataURL(e.target.files[0]);
      }
      else {
        addToast("Only .png, .jpg, .jpeg image formats supported.", {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    }
  }
  const handleNext = () => {
    let validation = {
      is_valid_photo: { status: false, elm: openRegisterFile, validation: openFileValidation },
    }
    console.log(validation, "elm")
    validation = handleChoosePhotoValidation(validation, img_data);
    let { is_valid_photo } = validation
    addValidation(validation)
    if (is_valid_photo.status) {
      dispatch(changeLoginStep({ step: step + 1 }))
    }

  }
  return (

    <div className="signup-inner" id="login-tab-5">
      <div className="signup-header">
        <a href="javascript:void(0)" className="login-back-4 btn-back" onClick={() => dispatch(changeLoginStep({ step: step - 1 }))}><i className="fas fa-chevron-left" /></a>
        <h4 className="theme-txt upload-txt-spacer">Upload Profile Photo</h4>
      </div>
      <div className="form-group upload-field position-relative mb-5">
        <img id="PreviewPicture" src={img_data} />
        <Input type="file" id="profile-photo" ref={openRegisterFile} name="profile-photo" onChange={handleFileChange} accept="image/*" />
        <span className="camera-icon" onClick={() => openRegisterFile.current.click()} >
          <img src="/webapp/images/Icon%20feather-camera.png" alt="Camera" />
        </span>
        <p style={{ display: "none" }} ref={openFileValidation} className="error-message">Please select photo</p>
      </div>
      <Button className="btn bg-grd-clr d-block mb-4 btn-countinue-5" href="javascript:void(0)" onClick={handleNext} >Next</Button>

    </div>
  )
}
export default UploadImage