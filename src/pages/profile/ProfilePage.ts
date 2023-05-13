import BaseBlock from '../../utils/BaseBlock';
import Store from '../../utils/Store';
import { connect } from '../../utils/connect';
import pug from "pug";
import Validator from "../../utils/Validator";
import UsersController from '../../controllers/UsersController';

import Input from '../../components/input/input';

interface ProfilePageProps {
    events: Record<string, () => void>
}

class ProfilePage extends BaseBlock {
    private validator: Validator;

    constructor(props: ProfilePageProps) {
        props.events = {
            "submit": e => {
                e.preventDefault();
                this.submitForm(e);
            }  
        };

        props.childrens = {
            avatar: new Input({
                    name: "avatar",
                    type: "file",
                    placeholder: "Avatar",
                    value: Store.getState().user?.avatar,
                }),
            first_name: new Input({
                    name: "first_name",
                    type: "text",
                    placeholder: "First Name",
                    value: Store.getState().user?.first_name,
                }),
            second_name: new Input({
                    name: "second_name",
                    type: "text",
                    placeholder: "Second Name",
                    value: Store.getState().user?.second_name,
                }),
            display_name: new Input({
                    name: "display_name",
                    type: "text",
                    placeholder: "Display Name",
                    value: Store.getState().user?.display_name,
                }),
            login: new Input({
                    name: "login",
                    type: "text",
                    placeholder: "Login",
                    value: Store.getState().user?.login,
                }),
            email: new Input({
                    name: "email",
                    type: "text",
                    placeholder: "Email",
                    value: Store.getState().user?.email,
                }),
            phone: new Input({
                    name: "phone",
                    type: "text",
                    placeholder: "Phone",
                    value: Store.getState().user?.phone,
                }),
            password: new Input({
                    name: "password",
                    type: "password",
                    placeholder: "Password",
                }),
            new_password: new Input({
                    name: "new_password",
                    type: "password",
                    placeholder: "New Password",
                }),
        }
        super(props);
        this.validator = new Validator();
    }

    submitForm(e) {
        if (!this.validator.validateForm(e.currentTarget)) {
            return;
        }

        const profileData = Object.fromEntries(new FormData(e.target));
        UsersController.changeData(profileData);
    }

    static getStateToProps(state: State) {
        let props = {
        };
        if (state?.chats) {
            props = {
                user: state?.user,
            };
        }
        return props;
      }

    render(){
        console.log(Store.getState());
        const template = `div.fx.justify-center.items-center.h-100vh.profile_form_outer
        form(id="profile_form")
            h2 Edit profile
            div.input-wrap.fx.justify-center.items-center
            div.avatar
            div.input-wrap
                div(data-id="id-${this.childrens.avatar?.id}")
                div(data-id="id-${this.childrens.first_name?.id}")
                div(data-id="id-${this.childrens.second_name?.id}")
                div(data-id="id-${this.childrens.display_name?.id}")
                div(data-id="id-${this.childrens.login?.id}")
                div(data-id="id-${this.childrens.email?.id}")
                div(data-id="id-${this.childrens.phone?.id}")
                div(data-id="id-${this.childrens.password?.id}")
                div(data-id="id-${this.childrens.new_password?.id}")
            div.input-wrap
            button Save`;
        const compileFunction = pug.compile(template, {});
        return this.compile(compileFunction, {});
    }
}

export default connect(ProfilePage);