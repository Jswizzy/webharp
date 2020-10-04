import "./styles.scss";

import Strings from "./components/strings.js";

export default class WebHarpApp extends HTMLElement {
  lastPoint = { x: undefined, y: undefined };
  stringsElement = undefined;

  connectedCallback() {
    this.innerHTML = `<webharp-strings strings="${this.getAttribute(
      "strings"
    )}"></webharp-strings>`;
    this.stringsElement = this.querySelector("webharp-strings");
    this.addEventListener("mousemove", (event) => this.onMouseMove(event));
  }

  onMouseMove(event) {
    this.stringsElement.points = {
      last: this.lastPoint,
      current: { x: event.pageX, y: event.pageY },
    };
    this.lastPoint = { x: event.pageX, y: event.pageY };
  }
}

if (!customElements.get("webharp-app")) {
  customElements.define("webharp-app", WebHarpApp);
}
