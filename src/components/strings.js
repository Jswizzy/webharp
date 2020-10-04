import WebHarpString from "./string.js";
import "./webharp-strings.css";

export default class WebHarpStrings extends HTMLElement {
  get stringsElements() {
    return this.querySelectorAll("webharp-string");
  }

  set points(pts) {
    if (!this.stringsElements) {
      return;
    }
    if (!pts.last || !pts.current) {
      return;
    }
    let magnitude = Math.abs(pts.current.x - pts.last.x);

    let xMin = Math.min(pts.current.x, pts.last.x);
    let xMax = Math.max(pts.current.x, pts.last.x);

    for (let d = 0; d < this.stringsElements.length; d++) {
      if (
        xMin <= this.stringsElements[d].offsetLeft &&
        xMax >= this.stringsElements[d].offsetLeft
      ) {
        let strum = {
          power: magnitude,
          string: d,
        };
        this.stringsElements[d].strum(strum);
      }
    }
  }

  connectedCallback() {
    let strings = '<div class="spacer"></div>';
    const numCords = Number(this.getAttribute("strings"));

    for (let c = 0; c < numCords; c++) {
      strings += `<webharp-string></webharp-string>`;
    }

    this.innerHTML = strings;
  }
}

if (!customElements.get("webharp-strings")) {
  customElements.define("webharp-strings", WebHarpStrings);
}
