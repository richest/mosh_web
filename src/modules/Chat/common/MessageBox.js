import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { css } from "@emotion/core";
import BarLoader from "react-spinners/BarLoader";
import { useHistory, useParams } from "react-router-dom";
import moment from 'moment';
import $ from 'jquery'
import { Modal } from 'react-bootstrap';
import { useToasts } from 'react-toast-notifications';
import Emoji from 'reactjs-emojis';
import { Logo, MoshVipModel, Toolbars, UpgradeButton } from "../../../library/common/components";
import { clearBlockUnblockResponse, clearSingleProfileResponse } from "../../SingleProfile/SingleProfileAction";
import { blockUnblockDataApi, getSingleProfileDataApi } from "../../../library/api/SingleProfileApiService";
import useToggle, { addDefaultSrc, getCookie, replceMultiStringWithSIngle, returnDefaultImage } from "../../../library/utilities/functions";
import { changeBlockedStatus, changeFriendAcknowdge, changeMessageDetail, checkIsOnline, clearMessageDetail, completeMessageListData } from "../ChatAction";
import { SOCKET } from "../../../library/urls";
import { getAllByLabelText } from "@testing-library/react";
import { EmojiEncode, EmojiDecode } from 'emoji_encoding_decoding';
import { HomeFilter } from "../../Home/common";

const emojiUnicode = require("emoji-unicode"), toEmoji = require("emoji-name-map")
    ;

let emojiListCodes = [
    { "name": "coffee@richestsoft", "code": "\u{2615}" },
    { "name": "couple@richestsoft", "code": "\u{1f46b}" },
    { "name": "woman@richestsoft", "code": "\u{1f469}" },
    { "name": "cupid@richestsoft", "code": "\u{1f498}" },
    { "name": "two_hearts@richestsoft", "code": "\u{1f495}" },
    { "name": "wedding@richestsoft", "code": "\u{1f492}" },
    { "name": "bouquet@richestsoft", "code": "\u{1f490}" },
    { "name": "ring@richestsoft", "code": "\u{1f48d}" },
    { "name": "love_letter@richestsoft", "code": "\u{1f48c}" },
    { "name": "kiss@richestsoft", "code": "\u{1f48b}" },
    { "name": "cupid@richestsoft", "code": "\u{1f498}" },
    { "name": "gift_heart@richestsoft", "code": "\u{1f49d}" },
    { "name": "heart_decoration@richestsoft", "code": "\u{1f49f}" },
    { "name": "speech_balloon@richestsoft", "code": "\u{1f4ac}" },
    { "name": "princess@richestsoft", "code": "\u{1f478}" },
    { "name": "heartpulse@richestsoft", "code": "\u{1f497}" },
    { "name": "tea@richestsoft", "code": "\u{1f375}" },
    { "name": "nerd_face@richestsoft", "code": "\u{1f913}" },
    { "name": "sunglasses@richestsoft", "code": "\u{1f60e}" },
    { "name": "rage@richestsoft", "code": "\u{1f621}" },
    { "name": "persevere@richestsoft", "code": "\u{1f623}" }
    , { "name": "triumph@richestsoft", "code": "\u{1f624}" },
    { "name": "smirk@richestsoft", "code": "\u{1f60f}" },
    { "name": "neutral_face@richestsoft", "code": "\u{1f610}" },
    { "name": "blush@richestsoft", "code": "\u{1f60a}" },
    { "name": "yum@richestsoft", "code": "\u{1f60b}" },
    { "name": "relieved@richestsoft", "code": "\u{1f60c}" },
    { "name": "heart_eyes@richestsoft", "code": "\u{1f60d}" },
    { "name": "expressionless@richestsoft", "code": "\u{1f611}" },
    { "name": "unamused@richestsoft", "code": "\u{1f612}" },
    { "name": "sweat@richestsoft", "code": "\u{1f613}" },
    { "name": "pensive@richestsoft", "code": "\u{1f614}" },
    { "name": "cold_sweat@richestsoft", "code": "\u{1f630}" },
    { "name": "open_mouth@richestsoft", "code": "\u{1f62e}" },
    { "name": "sob@richestsoft", "code": "\u{1f62d}" },
    { "name": "kissing_heart@richestsoft", "code": "\u{1f618}" },
    { "name": "confounded@richestsoft", "code": "\u{1f616}" },
    { "name": "confused@richestsoft", "code": "\u{1f615}" },
    { "name": "pensive@richestsoft", "code": "\u{1f614}" },
    { "name": "sweat@richestsoft", "code": "\u{1f613}" },
    { "name": "unamused@richestsoft", "code": "\u{1f612}" },
    { "name": "expressionless@richestsoft", "code": "\u{1f611}" },
    { "name": "fire@richestsoft", "code": "\u{1f525}" },
    { "name": "hocho@richestsoft", "code": "\u{1f52a}" },
    { "name": "gun@richestsoft", "code": "\u{1f52b}" },
    { "name": "pray@richestsoft", "code": "\u{1f64f}" },
    { "name": "call_me_hand@richestsoft", "code": "\u{1f919}" },
    { "name": "handshake@richestsoft", "code": "\u{1f91d}" },
    { "name": "crossed_fingers@richestsoft", "code": "\u{1f91e}" },
    { "name": "open_hands@richestsoft", "code": "\u{1f450}" },
    { "name": "clap@richestsoft", "code": "\u{1f44f}" },
    { "name": "+1@richestsoft", "code": "\u{1f44d}" },
    { "name": "-1@richestsoft", "code": "\u{1f44e}" },
    { "name": "ok_hand@richestsoft", "code": "\u{1f44c}" },
    { "name": "wave@richestsoft", "code": "\u{1f44b}" }
    , { "name": "facepunch@richestsoft", "code": "\u{1f44a}" },
    { "name": "point_right@richestsoft", "code": "\u{1f449}" },
    { "name": "point_left@richestsoft", "code": "\u{1f448}" },
    { "name": "point_down@richestsoft", "code": "\u{1f447}" },
    { "name": "point_up_2@richestsoft", "code": "\u{1f446}" },
    { "name": "lips@richestsoft", "code": "\u{1f444}" },
    { "name": "muscle@richestsoft", "code": "\u{1f4aa}" },
    { "name": "raised_hand_with_fingers_splayed@richestsoft", "code": "\u{1f590}" },
    { "name": "grinning@richestsoft", "code": "\u{1f600}" },
    { "name": "grin@richestsoft", "code": "\u{1f601}" },
    { "name": "joy@richestsoft", "code": "\u{1f602}" },
    { "name": "smiley@richestsoft", "code": "\u{1f603}" }, { "name": "sweat_smile@richestsoft", "code": "\u{1f605}" }, { "name": "laughing@richestsoft", "code": "\u{1f606}" }, { "name": "innocent@richestsoft", "code": "\u{1f607}" }, { "name": "smiling_imp@richestsoft", "code": "\u{1f608}" }, { "name": "wink@richestsoft", "code": "\u{1f609}" }, { "name": "blush@richestsoft", "code": "\u{1f60a}" }, { "name": "yum@richestsoft", "code": "\u{1f60b}" }, { "name": "relieved@richestsoft", "code": "\u{1f60c}" }, { "name": "heart_eyes@richestsoft", "code": "\u{1f60d}" }, { "name": "smirk@richestsoft", "code": "\u{1f60f}" }, { "name": "neutral_face@richestsoft", "code": "\u{1f610}" }, { "name": "expressionless@richestsoft", "code": "\u{1f611}" }, { "name": "unamused@richestsoft", "code": "\u{1f612}" }, { "name": "sweat@richestsoft", "code": "\u{1f613}" }, { "name": "pensive@richestsoft", "code": "\u{1f614}" }, { "name": "confused@richestsoft", "code": "\u{1f615}" }, { "name": "confounded@richestsoft", "code": "\u{1f616}" }, { "name": "kissing@richestsoft", "code": "\u{1f617}" }, { "name": "kissing_heart@richestsoft", "code": "\u{1f618}" }, { "name": "kissing_smiling_eyes@richestsoft", "code": "\u{1f619}" }, { "name": "stuck_out_tongue@richestsoft", "code": "\u{1f61b}" }, { "name": "stuck_out_tongue_winking_eye@richestsoft", "code": "\u{1f61c}" }, { "name": "disappointed@richestsoft", "code": "\u{1f61e}" }, { "name": "worried@richestsoft", "code": "\u{1f61f}" }, { "name": "angry@richestsoft", "code": "\u{1f620}" }, { "name": "rage@richestsoft", "code": "\u{1f621}" }, { "name": "cry@richestsoft", "code": "\u{1f622}" }, { "name": "triumph@richestsoft", "code": "\u{1f624}" }, { "name": "disappointed_relieved@richestsoft", "code": "\u{1f625}" }, { "name": "frowning@richestsoft", "code": "\u{1f626}" }, { "name": "anguished@richestsoft", "code": "\u{1f627}" }, { "name": "fearful@richestsoft", "code": "\u{1f628}" }, { "name": "weary@richestsoft", "code": "\u{1f629}" }, { "name": "sleepy@richestsoft", "code": "\u{1f62a}" }, { "name": "tired_face@richestsoft", "code": "\u{1f62b}" }, { "name": "grimacing@richestsoft", "code": "\u{1f62c}" }, { "name": "sob@richestsoft", "code": "\u{1f62d}" }, { "name": "open_mouth@richestsoft", "code": "\u{1f62e}" }, { "name": "hushed@richestsoft", "code": "\u{1f62f}" }, { "name": "cold_sweat@richestsoft", "code": "\u{1f630}" }, { "name": "scream@richestsoft", "code": "\u{1f631}" }, { "name": "astonished@richestsoft", "code": "\u{1f632}" }, { "name": "flushed@richestsoft", "code": "\u{1f633}" }, { "name": "sleeping@richestsoft", "code": "\u{1f634}" }, { "name": "dizzy_face@richestsoft", "code": "\u{1f635}" }, { "name": "no_mouth@richestsoft", "code": "\u{1f636}" }, { "name": "mask@richestsoft", "code": "\u{1f637}" }, { "name": "smile_cat@richestsoft", "code": "\u{1f638}" }, { "name": "slightly_smiling_face@richestsoft", "code": "\u{1f642}" }, { "name": "upside_down_face@richestsoft", "code": "\u{1f643}" }, { "name": "raised_hands@richestsoft", "code": "\u{1f64c}" }, { "name": "zipper_mouth_face@richestsoft", "code": "\u{1f910}" }, { "name": "money_mouth_face@richestsoft", "code": "\u{1f911}" }, { "name": "face_with_thermometer@richestsoft", "code": "\u{1f912}" }, { "name": "nerd_face@richestsoft", "code": "\u{1f913}" }, { "name": "face_with_head_bandage@richestsoft", "code": "\u{1f915}" }, { "name": "raised_back_of_hand@richestsoft", "code": "\u{1f91a}" }, { "name": "drooling_face@richestsoft", "code": "\u{1f924}" }, { "name": "lying_face@richestsoft", "code": "\u{1f925}" }, { "name": "sneezing_face@richestsoft", "code": "\u{1f927}" }, { "name": "exploding_head@richestsoft", "code": "\u{1f92f}" }, { "name": "selfie@richestsoft", "code": "\u{1f933}" }, { "name": "clinking_glasses@richestsoft", "code": "\u{1f942}" }, { "name": "gift@richestsoft", "code": "\u{1f381}" }, { "name": "birthday@richestsoft", "code": "\u{1f382}" }, { "name": "champagne@richestsoft", "code": "\u{1f37e}" }, { "name": "beer@richestsoft", "code": "\u{1f37a}" }, { "name": "christmas_tree@richestsoft", "code": "\u{1f384}" }, { "name": "santa@richestsoft", "code": "\u{1f385}" }, { "name": "balloon@richestsoft", "code": "\u{1f388}" }, { "name": "tada@richestsoft", "code": "\u{1f389}" }, { "name": "dart@richestsoft", "code": "\u{1f3af}" }, { "name": "crescent_moon@richestsoft", "code": "\u{1f319}" }, { "name": "first_quarter_moon_with_face@richestsoft", "code": "\u{1f31b}" }, { "name": "full_moon_with_face@richestsoft", "code": "\u{1f31d}" }, { "name": "sun_with_face@richestsoft", "code": "\u{1f31e}" }, { "name": "tornado@richestsoft", "code": "\u{1f32a}" }, { "name": "hot_pepper@richestsoft", "code": "\u{1f336}" }, { "name": "tulip@richestsoft", "code": "\u{1f337}" }, { "name": "cherry_blossom@richestsoft", "code": "\u{1f338}" }, { "name": "rose@richestsoft", "code": "\u{1f339}" }, { "name": "hibiscus@richestsoft", "code": "\u{1f33a}" }, { "name": "sunflower@richestsoft", "code": "\u{1f33b}" }, { "name": "blossom@richestsoft", "code": "\u{1f33c}" }, { "name": "corn@richestsoft", "code": "\u{1f33d}" }, { "name": "hamburger@richestsoft", "code": "\u{1f354}" }, { "name": "pizza@richestsoft", "code": "\u{1f355}" }, { "name": "meat_on_bone@richestsoft", "code": "\u{1f356}" }, { "name": "reminder_ribbon@richestsoft", "code": "\u{1f397}" }, { "name": "trophy@richestsoft", "code": "\u{1f3c6}" }, { "name": "racing_car@richestsoft", "code": "\u{1f3ce}" }, { "name": "rat@richestsoft", "code": "\u{1f400}" }, { "name": "mouse2@richestsoft", "code": "\u{1f401}" }, { "name": "sheep@richestsoft", "code": "\u{1f411}" }, { "name": "fish@richestsoft", "code": "\u{1f41f}" }, { "name": "turtle@richestsoft", "code": "\u{1f422}" }, { "name": "hatched_chick@richestsoft", "code": "\u{1f425}" }, { "name": "eye@richestsoft", "code": "\u{1f441}" }, { "name": "tongue@richestsoft", "code": "\u{1f445}" }, { "name": "handbag@richestsoft", "code": "\u{1f45c}" }, { "name": "mans_shoe@richestsoft", "code": "\u{1f45e}" }, { "name": "sandal@richestsoft", "code": "\u{1f461}" }, { "name": "high_heel@richestsoft", "code": "\u{1f460}" }, { "name": "footprints@richestsoft", "code": "\u{1f463}" }, { "name": "bomb@richestsoft", "code": "\u{1f4a3}" }, { "name": "pushpin@richestsoft", "code": "\u{1f4cc}" }, { "name": "wrench@richestsoft", "code": "\u{1f527}" }, { "name": "hammer@richestsoft", "code": "\u{1f528}" }, { "name": "wilted_flower@richestsoft", "code": "\u{1f940}" }]
