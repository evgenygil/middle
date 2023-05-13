import pug from "pug";
import BaseBlock from "~/src/utils/BaseBlock";
import logOutButton from "./components/logOutButton/logOutButton";
import settingsButton from "./components/settingsButton/settingsButton";

export default class userMenu extends BaseBlock {
  constructor(props) {
    props = {
        logOutButton: new logOutButton({}), 
        settingsButton: new settingsButton({})
    }
    super(props);
  }

  render(){
    const template =  `form.user_menu
        div(data-id="id-${this.childrens.logOutButton?.id}")
        div(data-id="id-${this.childrens.settingsButton?.id}")`;

    const compileFunction = pug.compile(template, {...this.props});
    return this.compile(compileFunction, {...this.props});
  }
}