import { combineReducers } from 'redux';
import { Homereducer } from '../../modules/Home/HomeReducer';
import { LoginReducer } from '../../modules/Login/LoginReducer';
import { Authreducer } from '../.././library/common/reducers/AuthReducer'
import { ChatReducer } from '../../modules/Chat/ChatReducer';
import { SingleProfileReducer } from '../../modules/SingleProfile/SingleProfileReducer'
import { LikesReducer } from '../../modules/Likes/LikesReducer';
import { MessageOnlineReducer } from '../../modules/MessageOnline/MessageOnlineReducer';
import { ProfileReducer } from '../../modules/Profile/ProfileReducer';
import { FriendListReducer } from '../../modules/Chat/FriendListReducer';

export default combineReducers({
    Homereducer,
    LoginReducer,
    Authreducer,
    ChatReducer,
    SingleProfileReducer,
    LikesReducer,
    MessageOnlineReducer,
    ProfileReducer,
    FriendListReducer
});