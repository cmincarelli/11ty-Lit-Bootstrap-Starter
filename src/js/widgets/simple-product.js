import { LitElement, html, css } from 'lit';

export class SimpleProduct extends LitElement {
  static get properties() {
    return {
      product: { type: Object }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: var(--bs-font-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif);
        font-size: 1rem;
        line-height: 1.5;
        color: #212529;
      }

      /* Bootstrap Card Styles */
      .card {
        position: relative;
        display: flex;
        flex-direction: column;
        min-width: 0;
        word-wrap: break-word;
        background-color: #fff;
        background-clip: border-box;
        border: 1px solid rgba(0, 0, 0, 0.125);
        border-radius: 0.375rem;
        height: 100%;
        transition: box-shadow 0.15s ease-in-out;
      }
      
      .card:hover {
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
      }

      .card-body {
        flex: 1 1 auto;
        padding: 1.25rem;
      }

      /* Bootstrap Typography */
      .card-title {
        margin-bottom: 0.5rem;
        font-size: 1.25rem;
        font-weight: 500;
        line-height: 1.2;
        color: #212529;
      }

      .card-text {
        color: #6c757d;
      }

      /* Bootstrap Badge Styles */
      .badge {
        display: inline-block;
        padding: 0.35em 0.65em;
        font-size: 0.75em;
        font-weight: 700;
        line-height: 1;
        color: #fff;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: 0.375rem;
      }

      .bg-primary {
        background-color: #0d6efd !important;
      }

      .bg-success {
        background-color: #198754 !important;
      }

      .fs-6 {
        font-size: 1rem !important;
      }

      /* Bootstrap Button Styles */
      .btn {
        display: inline-block;
        font-weight: 400;
        line-height: 1.5;
        color: #212529;
        text-align: center;
        text-decoration: none;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        background-color: transparent;
        border: 1px solid transparent;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        border-radius: 0.375rem;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, transform 0.2s ease;
      }

      .btn:hover {
        color: #212529;
        transform: translateY(-1px);
      }

      .btn:focus {
        outline: 0;
        box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
      }

      .btn-primary {
        color: #fff;
        background-color: #0d6efd;
        border-color: #0d6efd;
      }

      .btn-primary:hover {
        color: #fff;
        background-color: #0b5ed7;
        border-color: #0a58ca;
      }

      .btn-success {
        color: #fff;
        background-color: #198754;
        border-color: #198754;
      }

      .btn-success:hover {
        color: #fff;
        background-color: #157347;
        border-color: #146c43;
      }

      /* Bootstrap Utility Classes */
      .d-flex {
        display: flex !important;
      }

      .justify-content-between {
        justify-content: space-between !important;
      }

      .align-items-start {
        align-items: flex-start !important;
      }

      .align-items-center {
        align-items: center !important;
      }

      .mb-0 {
        margin-bottom: 0 !important;
      }

      .mb-3 {
        margin-bottom: 1rem !important;
      }

      .me-1 {
        margin-right: 0.25rem !important;
      }

      .me-2 {
        margin-right: 0.5rem !important;
      }

      .text-muted {
        color: #6c757d !important;
      }

      .text-warning {
        color: #ffc107 !important;
      }

      .h-100 {
        height: 100% !important;
      }

      .shadow-sm {
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
      }

      .p-4 {
        padding: 1.5rem !important;
      }

      /* Bootstrap Icons Support */
      .bi::before {
        display: inline-block;
        font-family: "bootstrap-icons" !important;
        font-style: normal;
        font-weight: normal !important;
        font-variant: normal;
        text-transform: none;
        line-height: 1;
        vertical-align: -0.125em;
      }

      .bi-star-fill::before {
        content: "\\f586";
      }

      .bi-cart-plus::before {
        content: "\\f217";
      }

      /* Product Image */
      .product-image {
        width: 100%;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        border-top-left-radius: 0.375rem;
        border-top-right-radius: 0.375rem;
      }

      /* Small text */
      small {
        font-size: 0.875em;
      }
    `;
  }

  constructor() {
    super();
    this.product = {};
  }

  connectedCallback() {
    super.connectedCallback();
    // Parse the product JSON string if it's a string
    if (typeof this.product === 'string') {
      try {
        this.product = JSON.parse(this.product);
      } catch (e) {
        console.error('Failed to parse product JSON:', e);
        this.product = {};
      }
    }
  }

  _addToCart() {
    if (!this.product.sku) return;
    
    const productForCart = {
      id: parseInt(this.product.sku),
      name: this.product.name,
      type: this.product.category[0],
      price: this.product.price,
      description: this.product.description,
      rating: this.product.rating,
      category: this.product.category[0]
    };
    
    this.dispatchEvent(new CustomEvent('add-to-cart', {
      detail: { item: productForCart },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    if (!this.product.name) return html`<div>Loading product...</div>`;

    const badgeColor = this.product.price > 20 ? 'primary' : 'success';
    const buttonColor = this.product.price > 20 ? 'primary' : 'success';

    return html`
      <div class="card h-100 shadow-sm">
        ${this.product.images && this.product.images[0] ? html`
          <img src="${this.product.images[0]}" class="product-image" alt="${this.product.name}">
        ` : ''}
        <div class="card-body p-4">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <h5 class="card-title mb-0">${this.product.name}</h5>
            <span class="badge bg-${badgeColor} fs-6">$${this.product.price}</span>
          </div>
          <p class="card-text text-muted mb-3">
            ${this.product.description}
          </p>
          <div class="d-flex justify-content-between align-items-center">
            <small class="text-muted">
              <i class="bi bi-star-fill text-warning me-1"></i>${this.product.rating} rating
            </small>
            <button class="btn btn-${buttonColor}" @click="${this._addToCart}">
              <i class="bi bi-cart-plus me-2"></i>Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('simple-product', SimpleProduct);