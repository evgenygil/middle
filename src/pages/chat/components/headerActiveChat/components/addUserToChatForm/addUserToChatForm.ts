import pug from "pug";
import BaseBlock from "~/src/utils/BaseBlock";
import ChatsController from "~/src/controllers/ChatsController";
import deleteChatForm from "../deleteChatForm/deleteChatForm";

import { connect } from '~/src/utils/connect';

class addUserToChatForm extends BaseBlock {
  constructor(props) {
    props.events = {
      "submit": evt => {
        evt.preventDefault();
        this.submitForm(evt.target);
      }
    }
    props.deleteChatForm = new deleteChatForm({});
    super(props);
  }

  submitForm(form){
    const userIdValue = form.querySelector(`[name=user_id]`).value;
    if (userIdValue) {
      ChatsController.addUser(this.props.currentChat?.id, userIdValue);
    }
  }

  static getStateToProps(state: State) {
    let props = {
    };
    if (state?.chats) {
        props = {
            currentChat: state?.currentChat?.chat,
        };
    }
    return props;
  }

  render(){
    const template =  `form.chat_form
  input(name='user_id' type="text")
  button(type="submit") Add user
  div(data-id="id-${this.childrens.deleteChatForm?.id}")`;
    const compileFunction = pug.compile(template, {...this.props});
    return this.compile(compileFunction, {...this.props});
  }
}

export default connect(addUserToChatForm);