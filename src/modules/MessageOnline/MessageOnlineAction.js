import { CHANGE_PAGE_NUMBER } from "./MessageConstant"

const changeMessagePageNumber = (newState) => {
return {type:CHANGE_PAGE_NUMBER , newState}
}
export {changeMessagePageNumber}