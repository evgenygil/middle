import {renderDOM} from "../../utils/renderDom";
import LoginPage from "./LoginPage";

document.addEventListener("DOMContentLoaded", () => {
  // new LoginPage({});
  renderDOM(".login_form_outer", new LoginPage({}));
});