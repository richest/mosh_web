import React from 'react'
import { GoogleLogin } from 'react-google-login';
import { FacebookProvider, LoginButton } from 'react-facebook';
import { socialLoginDataApi } from '../../../library/api/LoginApiService';
import { changeMainStepInput, socialLoginType } from '../LoginActions';
// import AppleLogin from 'react-apple-login'

const MainContinueWith = ({ Button, dispatch }) => {
    const responseFacebook = (response) => {
        console.log(response, "slkdnvth");
      }

      const appleResponse = (resp) => {
          alert(JSON.stringify(resp))
          console.log(resp, "resp.......... apple")
      }
    const handleFacebookLoginSucess = (response) => {
        dispatch(socialLoginType({ socialType: 1 }))
        console.log(response, "facebook response sucess")
        const { name, email, id } = response.profile
        dispatch(changeMainStepInput({ loginSocialId : id }));
        var bodyParameters = {
            email: email,
            login_social_id: id,
            type: 1,
            device_type: 3,
            device_token: "",
            name: name,
        }
        dispatch(socialLoginDataApi(bodyParameters));
    }
    const handleFacebookLoginError = () => {
        // console.log(response, "facebook response Error")
    }
    const handleGoogleLoginSucess = (response) => {
        dispatch(socialLoginType({ socialType: 3 }))
        const { name, email, googleId } = response.profileObj
        console.log(response.profileObj, "response sucess")
        dispatch(changeMainStepInput({ loginSocialId : googleId }));

        var bodyParameters = {
            email: email,
            login_social_id: googleId,
            type: 3,
            device_type: 3,
            device_token: "",
            name: name,
        }
        dispatch(socialLoginDataApi(bodyParameters));
    }
    const handleGoogleLoginError = (response) => {
        console.log(response, "response error")
    }
    return (
        <>
            <p>Continue with</p>
            <ul className="social-login">
                <li>
                    <FacebookProvider appId="515792536190983" fields="name,email,picture">
                        <LoginButton scope="email" onCompleted={handleFacebookLoginSucess} onError={handleFacebookLoginError}>
                            <Button
                                className="bg-grd-clr"
                                href="javascript:void(0)">
                                <i className="fab fa-facebook-f" />
                            </Button>
                        </LoginButton>
                    </FacebookProvider>

                                {/* <FacebookLogin
    appId="515792536190983"
    fields="name,email,picture"
    cssClass="bg-grd-clr"
    callback={responseFacebook} /> */}
                         
                    

                </li>
                <li>
                    <GoogleLogin
                        clientId="443489738133-c7ahmb8l5pjcargdavkm29bfd0p53cct.apps.googleusercontent.com"
                        render={renderProps => (
                            <Button
                                className="bg-grd-clr"
                                href="javascript:void(0)"
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}>
                                <i className="fab fa-google" />
                            </Button>
                        )}
                        onSuccess={handleGoogleLoginSucess}
                        onFailure={handleGoogleLoginError}
                        cookiePolicy={'single_host_origin'} isSignedIn={false} />
                         {/* <AppleLogin
                          clientId="com.moshmatch.com.mosh"
                          scope={"email"}
                          responseMode={"query"}  
                          usePopup={true}
                          callback={(resp) => appleResponse(resp)}
                           redirectURI="https://moshmatch.com" /> */}
                </li>
            </ul>
        </>
    )
}

export default MainContinueWith