import pug from "pug";
import BaseBlock from "~/src/utils/BaseBlock";
import UsersController from "../../../../../../controllers/UsersController";

const template =  `button(type="button") Log Out`;

export default class logOutButton extends BaseBlock {
  constructor(props) {
    props.events = {
      click: evt => {
        UsersController.logout();
      }
    }
    super(props);
  }

  render(){
    const compileFunction = pug.compile(template, {...this.props});
    return this.compile(compileFunction, {...this.props});
  }
}