import Reveal from 'reveal.js';

import ApplicationController from 'application_controller';

export default class extends ApplicationController {
  static targets = ['root'];

  static values = {
    currentSlideIndex: {
      type: Array,
      default: [0, 0, 0],
    },
    controls: {
      type: Boolean,
      default: false,
    },
    autoSlide: {
      type: Number,
      default: 0,
    },
    loop: {
      type: Boolean,
      default: true,
    },
  };

  connected() {
    const config = {
      embedded: true,
      // transition: 'none',
      autoSlide: this.autoSlideValue,
      loop: this.loopValue,
      controls: this.controlsValue,
      plugins: [],
    };

    if (this.hasRootTarget) {
      this.deck = new Reveal(this.rootTarget, {
        ...config,
        embedded: true,
      });
    } else {
      this.deck = new Reveal({
        ...config,
        embedded: false,
      });
    }

    this.deck.on('slidechanged', ((event) => {
      this.currentSlideIndexValue = [
        event.indexh,
        event.indexv,
        event.indexf,
      ];
    }).bind(this));

    this.deck.initialize();
  }

  currentSlideIndexValueChanged(value, prevValue) {
    if (!this.deck) return;
    if (value[0] === prevValue[0] && value[1] === prevValue[1] && value[2] === prevValue[2]) return;

    this.slide();
  }

  slide() {
    this.deck.slide(
      this.currentSlideIndexValue[0],
      this.currentSlideIndexValue[1],
      this.currentSlideIndexValue[2],
    );
  }
}