const override = css`
  display: block;
  margin: 10px auto;
  border-radius: 50px !important;
  width: 95%;
`;
const scrollToBottom = () => {
    var div = document.getElementById('chat-body');
    if (!!div)
        div.scroll({ top: div.scrollHeight, behavior: 'smooth' });
}
var frdMesageStatus = {
    friend_id: "",
    online: { read: false, unread: false, reciever_id: "" },
    offline: false
};

const removeDublicateMsg = (chatList) => {
    chatList.forEach((data_outer, i) => {
        let count = 0;
        chatList.forEach((data_inner, j) => {
            if (data_inner.message_id == data_outer.message_id) {
                count += 1;
                if (count > 1) {
                    chatList.splice(j, 1)
                }
            }
        })
    })
    return chatList
}

var emojiList = ["coffee", "couple", "woman", "cupid", "two_hearts", "wedding", "bouquet", "ring", "love_letter", "kiss", "cupid", "gift_heart", "heart_decoration", "speech_balloon", "princess", "heartpulse", "tea", "nerd_face", "sunglasses", "rage", "persevere", "triumph", "smirk", "neutral_face", "blush", "yum", "relieved", "heart_eyes", "expressionless", "unamused", "sweat", "pensive", "cold_sweat", "open_mouth", "sob", "kissing_heart", "confounded", "confused", "pensive", "sweat", "unamused", "expressionless", "fire", "hocho", "gun", "pray", "call_me_hand", "handshake", "crossed_fingers", "open_hands", "clap", "+1", "-1", "ok_hand", "wave", "facepunch", "point_right", "point_left", "point_down", "point_up_2", "lips", "muscle", "raised_hand_with_fingers_splayed", "grinning", "grin", "joy", "smiley", "sweat_smile", "laughing", "innocent", "smiling_imp", "wink", "blush", "yum", "relieved", "heart_eyes", "smirk", "neutral_face", "expressionless", "unamused", "sweat", "pensive", "confused", "confounded", "kissing", "kissing_heart", "kissing_smiling_eyes", "stuck_out_tongue", "stuck_out_tongue_winking_eye", "disappointed", "worried", "angry", "rage", "cry", "triumph", "disappointed_relieved", "frowning", "anguished", "fearful", "weary", "sleepy", "tired_face", "grimacing", "sob", "open_mouth", "hushed", "cold_sweat", "scream", "astonished", "flushed", "sleeping", "dizzy_face", "no_mouth", "mask", "smile_cat", "slightly_smiling_face", "upside_down_face", "raised_hands", "zipper_mouth_face", "money_mouth_face", "face_with_thermometer", "nerd_face", "face_with_head_bandage", "raised_back_of_hand", "drooling_face", "lying_face", "sneezing_face", "exploding_head", "selfie", "clinking_glasses", "gift", "birthday", "champagne", "beer", "christmas_tree", "santa", "balloon", "tada", "dart", "crescent_moon", "first_quarter_moon_with_face", "full_moon_with_face", "sun_with_face", "tornado", "hot_pepper", "tulip", "cherry_blossom", "rose", "hibiscus", "sunflower", "blossom", "corn", "hamburger", "pizza", "meat_on_bone", "reminder_ribbon", "trophy", "racing_car", "rat", "mouse2", "sheep", "fish", "turtle", "hatched_chick", "eye", "tongue", "handbag", "mans_shoe", "sandal", "high_heel", "footprints", "bomb", "pushpin", "wrench", "hammer", "wilted_flower"]
var emojiListRichest = ["coffee", "couple", "woman", "cupid", "two_hearts", "wedding", "bouquet", "ring", "love_letter", "kiss", "cupid", "gift_heart", "heart_decoration", "speech_balloon", "princess", "heartpulse", "tea", "nerd_face", "sunglasses", "rage", "persevere", "triumph", "smirk", "neutral_face", "blush", "yum", "relieved", "heart_eyes", "expressionless", "unamused", "sweat", "pensive", "cold_sweat", "open_mouth", "sob", "kissing_heart", "confounded", "confused", "pensive", "sweat", "unamused", "expressionless", "fire", "hocho", "gun", "pray", "call_me_hand", "handshake", "crossed_fingers", "open_hands", "clap", "+1", "-1", "ok_hand", "wave", "facepunch", "point_right", "point_left", "point_down", "point_up_2", "lips", "muscle", "raised_hand_with_fingers_splayed", "grinning", "grin", "joy", "smiley", "sweat_smile", "laughing", "innocent", "smiling_imp", "wink", "blush", "yum", "relieved", "heart_eyes", "smirk", "neutral_face", "expressionless", "unamused", "sweat", "pensive", "confused", "confounded", "kissing", "kissing_heart", "kissing_smiling_eyes", "stuck_out_tongue", "stuck_out_tongue_winking_eye", "disappointed", "worried", "angry", "rage", "cry", "triumph", "disappointed_relieved", "frowning", "anguished", "fearful", "weary", "sleepy", "tired_face", "grimacing", "sob", "open_mouth", "hushed", "cold_sweat", "scream", "astonished", "flushed", "sleeping", "dizzy_face", "no_mouth", "mask", "smile_cat", "slightly_smiling_face", "upside_down_face", "raised_hands", "zipper_mouth_face", "money_mouth_face", "face_with_thermometer", "nerd_face", "face_with_head_bandage", "raised_back_of_hand", "drooling_face", "lying_face", "sneezing_face", "exploding_head", "selfie", "clinking_glasses", "gift", "birthday", "champagne", "beer", "christmas_tree", "santa", "balloon", "tada", "dart", "crescent_moon", "first_quarter_moon_with_face", "full_moon_with_face", "sun_with_face", "tornado", "hot_pepper", "tulip", "cherry_blossom", "rose", "hibiscus", "sunflower", "blossom", "corn", "hamburger", "pizza", "meat_on_bone", "reminder_ribbon", "trophy", "racing_car", "rat", "mouse2", "sheep", "fish", "turtle", "hatched_chick", "eye", "tongue", "handbag", "mans_shoe", "sandal", "high_heel", "footprints", "bomb", "pushpin", "wrench", "hammer", "wilted_flower"]

