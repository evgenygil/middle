import RegistrationPage from "./registrationPage";
import {renderDOM} from "../../utils/renderDom";

document.addEventListener("DOMContentLoaded", () => {
  renderDOM(".registration_form_outer", new RegistrationPage({}));
});