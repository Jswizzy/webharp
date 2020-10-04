import "./webharp-string.css";
import "csshake";
import * as Tone from "tone";

export default class WebHarpString extends HTMLElement {
  static synth = new Tone.PluckSynth().toDestination();
  timer = undefined;
  last = undefined;

  strum(params) {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    let dur = params.power * 10 + 250;
    this.classList.add("shake", "shake-constant", "shake-horizontal");

    if (dur < 5000) {
      this.classList.add("shake-little");
    }

    this.timer = setTimeout(() => this.stopStrum(), 1000);
    this.playSound(params);
  }

  stopStrum() {
    this.classList.remove(
      "shake",
      "shake-constant",
      "shake-horizontal",
      "shake-little"
    );
  }

  playSound(params) {
    let note = 60 + params.string * 5;
    const now = Tone.now();
    if (!this.last || now > this.last) {
      WebHarpString.synth.triggerAttack(note, now);
      WebHarpString.synth.triggerRelease(now + 0.5);
    }
    this.last = now;
  }

  startTone() {
    Tone.start().then(() => console.log("audio is ready"));
  }

  connectedCallback() {
    this.startTone();
    this.innerHTML = `<div class="line" ></div>`;
  }
}

if (!customElements.get("webharp-string")) {
  customElements.define("webharp-string", WebHarpString);
}
