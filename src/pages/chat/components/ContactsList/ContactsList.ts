import BaseBlock from '~/src/utils/BaseBlock';
import Contact from './components/contact/contact';
import pug from "pug";

import { State } from '~/src/utils/Store';
import { connect } from '~/src/utils/connect';
import addChatForm from '../addChatForm/addChatForm';

class ContactsList extends BaseBlock {
  private props: {
    childrens: {} | undefined,
    currentChat: number | undefined, 
    chats: [],
    addChatForm: addChatForm
  }

  private childrens: {};

  constructor(props: any) {
    super(props);
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
    const compileFunction = pug.compile(`.contact_list
    each chat_id in chats
      div(data-id='id-' + chat_id)`);
    if (this.props.chats?.length > 0) {
      this.childrens = this.props.chats.reduce( (chats: {}, chat: {}) => {
        chats[`chat_${chat.id}`] = new Contact({...chat});
        return chats;
      }, {});
    }

    let chatsIds = [];
    if (Object.keys(this.childrens).length > 0) { 
      chatsIds = Object.entries(this.childrens).map( (value) => {
        return value[1].id;
      });
    }
    return this.compile(compileFunction, {chats: chatsIds});
  }
}

export default connect(ContactsList);