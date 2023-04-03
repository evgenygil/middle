
import {renderDOM} from "../../utils/renderDom";
import chatRoom from "./components/chatRoom/chatRoom";
import ContactsList from './components/ContactsList/ContactsList';
import SendMessageForm from "./components/sendMessageForm/sendMessageForm";
import chatData from "./data/contactsData";

document.addEventListener("DOMContentLoaded", () => {
  const componentChatRoom = new chatRoom({messages: chatData.messages});
  const componentContactsList = new ContactsList({contacts: chatData.contacts});
  const componentSendMessageForm = new SendMessageForm({});

  renderDOM("aside", componentContactsList);
  renderDOM(".chat_room_outer", componentChatRoom);
  renderDOM(".send_msg_form_outer", componentSendMessageForm);
});