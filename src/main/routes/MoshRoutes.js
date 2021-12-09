import { Route, Redirect } from "react-router-dom";
import { PrivateRoute } from '.';
import ProtectedRoute from './ProtectedRoute';
import Login from '../../modules/Login';
import { is_page_exist_app, is_page_exist_private, is_page_exist_protected } from '../../library/utilities/functions';
import { LoginHeader, LoginStepsBox, LoginMask } from "../../modules/Login/common";
import { ChatBox, Home, Likes, MessageOnline, Profile, SingleProfile } from "../../modules";
import { UpdateProfile } from "../../modules/Profile/common";
import { MessageBox } from "../../modules/Chat/common";

const MoshRoutes = ({ is_auth }) => {
    const isPageProtected = is_page_exist_protected();
    const isPagePrivate = is_page_exist_private();
    const is_page_exist = is_page_exist_app();

    if (is_page_exist) {
        if (isPageProtected) {
            return (
                <Route>
                    <section className="signup-wrapper">
                        <LoginMask />
                        <div className="signup-page">
                            <LoginHeader />
                            <LoginStepsBox />
                            <ProtectedRoute
                                path="/"
                                isauth={is_auth}
                                isPageProtected={isPageProtected}
                                component={Login} />
                        </div>
                    </section>
                </Route>
            )
        }

        if (isPagePrivate) {
            return (
                <Route>
                    <section className="home-wrapper">
                        {/* <img className="bg-mask" src="/webapp/images/mask-bg.png" alt="Mask" /> */}
                        <PrivateRoute
                            exact path="/"
                            isauth={is_auth}
                            isPagePrivate={isPagePrivate}
                            component={Home} />
                        <PrivateRoute
                            path="/home"
                            isauth={is_auth}
                            isPagePrivate={isPagePrivate}
                            component={Home} />
                        <PrivateRoute
                            path="/likes"
                            isauth={is_auth}
                            isPagePrivate={isPagePrivate}
                            component={Likes} />
                        <PrivateRoute
                            path="/chat"
                            isauth={is_auth}
                            isPagePrivate={isPagePrivate}
                            component={ChatBox} />
                        <PrivateRoute
                            path="/profile"
                            isauth={is_auth}
                            isPagePrivate={isPagePrivate}
                            component={Profile} />
                        <PrivateRoute
                            path="/single-profile/:userId"
                            isauth={is_auth}
                            isPagePrivate={isPagePrivate}
                            component={SingleProfile} />
                        <PrivateRoute
                            path="/message-online"
                            isauth={is_auth}
                            isPagePrivate={isPagePrivate}
                            component={MessageOnline} />
                        <PrivateRoute
                            path="/message-box/:secondUserId"
                            isauth={is_auth}
                            isPagePrivate={isPagePrivate}
                            component={MessageBox} />
                        <PrivateRoute
                            path="/update-profile"
                            isauth={is_auth}
                            isPagePrivate={isPagePrivate}
                            component={UpdateProfile} />
                    </section>
                </Route>
            )
        }
    }
    else {
        return (
            <Route>
                <Redirect
                    to={is_auth ? "/home" : "/login"}
                />
            </Route>
        )
    }
}
export default MoshRoutes