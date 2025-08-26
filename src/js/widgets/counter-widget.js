import { LitElement, html, css } from 'lit';

class CounterWidget extends LitElement {
  static properties = {
    startValue: { type: Number, attribute: 'start-value' },
    color: { type: String },
    count: { type: Number }
  };

  static styles = css`
    :host {
      display: inline-block;
      font-family: inherit;
    }
    .counter {
      padding: 1rem;
      border: 2px solid var(--bs-primary);
      border-radius: 0.375rem;
      text-align: center;
    }
    .counter.success button {
      background: var(--bs-success);
    }
    .counter.danger button {
      background: var(--bs-danger);
    }
    button {
      background: var(--bs-primary);
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      margin: 0 0.5rem;
      border-radius: 0.25rem;
      cursor: pointer;
    }
    .count {
      font-size: 1.5rem;
      font-weight: bold;
      margin: 0 1rem;
    }
  `;

  constructor() {
    super();
    this.startValue = 0;
    this.color = 'primary';
    this.count = this.startValue;
  }

  firstUpdated() {
    this.count = this.startValue;
  }

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  render() {
    return html`
      <div class="counter ${this.color}">
        <button @click=${this.decrement}>−</button>
        <span class="count">${this.count}</span>
        <button @click=${this.increment}>+</button>
      </div>
    `;
  }
}

customElements.define('counter-widget', CounterWidget);