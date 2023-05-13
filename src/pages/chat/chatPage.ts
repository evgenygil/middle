import chatRoom from "./components/chatRoom/chatRoom";
import ContactsList from './components/ContactsList/ContactsList';
import SendMessageForm from "./components/sendMessageForm/sendMessageForm";
import addChatForm from "./components/addChatForm/addChatForm";
import headerActiveChat from "./components/headerActiveChat/headerActiveChat";
import userMenu from "./components/userMenu.ts/userMenu";

import pug from "pug";

import ChatsController from "../../controllers/ChatsController";

import { State } from '../../utils/Store';
import { connect } from '../../utils/connect';

import BaseBlock from "../../utils/BaseBlock";

class chatPage extends BaseBlock {

  constructor(props: any = {}) {
    props.componentChatRoom = new chatRoom({});
    props.componentContactsList = new ContactsList({});
    props.componentSendMessageForm = new SendMessageForm({});
    props.addChatForm = new addChatForm({});
    props.headerActiveChat = new headerActiveChat({});
    props.userMenu = new userMenu({});
    super(props);
    ChatsController.getChats();
  }

  static getStateToProps(state: State) {
    let props = {};
    if (state?.chats) {
      props = {
        chats: state.chats,
        currentChat: state?.currentChat?.chat?.id,
      };
    }
    return props;
  }

  render() {
      const template = `.chat_page_wrap
      aside
        .header_contact_list
          div(data-id="id-${this.childrens.addChatForm.id}")
        div(data-id="id-${this.childrens.componentContactsList.id}")
        div(data-id="id-${this.childrens.userMenu.id}")
      .chat_wrap
        if hasActiveChat
          .chat_room_outer
            div(data-id="id-${this.childrens.headerActiveChat.id}")
            .chat_room_inner
              div(data-id="id-${this.childrens.componentChatRoom.id}")
          .send_msg_form_outer
            div(data-id="id-${this.childrens.componentSendMessageForm.id}")`;
      const compileFunction = pug.compile(template, {});
      return this.compile(compileFunction, {hasActiveChat: this.props.currentChat});
  }
}

export default connect(chatPage);