import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  connect() {
    this.connected();
  }

  connected() {}

  disconnect() {
    this.disconnected();
  }

  disconnected() {}
}
