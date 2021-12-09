import { replceMultiStringWithSIngle } from "../../library/utilities/functions";

// ---------------------- login validation`s start ----------------------------------//
const addValidation = (validation) => {
    console.log(validation, "validation")
    for (var key of Object.keys(validation)) {
        if (!validation[key].status) {
            if (!!validation[key].validation.current) { validation[key].validation.current.style.display = "block"}
            
        }
        else {
            if (!!validation[key].validation.current) { validation[key].validation.current.style.display = "none"}
            
        }
    }
}

const handleMainValidation = (validation, phoneProps) => {
    validation.is_valid_phone.status = phoneProps.contact !== "" ? true : false;
    return validation
}

const handleAboutInfoValidation = (validation, aboutProps) => {
    let firstName = replceMultiStringWithSIngle(aboutProps.f_name);
    let lastName = replceMultiStringWithSIngle(aboutProps.l_name);
    validation.is_valid_firstName.status = (firstName !== " " && firstName !== "") ? true : false;
    validation.is_valid_last.status = (lastName != "" && lastName != " ") ? true : false;
    validation.is_valid_email.status = aboutProps.email.match("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$") ? true : false;
    validation.is_valid_agree.status = aboutProps.agree == true ? true : false;
    validation.is_valid_confirm.status = aboutProps.confirm == true ? true : false;
    return validation
}
const handleAccountInfoValidation = (validation, accountProps) => {
    validation.is_valid_heightFeet.status = accountProps.heightFeet != "" ? true : false;
    validation.is_valid_weight.status = accountProps.weight !== "" ? true : false;
    validation.is_valid_relationship.status = accountProps.my_relationship !== "" ? true : false;
    validation.is_valid_gender.status = accountProps.my_gender !== "" ? true : false;
    validation.is_valid_interest.status = accountProps.my_interest !== "" ? true : false;
    validation.is_valid_education.status = accountProps.my_education !== "" ? true : false;
    validation.is_valid_profession.status = accountProps.my_profession !== "" ? true : false;
    return validation
}

const handleChoosePhotoValidation = (validation, img_data) => {
    validation.is_valid_photo.status = img_data !== "" ? true : false;
    return validation
}
const handleChooseLocationValidation = (validation, chooseLocationProps) => {
    validation.is_valid_country.status = chooseLocationProps.country !== "" ? true : false;
    validation.is_valid_state.status = chooseLocationProps.state !== "" ? true : false;
    validation.is_valid_city.status = chooseLocationProps.city !== "" ? true : false;
    return validation
}

const handleLookingForValidation = (validation, my_looking) => {
    validation.is_valid_lookingfor.status = my_looking.length > 0 ? true : false;
    return validation
}
// ---------------------- login validation's end ----------------------------------//

export {
    addValidation, handleAboutInfoValidation, handleAccountInfoValidation, handleChoosePhotoValidation,
    handleChooseLocationValidation , handleLookingForValidation , handleMainValidation
}