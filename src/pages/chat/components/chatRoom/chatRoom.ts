import BaseBlock from '~/src/utils/BaseBlock';
import Message from './components/Message/Message';
import pug from "pug";

import Store, { State } from '~/src/utils/Store';
import { connect } from '~/src/utils/connect';

class chatRoom extends BaseBlock {
  constructor(pageProps: Object) {
    super(pageProps);
  }

  static getStateToProps(state: State) {
    let props = {};
    if (state?.currentChat) {
      props = {
        currentChat: state?.currentChat?.chat,
        messages: state.currentChat.messages,
      };
    }
    return props;
  }

  prepareForView(messageData) {
    const date = new Date(messageData.time);
    const time = `${date.getHours()}:${date.getMinutes()}`;

    const currentUserId = Store.getState()?.user?.id;

    return {
      isFromCurrentUser: currentUserId === messageData?.user_id,
      date: time,
      body: messageData.content,
      isReaded: messageData.is_read
    }
  }

  render() {
    const compileFunction = pug.compile(`.messages_list
        each message_id in messages
          div(data-id='id-' + message_id)`);
    if (this.props.messages?.length > 0) {
      this.childrens = this.props.messages.reverse().reduce( (messages: {}, message: {}) => {
        const viewState = this.prepareForView({...message});
        messages[`message_${message.id}`] = new Message({...viewState});
        return messages;
      }, {});
    } else {
      this.childrens = {};
    }

    let messagesIds = [];
    if (Object.keys(this.childrens).length > 0) { 
      messagesIds = Object.entries(this.childrens).map( (value) => {
        return value[1].id;
      });
    }
    return this.compile(compileFunction, {messages: messagesIds});
  }
}

export default connect(chatRoom);