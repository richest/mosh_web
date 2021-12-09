import React from "react";
import Carousel from 'react-bootstrap/Carousel'

const LoginSlider = () => {
    const sliderInfo = [{ themeText: "Dating App", info: "Mutual sympathy. Do not waste time and write to her", img: "/webapp/images/dating-app-login.png" },
    { themeText: "Find Best Friend", info: "Mutual sympathy. Do not waste time and write to her", img: "/webapp/images/find-friend-login.png" },
    { themeText: "Find Best Friend", info: "Mutual sympathy. Do not waste time and write to her", img: "/webapp/images/live-login.png" },
    ]
    return (
        <>
            <div className="signup-wrapper__slider">
                <div className=" ">
                    <Carousel id="sampleSlide" >
                        {
                            sliderInfo.map((data) => (
                                <Carousel.Item interval={900} >
                                    <div className="item text-center">
                                        <figure>
                                            <img className="d-block w-100" src={data.img} alt="Dating App" />
                                        </figure>
                                        <div className="signup-slider__content">
                                            <h4 className="theme-txt">{data.themeText}</h4>
                                            <p>{data.info}</p>
                                        </div>
                                    </div>
                                </Carousel.Item>
                            ))
                        }
                    </Carousel>
                </div>
            </div>
        </>
    )
}

export default LoginSlider;