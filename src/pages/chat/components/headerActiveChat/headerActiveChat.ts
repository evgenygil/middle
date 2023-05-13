import addUserToChatForm from "./components/addUserToChatForm/addUserToChatForm";
import pug from "pug";
import BaseBlock from "~/src/utils/BaseBlock";
import { connect } from "../../../../utils/connect";

class headerActiveChat extends BaseBlock {
  constructor(props) {
    props = {
      addUserToChatForm: new addUserToChatForm({}),      
    }
    super(props);
  }

  static getStateToProps(state: State) {
    let props = {};
    if (state?.currentChat) {
        props = {
          chat: state?.currentChat?.chat
        };
    }
    return props;
  }

  render(){
    const template =  `.header_chatroom
    h2 ${this.props.chat?.title}
    div(data-id="id-${this.childrens.addUserToChatForm?.id}")`;
    const compileFunction = pug.compile(template, {...this.props});
    return this.compile(compileFunction, {...this.props});
  }
}

export default connect(headerActiveChat);