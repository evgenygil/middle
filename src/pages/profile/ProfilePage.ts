import BaseBlock from '../../utils/BaseBlock';
// import HTTPTransport from "../../utils/HTTPTransport";
import ProfileFormTemplate from 'bundle-text:./components/form/form.pug';
import pug from "pug";
import Validator from "../../utils/Validator";

interface ProfilePageProps {
    events: Record<string, () => void>
}

export default class ProfilePage extends BaseBlock {
    //private httpTransport: HTTPTransport;
    private validator: Validator;

    constructor(props: ProfilePageProps) {
        props.events = {
            "submit": e => {
                e.preventDefault();
                this.submitForm(e);
            }  
        };
        super(props);
        this.validator = new Validator();
    }

    submitForm(e) {
        if (!this.validator.validateForm(e.currentTarget)) {
            return;
        }

        const profileData = Object.fromEntries(new FormData(e.currentTarget));

        // this.httpTransport.post("profile", profileData);
        console.log(profileData);
    }

    render(){
        const compileFunction = pug.compile(ProfileFormTemplate, {});
        return this.compile(compileFunction, {});
    }
}