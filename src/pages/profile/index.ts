import ProfilePage from "./ProfilePage";
import {renderDOM} from "../../utils/renderDom";

document.addEventListener("DOMContentLoaded", () => {
    renderDOM(".profile_form_outer", new ProfilePage({}));
});