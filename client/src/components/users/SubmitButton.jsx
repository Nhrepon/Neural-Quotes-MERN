import React from 'react';
import UserStore from "../../store/UserStore.js";

const SubmitButton = (props) => {
    const {isFormSubmit} = UserStore();


    if (isFormSubmit === false){
        return (
            <button onClick={props.onClick} type={props.type} className={props.className} >
                {props.text}
            </button>
        )
    }else {
        return (
            <button disabled={true} type={props.type} className={props.className}>
                <span className="spinner-border spinner-border-sm" role="status"></span>
                {" "}Processing...
            </button>
        )
    }


};

export default SubmitButton;