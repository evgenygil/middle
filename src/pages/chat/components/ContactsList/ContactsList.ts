import BaseBlock from '~/src/utils/BaseBlock';
import Contact from './components/contact/contact';
import pug from "pug";

export default class ContactsList extends BaseBlock {
  private props: {
    contactsList: Contact[],
    contacts: []
  }
  constructor(pageProps: any) {
    super(pageProps);
  }

  initChildren() {
    if (this.props.contacts.length > 0) { 
      const contactsList = [];
      this.props.contacts.forEach(contact => {
        contactsList.push(new Contact(contact));
      });
      this.setProps({contactsList: contactsList});
    }
  }

  render() {
    let contactsHtml = "";
    this.props.contactsList.forEach(element => {
      contactsHtml += element.getContent().outerHTML;
    });

    const compileFunction = pug.compile("<div class='contact_list'>" + contactsHtml + "</div>");
    return this.compile(compileFunction, {});
  }
}