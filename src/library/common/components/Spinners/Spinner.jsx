import React from 'react';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`   
    text-align: center;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 44%;
    right: 50%;
`;

const Spinner = (props) => {
    return (
        <ClipLoader color={"#fff"} loading={!!props.loading ? true : false} css={override} />

    )
}
export default Spinner;