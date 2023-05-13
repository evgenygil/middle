import router, {
    MAIN, SIGNIN, MESSENGER, SETTINGS, SIGNUP,
} from '../utils/Router';
import UsersController from '../controllers/UsersController';

import ChatPage from '../pages/chat/chatPage';
import ProfilePage from '../pages/profile/ProfilePage';
import RegistrationPage from '../pages/registration/registrationPage';
import LoginPage from "../pages/login/LoginPage";

export default function init() {
    UsersController.getUserInfo().then(() => {
        router
            .use(MAIN, LoginPage)
            .use(SIGNIN, LoginPage)
            .use(SIGNUP, RegistrationPage)
            .use(SETTINGS, ProfilePage)
            .use(MESSENGER, ChatPage)
            .start();
    });
}

init();