function UpdateTextInput(text) {
    const textArray = text.replace(/\s\s+/g, ' ').split(' ');
    for (let i in textArray) {
        let is_emoji = false;
        for (let j in emojiListRichest) {
            if (textArray[i].match("@richestsoft")) {
                is_emoji = true;
            }
            else {
                is_emoji = false;
            }
        }
        textArray[i] = { text: textArray[i], is_emoji }
    }
    return textArray
}

function UpdateText(text) {
    const textArray = text.replace(/\s\s+/g, ' ').split(' ');
    for (let i in textArray) {
        let is_emoji = false;
        for (let j in emojiList) {
            if (textArray[i].match("@richestsoft")) {
                is_emoji = true;
            }
            else {
                is_emoji = false
            }
        }
        textArray[i] = { text: textArray[i], is_emoji }
    }
    return textArray
}
let new_Page = 1
let messageList = []
const MessageBox = () => {
    const { secondUserId } = useParams();
    const userId = getCookie("user_id");
    const { addToast } = useToasts();
    const dispatch = useDispatch();
    const history = useHistory();
    const messageEl = useRef()
    const [isOn, toggleIsOn] = useToggle();
    const [showDeleteChat, setShowDeleteChat] = useState(false);
    const [showDeleteMessage, setShowDeleteMessage] = useState({ modal: false, item: null });
    const [showBlockedModel, setShowBlockedModel] = useState(false)
    const userDataState = useSelector(state => state.SingleProfileReducer);
    const chatState = useSelector(state => state.ChatReducer);
    const IsSubscription = !!getCookie("is_subscribed") ? getCookie("is_subscribed") : ""
    const { getSingleProfile: { singleProfileDataResponse, singleProfileApiLoading } } = userDataState
    const { blockUnblockApi: { blockUnblockSuccess } } = userDataState
    const { userDetail: { userMessage, is_loading, typingUser, dummyMediaRc, page, page_scroll },
        is_online, frds_acknowledged, socket_id, completeMessageList } = chatState
    const { blockedStatus: { do_I_have_blocked_my_frd, do_frd_have_blocked_me } } = chatState
    const [showVipModel, setShowVip] = useState(false);

    console.log(chatState, "chatState...")
    console.log(socket_id, "socket ids..")
    console.log(frds_acknowledged, "frds_acknowledged")
    messageList = completeMessageList;

    new_Page = page
    const scrollToTop = () => {
        $('.chat-body').on('scroll', function () {
            if ($(this).scrollTop() == 0) {
                console.log(new_Page, "new_page")
                dispatch(changeMessageDetail({ page: new_Page + 1 }));
                if (page_scroll) {
                    // const new_page = page + 1;
                    // this.setState({page:new_page,
                    //     is_scroll:false,
                    //     isLoading: true 
                    // })
                    dispatch(changeMessageDetail({ page_scroll: false }))
                    dispatch(changeMessageDetail({ page: new_Page }))
                    dispatch(changeMessageDetail({ pagination_loading: true }))
                    let get_messages_pagination = {
                        sender_id: userId,
                        reciever_id: secondUserId,
                        page: new_Page
                    }
                    SOCKET.emit('get_messages_pagination', get_messages_pagination)
                    console.log(get_messages_pagination, "get_messages_pagination")
                }
            }
        })

    }

    const checkUserMessageEmoji = (message) => {
        console.log(message, "before....")
        message = message.split(" ");
        console.log(message, "chgd")
        for (let i in message) {
            if (message[i].match("@richestsoft")) {
                let message_emoji = "";
                for (let j in emojiListCodes) {
                    console.log(emojiListCodes[j].name, message[i], "lkcjdsgf")
                    if (emojiListCodes[j].name == message[i]) {
                        message_emoji = emojiListCodes[j].code
                    }
                }
                message.splice(i, 1, message_emoji)
            }
        }
        console.log(message, "kjsdflkdfgv")
        return message.join(" ")
    }

    useEffect(() => {
        // messageEl.current.focus()
        const data = [{ "name": "coffee@richestsoft", "code_inner": "2615" }, { "name": "couple@richestsoft", "code_inner": "1f46b" }, { "name": "woman@richestsoft", "code_inner": "1f469" }, { "name": "cupid@richestsoft", "code_inner": "1f498" }, { "name": "two_hearts@richestsoft", "code_inner": "1f495" }, { "name": "wedding@richestsoft", "code_inner": "1f492" }, { "name": "bouquet@richestsoft", "code_inner": "1f490" }, { "name": "ring@richestsoft", "code_inner": "1f48d" }, { "name": "love_letter@richestsoft", "code_inner": "1f48c" }, { "name": "kiss@richestsoft", "code_inner": "1f48b" }, { "name": "cupid@richestsoft", "code_inner": "1f498" }, { "name": "gift_heart@richestsoft", "code_inner": "1f49d" }, { "name": "heart_decoration@richestsoft", "code_inner": "1f49f" }, { "name": "speech_balloon@richestsoft", "code_inner": "1f4ac" }, { "name": "princess@richestsoft", "code_inner": "1f478" }, { "name": "heartpulse@richestsoft", "code_inner": "1f497" }, { "name": "tea@richestsoft", "code_inner": "1f375" }, { "name": "nerd_face@richestsoft", "code_inner": "1f913" }, { "name": "sunglasses@richestsoft", "code_inner": "1f60e" }, { "name": "rage@richestsoft", "code_inner": "1f621" }, { "name": "persevere@richestsoft", "code_inner": "1f623" }, { "name": "triumph@richestsoft", "code_inner": "1f624" }, { "name": "hash@richestsoft", "code_inner": "23-fe0f-20e3" }, { "name": "smirk@richestsoft", "code_inner": "1f60f" }, { "name": "neutral_face@richestsoft", "code_inner": "1f610" }, { "name": "blush@richestsoft", "code_inner": "1f60a" }, { "name": "yum@richestsoft", "code_inner": "1f60b" }, { "name": "relieved@richestsoft", "code_inner": "1f60c" }, { "name": "heart_eyes@richestsoft", "code_inner": "1f60d" }, { "name": "expressionless@richestsoft", "code_inner": "1f611" }, { "name": "unamused@richestsoft", "code_inner": "1f612" }, { "name": "sweat@richestsoft", "code_inner": "1f613" }, { "name": "pensive@richestsoft", "code_inner": "1f614" }, { "name": "cold_sweat@richestsoft", "code_inner": "1f630" }, { "name": "open_mouth@richestsoft", "code_inner": "1f62e" }, { "name": "sob@richestsoft", "code_inner": "1f62d" }, { "name": "kissing_heart@richestsoft", "code_inner": "1f618" }, { "name": "confounded@richestsoft", "code_inner": "1f616" }, { "name": "confused@richestsoft", "code_inner": "1f615" }, { "name": "pensive@richestsoft", "code_inner": "1f614" }, { "name": "sweat@richestsoft", "code_inner": "1f613" }, { "name": "unamused@richestsoft", "code_inner": "1f612" }, { "name": "expressionless@richestsoft", "code_inner": "1f611" }, { "name": "fire@richestsoft", "code_inner": "1f525" }, { "name": "hocho@richestsoft", "code_inner": "1f52a" }, { "name": "gun@richestsoft", "code_inner": "1f52b" }, { "name": "pray@richestsoft", "code_inner": "1f64f" }, { "name": "call_me_hand@richestsoft", "code_inner": "1f919" }, { "name": "handshake@richestsoft", "code_inner": "1f91d" }, { "name": "crossed_fingers@richestsoft", "code_inner": "1f91e" }, { "name": "open_hands@richestsoft", "code_inner": "1f450" }, { "name": "clap@richestsoft", "code_inner": "1f44f" }, { "name": "+1@richestsoft", "code_inner": "1f44d" }, { "name": "-1@richestsoft", "code_inner": "1f44e" }, { "name": "ok_hand@richestsoft", "code_inner": "1f44c" }, { "name": "wave@richestsoft", "code_inner": "1f44b" }, { "name": "facepunch@richestsoft", "code_inner": "1f44a" }, { "name": "point_right@richestsoft", "code_inner": "1f449" }, { "name": "point_left@richestsoft", "code_inner": "1f448" }, { "name": "point_down@richestsoft", "code_inner": "1f447" }, { "name": "point_up_2@richestsoft", "code_inner": "1f446" }, { "name": "lips@richestsoft", "code_inner": "1f444" }, { "name": "muscle@richestsoft", "code_inner": "1f4aa" }, { "name": "raised_hand_with_fingers_splayed@richestsoft", "code_inner": "1f590" }, { "name": "grinning@richestsoft", "code_inner": "1f600" }, { "name": "grin@richestsoft", "code_inner": "1f601" }, { "name": "joy@richestsoft", "code_inner": "1f602" }, { "name": "smiley@richestsoft", "code_inner": "1f603" }, { "name": "sweat_smile@richestsoft", "code_inner": "1f605" }, { "name": "laughing@richestsoft", "code_inner": "1f606" }, { "name": "innocent@richestsoft", "code_inner": "1f607" }, { "name": "smiling_imp@richestsoft", "code_inner": "1f608" }, { "name": "wink@richestsoft", "code_inner": "1f609" }, { "name": "blush@richestsoft", "code_inner": "1f60a" }, { "name": "yum@richestsoft", "code_inner": "1f60b" }, { "name": "relieved@richestsoft", "code_inner": "1f60c" }, { "name": "heart_eyes@richestsoft", "code_inner": "1f60d" }, { "name": "smirk@richestsoft", "code_inner": "1f60f" }, { "name": "neutral_face@richestsoft", "code_inner": "1f610" }, { "name": "expressionless@richestsoft", "code_inner": "1f611" }, { "name": "unamused@richestsoft", "code_inner": "1f612" }, { "name": "sweat@richestsoft", "code_inner": "1f613" }, { "name": "pensive@richestsoft", "code_inner": "1f614" }, { "name": "confused@richestsoft", "code_inner": "1f615" }, { "name": "confounded@richestsoft", "code_inner": "1f616" }, { "name": "kissing@richestsoft", "code_inner": "1f617" }, { "name": "kissing_heart@richestsoft", "code_inner": "1f618" }, { "name": "kissing_smiling_eyes@richestsoft", "code_inner": "1f619" }, { "name": "stuck_out_tongue@richestsoft", "code_inner": "1f61b" }, { "name": "stuck_out_tongue_winking_eye@richestsoft", "code_inner": "1f61c" }, { "name": "disappointed@richestsoft", "code_inner": "1f61e" }, { "name": "worried@richestsoft", "code_inner": "1f61f" }, { "name": "angry@richestsoft", "code_inner": "1f620" }, { "name": "rage@richestsoft", "code_inner": "1f621" }, { "name": "cry@richestsoft", "code_inner": "1f622" }, { "name": "triumph@richestsoft", "code_inner": "1f624" }, { "name": "disappointed_relieved@richestsoft", "code_inner": "1f625" }, { "name": "frowning@richestsoft", "code_inner": "1f626" }, { "name": "anguished@richestsoft", "code_inner": "1f627" }, { "name": "fearful@richestsoft", "code_inner": "1f628" }, { "name": "weary@richestsoft", "code_inner": "1f629" }, { "name": "sleepy@richestsoft", "code_inner": "1f62a" }, { "name": "tired_face@richestsoft", "code_inner": "1f62b" }, { "name": "grimacing@richestsoft", "code_inner": "1f62c" }, { "name": "sob@richestsoft", "code_inner": "1f62d" }, { "name": "open_mouth@richestsoft", "code_inner": "1f62e" }, { "name": "hushed@richestsoft", "code_inner": "1f62f" }, { "name": "cold_sweat@richestsoft", "code_inner": "1f630" }, { "name": "scream@richestsoft", "code_inner": "1f631" }, { "name": "astonished@richestsoft", "code_inner": "1f632" }, { "name": "flushed@richestsoft", "code_inner": "1f633" }, { "name": "sleeping@richestsoft", "code_inner": "1f634" }, { "name": "dizzy_face@richestsoft", "code_inner": "1f635" }, { "name": "no_mouth@richestsoft", "code_inner": "1f636" }, { "name": "mask@richestsoft", "code_inner": "1f637" }, { "name": "smile_cat@richestsoft", "code_inner": "1f638" }, { "name": "slightly_smiling_face@richestsoft", "code_inner": "1f642" }, { "name": "upside_down_face@richestsoft", "code_inner": "1f643" }, { "name": "raised_hands@richestsoft", "code_inner": "1f64c" }, { "name": "zipper_mouth_face@richestsoft", "code_inner": "1f910" }, { "name": "money_mouth_face@richestsoft", "code_inner": "1f911" }, { "name": "face_with_thermometer@richestsoft", "code_inner": "1f912" }, { "name": "nerd_face@richestsoft", "code_inner": "1f913" }, { "name": "face_with_head_bandage@richestsoft", "code_inner": "1f915" }, { "name": "raised_back_of_hand@richestsoft", "code_inner": "1f91a" }, { "name": "drooling_face@richestsoft", "code_inner": "1f924" }, { "name": "lying_face@richestsoft", "code_inner": "1f925" }, { "name": "sneezing_face@richestsoft", "code_inner": "1f927" }, { "name": "exploding_head@richestsoft", "code_inner": "1f92f" }, { "name": "selfie@richestsoft", "code_inner": "1f933" }, { "name": "clinking_glasses@richestsoft", "code_inner": "1f942" }, { "name": "gift@richestsoft", "code_inner": "1f381" }, { "name": "birthday@richestsoft", "code_inner": "1f382" }, { "name": "champagne@richestsoft", "code_inner": "1f37e" }, { "name": "beer@richestsoft", "code_inner": "1f37a" }, { "name": "christmas_tree@richestsoft", "code_inner": "1f384" }, { "name": "santa@richestsoft", "code_inner": "1f385" }, { "name": "balloon@richestsoft", "code_inner": "1f388" }, { "name": "tada@richestsoft", "code_inner": "1f389" }, { "name": "dart@richestsoft", "code_inner": "1f3af" }, { "name": "crescent_moon@richestsoft", "code_inner": "1f319" }, { "name": "first_quarter_moon_with_face@richestsoft", "code_inner": "1f31b" }, { "name": "full_moon_with_face@richestsoft", "code_inner": "1f31d" }, { "name": "sun_with_face@richestsoft", "code_inner": "1f31e" }, { "name": "tornado@richestsoft", "code_inner": "1f32a" }, { "name": "hot_pepper@richestsoft", "code_inner": "1f336" }, { "name": "tulip@richestsoft", "code_inner": "1f337" }, { "name": "cherry_blossom@richestsoft", "code_inner": "1f338" }, { "name": "rose@richestsoft", "code_inner": "1f339" }, { "name": "hibiscus@richestsoft", "code_inner": "1f33a" }, { "name": "sunflower@richestsoft", "code_inner": "1f33b" }, { "name": "blossom@richestsoft", "code_inner": "1f33c" }, { "name": "corn@richestsoft", "code_inner": "1f33d" }, { "name": "hamburger@richestsoft", "code_inner": "1f354" }, { "name": "pizza@richestsoft", "code_inner": "1f355" }, { "name": "meat_on_bone@richestsoft", "code_inner": "1f356" }, { "name": "reminder_ribbon@richestsoft", "code_inner": "1f397" }, { "name": "trophy@richestsoft", "code_inner": "1f3c6" }, { "name": "racing_car@richestsoft", "code_inner": "1f3ce" }, { "name": "rat@richestsoft", "code_inner": "1f400" }, { "name": "mouse2@richestsoft", "code_inner": "1f401" }, { "name": "sheep@richestsoft", "code_inner": "1f411" }, { "name": "fish@richestsoft", "code_inner": "1f41f" }, { "name": "turtle@richestsoft", "code_inner": "1f422" }, { "name": "hatched_chick@richestsoft", "code_inner": "1f425" }, { "name": "eye@richestsoft", "code_inner": "1f441" },
        { "name": "tongue@richestsoft", "code_inner": "1f445" },
        { "name": "handbag@richestsoft", "code_inner": "1f45c" },
        { "name": "mans_shoe@richestsoft", "code_inner": "1f45e" }, { "name": "sandal@richestsoft", "code_inner": "1f461" }, { "name": "high_heel@richestsoft", "code_inner": "1f460" }, { "name": "footprints@richestsoft", "code_inner": "1f463" }, { "name": "bomb@richestsoft", "code_inner": "1f4a3" }, { "name": "pushpin@richestsoft", "code_inner": "1f4cc" }, { "name": "wrench@richestsoft", "code_inner": "1f527" }, { "name": "hammer@richestsoft", "code_inner": "1f528" }, { "name": "wilted_flower@richestsoft", "code_inner": "1f940" }]
        for (let j in emojiListCodes) {
            for (let k in data) {
                if (emojiListCodes[j].name === data[k].name) {
                    console.log(data[k].code_inner.length > 5 ? data[k].name : "", "clkjduvbhf")
                    data[k].code = emojiListCodes[j].code
                }
            }
        }
        emojiListCodes = data;
        console.log(JSON.stringify(data), "cgndhfgbdhf")
        for (let i in emojiListRichest) {
            emojiListRichest[i] = emojiListRichest[i] + "@richestsoft";

        }
        scrollToTop()
        const bodyParameter = {
            session_id: localStorage.getItem("session_id"),
            user_id: secondUserId
        }
        dispatch(getSingleProfileDataApi(bodyParameter))
        return () => {
            // dispatch(clearSingleProfileResponse())
            SOCKET.emit('is_user_active', { "user_id": userId, is_online: 0 });
            dispatch(completeMessageListData({ completeMessageList: [] }))
            dispatch(clearMessageDetail());
            //----------new addeed ----------
            SOCKET.emit('message_read_unread_status', { "session_id": localStorage.getItem("session_id"), "receiver_id": secondUserId, is_read: 0, 'sender_id': userId });
            // show my frds ----> my-offline
            SOCKET.emit('send_my_message_status', { 'sender_id': userId });
            // const bodyParameter = {
            //     session_id: localStorage.getItem("session_id"),
            //     user_id: getCookie("user_id")
            // }
            // dispatch(getSingleProfileDataApi(bodyParameter))
        }
    }, [])

    // Authenicating user here
    const DetermineUser = () => {
        console.log({
            "session_id": localStorage.getItem("session_id"),
            "reciever_id": secondUserId,
            socket_id: socket_id

        }, "sdgdfh")
        SOCKET.emit('authenticate', {
            "session_id": localStorage.getItem("session_id"),
            "reciever_id": secondUserId,
            socket_id: socket_id

        });

        SOCKET.emit('is_user_active', {
            "user_id": userId,
            is_online: 1
        });

        let do_I_have_blocked_my_frd = {
            sender_id: userId,
            reciever_id: secondUserId,
        }
        SOCKET.emit('do_I_have_blocked_my_frd', do_I_have_blocked_my_frd)
        let do_frd_have_blocked_me = {
            sender_id: secondUserId,
            reciever_id: userId,
            toMe: true
        }
        SOCKET.emit('do_frd_have_blocked_me', do_frd_have_blocked_me)
    }
    const getCurrentDateTime = () => {
        return moment().format('L') + " " + moment().format('LT')
    }
    useEffect(() => {
        if (!!secondUserId) {
            dispatch(changeMessageDetail({ is_loading: true }))
            DetermineUser()
            var data = {
                sender_id: userId,
                reciever_id: secondUserId
            }
            SOCKET.emit('check_frds_are_acknowledged', data)
            console.log(data, "data test...................")
        }
    }, [secondUserId])


    function emojiUnicode(emoji) {
        if (!!emoji) {
            var comp;
            if (emoji.length === 1) {
                comp = null;
            }
            comp = (
                (emoji.charCodeAt(0) - 0xD800) * 0x400
                + (emoji.charCodeAt(1) - 0xDC00) + 0x10000
            );
            if (comp < 0) {
                comp = null;
            }
            console.log(comp !== null ? comp.toString("16") : "", "cksjtbsvbgdf")
            return comp !== null ? comp.toString("16") : "";
        }
        else {
            return ""
        }
    };

    // On text typing value
    const changeInput = (e) => {
        console.log(e.target.value, "gbdhsgsjcdgcf")
        const value = e.target.value.split(" ");
        console.log(userMessage, value, "fcndgsfjgf")
        dispatch(changeMessageDetail({ userMessage: e.target.value }))
        SOCKET.emit("typing", {
            user_id: userId,
            typing_user: singleProfileDataResponse.first_name,
            reciever_id: secondUserId,
            frds_acknowledged: !!frds_acknowledged ? 1 : 0
        })
        console.log({
            user_id: userId,
            typing_user: singleProfileDataResponse.first_name,
            reciever_id: secondUserId,
            frds_acknowledged: !!frds_acknowledged ? 1 : 0
        }, "nknrvtbtb")
    }

    const CheckBlockOrNot = (e) => {
        e.preventDefault()
        if (do_I_have_blocked_my_frd || do_frd_have_blocked_me) {

            if (do_I_have_blocked_my_frd) {
                setShowBlockedModel(true)
            } else {
                addToast("Blocked", {
                    appearance: 'error',
                    autoDismiss: true,
                });
                // showError(strings.youBlockedthisPerson)
            }
        } else {
            CheckTextInputIsEmptyOrNot()
        }

    }
    const CheckTextInputIsEmptyOrNot = () => {
        let updatedUserMessage = userMessage.split(" ");
        for (let i in updatedUserMessage) {
            let uniCode = emojiUnicode(updatedUserMessage[i]);
            if (!!uniCode) {
                for (let j in emojiListCodes) {
                    console.log(typeof uniCode, typeof emojiListCodes[j].code, "lc jsg")
                    if (emojiListCodes[j].code_inner == uniCode) {
                        updatedUserMessage.splice(i, 1, emojiListCodes[j].name)
                    }
                }
            }
        }

        // updatedUserMessage.join(" ");

        // console.log(emojiListCodes, "emojiListCodes...")
        // for (let i in updatedUserMessage) {
        //     if (updatedUserMessage[i].match("u{")) {
        //         alert(updatedUserMessage[i])
        //         for (let j in emojiListCodes) {
        //             if (updatedUserMessage[i] === emojiListCodes[j].code) {
        //                 console.log(emojiListCodes[j].name, "emojiListCodes[j].name")
        //                 updatedUserMessage.splice(i, 1, emojiListCodes[j].name)
        //             }
        //         }
        //     }
        // }
        updatedUserMessage = updatedUserMessage.join(" ");
        const mess = replceMultiStringWithSIngle(updatedUserMessage)
        console.log(updatedUserMessage, "updatedUserMessage....")
        if (mess != '') {

            if (!frds_acknowledged || (!!frds_acknowledged && IsSubscription == 1)) {
                var message = {
                    session_id: localStorage.getItem("session_id"),
                    reciever_id: Number(secondUserId),
                    message: updatedUserMessage,
                    // "sender_name": this.props.userData.first_name + " " + this.props.userData.last_name,
                    sender_name: singleProfileDataResponse.first_name,
                    device_token: null,
                    created_at: getCurrentDateTime(),
                    frds_acknowledged: !!frds_acknowledged ? 1 : 0,
                    message_id: uuidv4(),
                    messageStatus: frdMesageStatus,
                    sender_id: Number(userId),
                    ignore_user_from_id: 1,
                    ignore_user_to_id: 1

                }
                SOCKET.emit("send_message", message);
                console.log(message, "message detailsdfdbf")
                dispatch(changeMessageDetail({ userMessage: "" })); //Empty user input heresend
                dispatch(changeMessageDetail({ is_scroll: true }))
            }
            else {
                if (!!frds_acknowledged && IsSubscription == 0) {
                    setShowVip(true)
                    window.setTimeout(() => {
                        document.getElementById("vipModalAdd").click();
                    }, 0)
                }
            }
            // setIs_show_Emoji(false);
        } else {
            addToast("Please enter message", {
                appearance: 'error',
                autoDismiss: true,
            });
        }
    }
    var blobToBase64 = function (blob, callback) {
        var reader = new FileReader();
        reader.onload = function () {
            var dataUrl = reader.result;
            var base64 = dataUrl.split(',')[1];
            return callback(base64);
        };
        reader.readAsDataURL(blob);
    };

    const sendVoiceNote = () => {
        if (!frds_acknowledged || (!!frds_acknowledged && IsSubscription == 1)) {
            if (!dummyMediaRc) {
                var constraints = { audio: true };
                let recordAudio = false;
                if (!!navigator.mediaDevices) {
                    navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
                        recordAudio = true;
                        var mediaRecorder = new MediaRecorder(mediaStream);

                        mediaRecorder.onstart = function (e) {
                            dispatch(changeMessageDetail({ dummyMediaRc: mediaRecorder }));
                            // setDummyMediaRc(mediaRecorder);
                            this.chunks = [];
                        };
                        mediaRecorder.ondataavailable = function (e) {
                            this.chunks.push(e.data);
                        };
                        mediaRecorder.onstop = function (e) {
                            var blob = new Blob(this.chunks,);
                            console.log(blob, "blob.....")
                            blobToBase64(blob, (output) => {
                                SOCKET.emit('radio', {
                                    blob: 'data:audio/mp3;base64,' + output,
                                    sessionId: localStorage.getItem("session_id"),
                                    reciever_id: Number(secondUserId),
                                    sender_name: singleProfileDataResponse.first_name,
                                    device_token: null,
                                    created_at: getCurrentDateTime(),
                                    frds_acknowledged: !!frds_acknowledged ? 1 : 0,
                                    message: null,
                                    message_id: uuidv4(),
                                    messageStatus: frdMesageStatus,
                                    sender_id: Number(userId),
                                    ignore_user_from_id: 1,
                                    ignore_user_to_id: 1
                                });
                            })
                        };

                        // Start recording
                        mediaRecorder.start();
                    }).catch(function (err) {
                        // createNotification('error-message')
                    })
                }
                else {
                    alert("You need a secure https connection in order to record voice")
                }
            }

            else {
                console.log(dummyMediaRc, "media rec...")
                dummyMediaRc.stop();
                dispatch(changeMessageDetail({ dummyMediaRc: null }));
            }
        }
        else {
            if (!!frds_acknowledged && IsSubscription == 0) {
                setShowVip(true)
                window.setTimeout(() => {
                    document.getElementById("vipModalAdd").click();
                }, 0)
            }
        }
    }
        const hideVipModel = () => {
            setShowVip(false)
        }
        const setEmoji = (emoji) => {
            console.log(emoji, "emojiemojiemojiemojiemojiemojiemoji")
            let msg = (userMessage + " " + emoji + "@richestsoft").replace(/\s\s+/g, ' ');
            dispatch(changeMessageDetail({ userMessage: msg }));
            // document.getElementsByClassName("send-message-text").type=  
            //   UpdateTextInput(userMessage).map((data, index) => (
            //     data.is_emoji &&
            //     <Emoji name={data.text.replace("@richestsoft", "")} />
            // ))
            // toggleIsOn(false)
        }
        useEffect(() => {
            if (!!page_scroll) {
                scrollToBottom()
            }
        }, [completeMessageList])

        // console.log(messageList ,"all_messages delete...") 
        useEffect(() => {

            SOCKET.off('check_frds_are_acknowledged').on('check_frds_are_acknowledged', (data) => {
                console.log(data, "data...")
                if (data.sender_id == userId) {
                    dispatch(changeFriendAcknowdge({ frds_acknowledged: data.frds_acknowledged }))
                }
            })

            SOCKET.off('getMessage').on('getMessage', (messages) => { // only one time
                console.log(messages, "messa.....")
                dispatch(changeMessageDetail({ is_loading: false }))
                dispatch(completeMessageListData({ completeMessageList: messages.message_list }))

            });

            // Checking the typing user
            SOCKET.off('typing').on('typing', (typing) => {
                console.log(typing, "typing..")
                if (!!typing) {
                    if ((typing.user_id == userId && typing.reciever_id == secondUserId)
                        ||
                        (typing.user_id == secondUserId && typing.reciever_id == userId)
                    ) {
                        if (typing.user_id !== userId) {
                            dispatch(changeMessageDetail({ typingUser: typing.typing_user }))
                            window.setTimeout(() => {
                                dispatch(changeMessageDetail({ typingUser: "" }))
                            }, 1500)
                        }
                    }
                }
            })

            SOCKET.off('message_data').on('message_data', (messages) => {
                console.log(messages, "get messages...")
                if (!!messages) {
                    if ((!messages.obj.is_acknowledge && (userId == messages.obj.user_to_id)) || messages.obj.is_acknowledge) {

                        let messagesList = messageList;

                        // this.setState({ completeMessageList: [...this.state.completeMessageList,messages.obj ]})
                        // this.setState({ userMessage: '' })
                        if ((messages.obj.user_from_id == userId && messages.obj.user_to_id == secondUserId)
                            ||
                            (messages.obj.user_from_id == secondUserId && messages.obj.user_to_id == userId)
                        ) {
                            messagesList.push(messages.obj);
                            console.log(messagesList, "messageList...")

                            dispatch(completeMessageListData({ completeMessageList: messagesList }))
                            dispatch(changeFriendAcknowdge({ frds_acknowledged: messages.obj.frds_acknowledged }))
                            scrollToBottom()
                            // this.setState({frds_acknowledged: messages.obj.frds_acknowledged,is_send_btn_disable:false})
                            // if(this.state.completeMessageList.length==1){
                            //      this.AddUserTochatList()
                            // }
                            SOCKET.emit('ping_frd_my_unread_message', { "user_id": secondUserId, toMe: false });
                            SOCKET.emit('get_unread_frd_messages', {
                                user_id: secondUserId,
                                check_user: secondUserId,
                                toMe: false
                            });

                        }

                    }
                    else {
                        if (userId == messages.obj.user_from_id) {
                            alert("Your friend has not acknowledged your Message ,Please wait for response")
                        }

                    }
                }
            });
            SOCKET.off('voice').on('voice', function (arrayBuffer) {
                let messagesList = messageList;
                console.log(arrayBuffer, "CompleteMessageList")
                if (!!arrayBuffer) {
                    if ((!arrayBuffer.obj.is_acknowledge && (userId == arrayBuffer.obj.user_to_id)) || arrayBuffer.obj.is_acknowledge) {

                        if ((arrayBuffer.obj.user_from_id == userId && arrayBuffer.obj.user_to_id == secondUserId)
                            ||
                            (arrayBuffer.obj.user_from_id == secondUserId && arrayBuffer.obj.user_to_id == userId)) {
                            messagesList.push(arrayBuffer.obj);
                            console.log(messagesList, "messageList... pic");
                            dispatch(completeMessageListData({ completeMessageList: messagesList }))
                            dispatch(changeMessageDetail({ userMessage: "" }));; //Empty user input here
                            scrollToBottom()
                            dispatch(changeFriendAcknowdge({ frds_acknowledged: arrayBuffer.obj.frds_acknowledged }))

                            SOCKET.emit('ping_frd_my_unread_message', { "user_id": secondUserId, toMe: false });
                            SOCKET.emit('get_unread_frd_messages', {
                                user_id: secondUserId,
                                check_user: secondUserId,
                                toMe: false
                            });

                        }
                    }
                    else {
                        if (userId == arrayBuffer.obj.user_from_id) {
                            alert("Your friend has not acknowledged your Message ,Please wait for response")
                        }
                    }

                }

            });

            SOCKET.off('delete_message').on('delete_message', (data) => {
                const user_id = data.user_id,
                    message_id = data.message_id,
                    receiver_id = data.receiver_id;
                // if (this.props.userData.id == receiver_id && secondUserDataid == user_id) {

                if ((user_id == userId && receiver_id == secondUserId)
                    ||
                    (user_id == secondUserId && receiver_id == userId)) {
                    console.log(messageList, "jksdhfbgdjs")
                    let all_messages = messageList;

                    for (let i in all_messages) {
                        console.log(all_messages, "all_messages...")
                        if (all_messages[i].message_id == message_id) {
                            // all_messages[i].delete = 1;
                            // all_messages[i].delete_message_user = user_id;
                            all_messages.splice(i, 1)
                        }
                    }
                    const new_page = page;
                    dispatch(completeMessageListData({ completeMessageList: all_messages }))
                    dispatch(changeMessageDetail({ page: new_page }))

                    // fire event to paginate....
                    // let get_messages_pagination = {
                    //     sender_id: this.props.userData.id, 
                    //     reciever_id:secondUserDataid, 
                    //      page: new_page
                    // }
                    // this.socket.emit('get_messages_pagination', get_messages_pagination)

                    let ping_me_and_frd_to_get_message_on_delete = {
                        sender_id: userId,
                        reciever_id: secondUserId,
                    }
                    SOCKET.emit('ping_me_and_frd_to_get_message_on_delete', ping_me_and_frd_to_get_message_on_delete)
                }
            });
            SOCKET.off('ping_me_and_frd_to_get_message_on_delete').on('ping_me_and_frd_to_get_message_on_delete', function (data) {
                if ((data.sender_id == userId && data.reciever_id == secondUserId)
                    ||
                    (data.sender_id == secondUserId && data.reciever_id == secondUserId)
                ) {
                    if (page_scroll) {
                        const new_page = page;
                        let get_messages_pagination = {
                            sender_id: userId,
                            reciever_id: secondUserId,
                            page: new_page
                        }
                        SOCKET.emit('get_messages_pagination', get_messages_pagination)
                    }
                }
            });
            SOCKET.off('get_messages_pagination').on('get_messages_pagination', function (data) {

                if (data.user_id == userId) {
                    const completeMessageList = messageList;
                    const newPageList = data.message_list;
                    let newList = [...newPageList, ...completeMessageList];
                    newList = removeDublicateMsg(newList);
                    dispatch(completeMessageListData({ completeMessageList: newList }))
                    dispatch(changeMessageDetail({ pagination_loading: false }))
                    // _self.setState({ completeMessageList: newList,
                    //     isLoading:false})
                }
            });
            SOCKET.off('is_user_active').on('is_user_active', function (data) {
                console.log(data, "is_user_active")
                if (data.user_id == secondUserId) {
                    // getAllByLabelText(12)
                    dispatch(checkIsOnline({ is_online: !!data.is_online ? true : false }))
                    // _self.setState({ is_online: !!data.is_online ? true: false })
                }
            });
            SOCKET.emit('is_frd_active_in_one_to_one_chat', { frd_id: secondUserId })
            // get my frd  ------> his online (read/unread)/offline
            SOCKET.emit('check_receiver_message_status', { "reciever_id": secondUserId, "sessionId": localStorage.getItem("session_id"), sender_id: userId });


            // show my frds ----> my-online + read/unread
            SOCKET.emit('send_my_message_status', { 'sender_id': userId, 'reciever_id': secondUserId });

            SOCKET.off('check_receiver_message_status').on('check_receiver_message_status', function (list) {
                if (list.friend_id == secondUserId) {

                    if (list.offline) {
                        list.online.read = false;
                        list.online.unread = false;
                        list.online.reciever_id = "";
                    }
                    else {
                        list.online.read = list.online.reciever_id == userId ? true : false;
                        list.online.unread = list.online.reciever_id == userId ? false : true;
                    }
                    frdMesageStatus = list;
                    //  console.log(frdMesageStatus, "frdMesageStatus.......")
                    let apiData = messageList;
                    if (list.online.read) {
                        for (let i in apiData) {
                            if (!apiData[i].message_is_read) {
                                apiData[i].message_is_read = 1
                                apiData[i].message_is_sent = 0
                                apiData[i].message_is_not_seen = 0
                            }
                        }
                    }
                    if (list.online.unread) {
                        for (let i in apiData) {
                            if (apiData[i].message_is_sent) {
                                apiData[i].message_is_read = 0
                                apiData[i].message_is_sent = 0
                                apiData[i].message_is_not_seen = 1
                            }
                        }
                    }
                    // if (list.offline) {
                    //     this.setState({is_online:false})
                    // }     
                    // else {
                    //     this.setState({is_online:true})
                    // }

                    console.log(apiData, "new apidata....")
                    dispatch(completeMessageListData({ completeMessageList: apiData }))
                    // this.setState({ completeMessageList: apiData })
                    // this.setState({ counter: Math.random() })
                    // this.forceUpdate()
                    //}
                }
            });

            SOCKET.off('do_I_have_blocked_my_frd').on('do_I_have_blocked_my_frd', function (data) {
                if (data.sender_id == userId) {
                    dispatch(changeBlockedStatus({ do_I_have_blocked_my_frd: data.is_blocked }))
                }
            });

            SOCKET.off('do_frd_have_blocked_me').on('do_frd_have_blocked_me', function (data) {
                if (data.reciever_id == userId) {
                    dispatch(changeBlockedStatus({ do_frd_have_blocked_me: data.is_blocked }))
                }
            });
        }, [])
        const handleDeleteChat = () => {
            SOCKET.emit("delete_chat", { "reciever_id": secondUserId, sender_id: userId })
            dispatch(completeMessageListData({ completeMessageList: [] }))
            dispatch(changeMessageDetail({ is_scroll: false }))
            dispatch(changeMessageDetail({ page_scroll: false }))
            setShowDeleteChat(false)

        }
        const handleDeleteMessage = () => {
            const deleteMessage = showDeleteMessage;
            if (!!deleteMessage) {
                console.log(deleteMessage, "deleteMessage...")
                if (!deleteMessage.data.delete) {
                    var delMsg = {
                        user_id: userId,
                        message_id: deleteMessage.data.message_id,
                        receiver_id: secondUserId
                    }
                    SOCKET.emit('delete_message', delMsg);
                    setShowDeleteMessage({ model: false, item: null })
                }
            }
        }
        const handleUnblock = () => {
            var bodyParameter = {
                blocked_user_id: secondUserId,
                session_id: localStorage.getItem("session_id"),
                status: 0
            };
            dispatch(blockUnblockDataApi(bodyParameter))
        }
        useEffect(() => {
            if (!!blockUnblockSuccess) {
                let do_frd_have_blocked_me = {
                    sender_id: secondUserId,
                    reciever_id: userId,
                    toMe: false
                }
                SOCKET.emit("do_frd_have_blocked_me", do_frd_have_blocked_me)
                dispatch(changeBlockedStatus({ do_I_have_blocked_my_frd: false }))
                dispatch(clearBlockUnblockResponse());
                setShowBlockedModel(false)
            }
        }, [blockUnblockSuccess])

        return (
            <>


                <div className="col-lg-3 option-bar p-3 vh-100 position-fixed">
                    <div className="logo-tab mb-5 d-flex justify-content-between align-items-start">
                        <Logo />

                    </div>
                    <HomeFilter />
                </div>
                <div className="col-md-9 rt-col">

                    <div className="tab-top d-flex flex-wrap-wrap align-items-center ml-auto">
                        {
                            IsSubscription == 0 && !singleProfileApiLoading &&
                            <div className={IsSubscription == 0 ? "ml-auto mr-5" : "feature-menu "}>
                                <UpgradeButton />
                            </div>
                        }
                        <Toolbars />
                    </div>
                    <div className="row panel messages-panel">
                        {/* Chat box here */}
                        {userId !== "" ?
                            <div className="col-md-12 tab-content chat-block" role="tablist">
                                <a href="javascript:void(0)" className="login-back-4 btn-back mb-4" onClick={() => history.goBack()}><i className="fas fa-chevron-left" /></a>
                                <h2 className="text-center">Messages</h2>
                                {/* {
                                    !loading && CompleteMessageList.length === 0 &&
                                    <div className="nothing-to-see text-center active">
                                        <figure>
                                            <img src="/assets/webapp/images/message-circle.png" alt="Message" />
                                            <figcaption>Nothing To See</figcaption>
                                        </figure>
                                    </div>
                                } */}
                                <div className="tab-pane tab-pane active" id="chat-field">
                                    <div className="message-top d-flex flex-wrap align-items-center justify-content-between">
                                        <div className="chat-header-info d-flex align-items-center">
                                            {!!singleProfileDataResponse ?
                                                <div className="status-check">
                                                    <img className="img-circle medium-image" onClick={() => history.push(`/single-profile/${secondUserId}`)} style={{ cursor: "pointer" }}
                                                        onError={(e) => addDefaultSrc(e)} src={!!singleProfileDataResponse.profile_image ? singleProfileDataResponse.profile_image : returnDefaultImage()} alt={singleProfileDataResponse.first_name}
                                                    />
                                                </div>
                                                : ""}

                                            <div className="chat-user-info ml-2">
                                                {!!singleProfileDataResponse ? <h5 className="mb-0 name">{singleProfileDataResponse.first_name}</h5> : <h5>  </h5>}
                                                <p >{!!is_online ? "online" : "offline"}</p>
                                            </div>

                                        </div>
                                        {!!frds_acknowledged ? <i style={{ cursor: "pointer" }} class="fa fa-trash" aria-hidden="true" onClick={() => setShowDeleteChat(true)}></i> : ""}</div>
                                    {/*<div className="chat-date text-center my-2">Today</div>*/}
                                    <div className="message-chat">
                                        <div className="chat-body" id={"chat-body"}>
                                            {
                                                completeMessageList.map((data, i) => (
                                                    <div>

                                                        {
                                                            (data.user_from_id == secondUserId) ?

                                                                <div className="message info">

                                                                    <div className="message-body">
                                                                        {
                                                                            !!data.media &&
                                                                            <div className="media-socket">
                                                                                <img onError={(e) => addDefaultSrc(e)} src={!!data.media ? data.media : returnDefaultImage()} />
                                                                            </div>
                                                                        }

                                                                        {
                                                                            !!data.message &&
                                                                            <div className="message-text">
                                                                                <p>
                                                                                    {
                                                                                        UpdateText(data.message).map((data, index) => (
                                                                                            <>
                                                                                                {
                                                                                                    data.is_emoji ?
                                                                                                        <><Emoji name={data.text.replace("@richestsoft", "")} />
                                                                                                            {/* {emojify(":" + data.text.replace("@richestsoft", "") + ":")} */}
                                                                                                        </>
                                                                                                        :
                                                                                                        <> {data.text}</>
                                                                                                }
                                                                                            </>
                                                                                        ))
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                        }
                                                                        {
                                                                            !!data.audio &&
                                                                            <div className="audio-socket">
                                                                                <audio controls src={data.audio} className="audio-left" />
                                                                            </div>
                                                                        }
                                                                        <div className="create_at_Date">
                                                                            {data.created_at}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                :
                                                                <div className="message my-message ">
                                                                    <div className="message-body" >
                                                                        {
                                                                            !!data.media &&
                                                                            <div className="media-socket" >
                                                                                <i style={{ cursor: "pointer" }} class="fa fa-trash" aria-hidden="true" onClick={() => alert(data.message_id)}>sd</i>
                                                                                <img onError={(e) => addDefaultSrc(e)} src={!!data.media ? data.media : returnDefaultImage()} />
                                                                            </div>
                                                                        }

                                                                        {
                                                                            !!data.message &&
                                                                            <div>
                                                                                <div className="message-text">
                                                                                    <p>
                                                                                        {UpdateText(data.message).map((data, index) => (
                                                                                            data.is_emoji ?
                                                                                                <><Emoji name={data.text.replace("@richestsoft", "")} />
                                                                                                    {/* {emojify(":" + data.text.replace("@richestsoft", "") + ":")}  */}
                                                                                                </>
                                                                                                :
                                                                                                <> {data.text}</>
                                                                                        ))}
                                                                                        {
                                                                                            !!frds_acknowledged &&
                                                                                            <i style={{ cursor: "pointer" }} class="fa fa-trash" aria-hidden="true" onClick={() => setShowDeleteMessage({ modal: true, data })}></i>
                                                                                        }
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        }
                                                                        {
                                                                            !!data.audio &&
                                                                            <div>
                                                                                <div className="audio-socket">

                                                                                    <audio controls src={data.audio} className="audio-right" />
                                                                                    <i style={{ cursor: "pointer" }} class="fa fa-trash" aria-hidden="true" onClick={() => setShowDeleteMessage({ modal: true, data })}></i>
                                                                                </div>

                                                                            </div>
                                                                        }
                                                                        {/* <div className="create_at_Date">
                                                                           <p> {data.created_at}</p>
                                                                        </div> */}
                                                                    </div>
                                                                </div>
                                                        }
                                                    </div>
                                                ))
                                            }
                                            {/* <NotificationContainer /> */}
                                        </div>
                                        <form onSubmit={CheckBlockOrNot} >
                                            {(do_I_have_blocked_my_frd || do_frd_have_blocked_me) &&
                                                <div style={{ textAlign: 'center' }}>BLOCKED</div>}
                                            <div className="chat-footer">
                                                <div className="sweet-loading">
                                                    <BarLoader color={"#fcd46f"} loading={is_loading} css={override} size={1000} />
                                                </div>

                                                <label className="upload-file">
                                                    <div className="upload_emoji" >
                                                        <a href="javascript:void(0)" onClick={() => toggleIsOn(true)} >
                                                            <i class="fas fa-smile"></i>
                                                        </a>
                                                    </div>
                                                </label>
                                                {/* {
                                                    UpdateTextInput(userMessage).map((data, index) => (
                                                        data.is_emoji ?
                                                            <Text style={{color: colors.BLACK, fontSize: 16}}> <Emoji name={data.text.replace("@richestsoft", "")} /></Text>
                                                            :
                                                            <Text style={{color: colors.BLACK,}}> {data.text}</Text>
                                                    ))
                                                } */}
                                                {/* <InputChildren value={userMessage} 
                                                className="send-message-text" placeholder="Say Something..." 
                                                onChange={e => changeInput(e)} >
                                                    {UpdateTextInput(userMessage).map((data, index) => (
                                                        data.is_emoji &&
                                                        <Emoji name={data.text.replace("@richestsoft", "")} />
                                                    ))}
                                                </InputChildren> */}

                                                <input data-emoji-input="unicode" className="send-message-text" ref={messageEl}
                                                    name="Message" id="Message" type="text"
                                                    placeholder="Say Something..." value={!!userMessage ? checkUserMessageEmoji(userMessage) : ""}
                                                    onChange={e => changeInput(e)} />
                                                {/* <label className="gift-message bg-grd-clr">
                                                    <a href="javascript:void(0)">
                                                        <i className="fas fa-gift" />
                                                    </a>
                                                </label> */}
                                                <label className="record-message">
                                                    <a href="javascript:void(0)" onClick={sendVoiceNote}>

                                                        {
                                                            dummyMediaRc &&
                                                            <i className="fas fa-microphone-slash" />
                                                        }
                                                        {
                                                            !dummyMediaRc &&
                                                            <i className="fas fa-microphone" />
                                                        }
                                                    </a>
                                                </label>
                                                <button type="sumbit" className="send-message-button bg-grd-clr"><i className="fas fa-paper-plane" /></button>

                                            </div>
                                            {
                                                !!typingUser &&
                                                <div>{typingUser} is typing...</div>
                                            }
                                        </form>
                                    </div>
                                </div>

                            </div>
                            : <div className="nothing-to-see text-center active">
                                <figure>
                                    <img src="/assets/webapp/images/message-circle.png" alt="Message" />
                                    <figcaption>Nothing To See</figcaption>
                                </figure>
                            </div>}

                        {/* End chat box here */}
                        <div className={isOn ? 'all-gifts-wrapper active' : 'all-gifts-wrapper '} >
                            <div className="all-gift-inner">
                                <a href="javascript:void(0)" className="close-gift-btn modal-close" onClick={() => toggleIsOn(false)}><img src="/webapp/images/btn_close.png" /></a>
                                <div className="all-gift-header d-flex flex-wrap align-items-center mb-3">
                                    <h5 className="mb-0 mr-4">Send emoji</h5>
                                </div>
                                <div className="all-gift-body">
                                    {emojiList.map((item) => {
                                        return <span style={{ cursor: "pointer" }}
                                            onClick={() => setEmoji(item)}
                                            className="emoji"
                                        >
                                            <Emoji name={item} size="25" />
                                            {/* {emojify(":" + item + ":")} */}

                                        </span>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal className="deleteChat-modal" show={showDeleteChat} onHide={() => setShowDeleteChat(false)} backdrop="static" keyboard={false} aria-labelledby="example-modal-sizes-title-sm">
                    <div className="edit-profile-modal__inner">

                        <h4 className="theme-txt text-center mb-4 ">Are you sure ?</h4>
                        <h5 className="theme-txt text-center mb-4 ">clear all chat</h5>
                        <div className="modal-btns d-flex justify-content-center">
                            <a href="javascript:void(0)" className="btn bg-grd-clr" onClick={() => setShowDeleteChat(false)}>cancel</a>
                            <a href="javascript:void(0)" className="btn bg-grd-clr" onClick={handleDeleteChat}>ok</a>
                        </div>
                    </div>
                </Modal>
                <Modal className="delete-modal" show={showDeleteMessage.modal} onHide={() => setShowDeleteMessage({ modal: false, item: null })} backdrop="static" keyboard={false} aria-labelledby="example-modal-sizes-title-sm">
                    <div className="edit-profile-modal__inner">

                        <h4 className="theme-txt text-center mb-4 ">Are you sure to Delete this message ?</h4>
                        <div className="modal-btns d-flex justify-content-center">
                            <a href="javascript:void(0)" className="btn bg-grd-clr" onClick={() => setShowDeleteMessage(false)}>Cancel</a>
                            <a href="javascript:void(0)" className="btn bg-grd-clr" onClick={handleDeleteMessage}>Ok</a>
                        </div>
                    </div>
                </Modal>
                <Modal className="delete-modal" show={showBlockedModel} onHide={() => setShowBlockedModel(false)} backdrop="static" keyboard={false} aria-labelledby="example-modal-sizes-title-sm">
                    <div className="edit-profile-modal__inner">

                        <h5 className="theme-txt text-center mb-4 ">Unblock {singleProfileDataResponse.first_name} to send message</h5>
                        <div className="modal-btns d-flex justify-content-center">
                            <a href="javascript:void(0)" className="btn bg-grd-clr" onClick={() => setShowBlockedModel(false)}>CANCEL</a>
                            <a href="javascript:void(0)" className="btn bg-grd-clr" onClick={handleUnblock}>UNBLOCK</a>
                        </div>
                    </div>
                </Modal>
                <MoshVipModel showModel={showVipModel}
                    hideModel={hideVipModel}
                />
            </>
        )
    }
    export default MessageBox;