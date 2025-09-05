import { LitElement, html, css } from 'lit';

export class ComplexProduct extends LitElement {
  static get properties() {
    return {
      product: { type: Object },
      selectedAttributes: { type: Object },
      quantity: { type: Number },
      activeImageIndex: { type: Number }
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

      /* Custom Product Layout */
      .product-row {
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
      }

      .product-image-section {
        flex: 1 1 60%;
        min-width: 300px;
      }

      .product-details-section {
        flex: 1 1 35%;
        min-width: 250px;
      }

      @media (max-width: 768px) {
        .product-image-section,
        .product-details-section {
          flex: 1 1 100%;
        }
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

      .form-label {
        margin-bottom: 0.5rem;
        font-weight: 700;
        color: #212529;
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

      .btn-outline-secondary {
        color: #6c757d;
        border-color: #6c757d;
      }

      .btn-outline-secondary:hover {
        color: #fff;
        background-color: #6c757d;
        border-color: #6c757d;
      }

      .btn-sm {
        padding: 0.25rem 0.5rem;
        font-size: 0.875rem;
        border-radius: 0.25rem;
      }

      /* Bootstrap Utility Classes */
      .d-flex {
        display: flex !important;
      }

      .justify-content-between {
        justify-content: space-between !important;
      }

      .justify-content-center {
        justify-content: center !important;
      }

      .align-items-start {
        align-items: flex-start !important;
      }

      .align-items-center {
        align-items: center !important;
      }

      .gap-2 {
        gap: 0.5rem !important;
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

      /* Product-specific Styles */
      .main-image-container {
        position: relative;
        overflow: hidden;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
      }

      .main-image-container img {
        transition: transform 0.3s ease;
        width: 100%;
        height: auto;
        border-radius: 0.5rem;
      }

      .main-image-container:hover img {
        transform: scale(1.02);
      }

      .thumbnail-gallery {
        display: flex;
        gap: 0.5rem;
        justify-content: center;
      }

      .thumbnail {
        width: 60px;
        height: 60px;
        object-fit: cover;
        cursor: pointer;
        border: 2px solid transparent;
        border-radius: 0.5rem;
        transition: all 0.3s ease;
      }

      .thumbnail:hover {
        border-color: #0d6efd;
        transform: scale(1.05);
      }

      .thumbnail.active {
        border-color: #0d6efd;
        box-shadow: 0 0 0 2px rgba(13, 110, 253, 0.25);
      }

      .size-options {
        display: flex;
        gap: 0.5rem;
      }

      .size-btn {
        min-width: 40px;
        padding: 0.375rem 0.75rem;
      }

      .size-btn.active {
        background-color: #0d6efd;
        color: white;
        border-color: #0d6efd;
      }

      .quantity-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .quantity-display {
        min-width: 50px;
        text-align: center;
        font-weight: 600;
        padding: 0.375rem 0.75rem;
        border: 1px solid #dee2e6;
        border-radius: 0.375rem;
        background-color: #fff;
        color: #212529;
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
    this.selectedAttributes = {};
    this.quantity = 1;
    this.activeImageIndex = 0;
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

    // Set default values for all attributes
    if (this.product.attributes) {
      this.selectedAttributes = {};
      Object.keys(this.product.attributes).forEach(attributeKey => {
        const attribute = this.product.attributes[attributeKey];
        this.selectedAttributes[attributeKey] = attribute.default || attribute.options?.[0] || '';
      });
    }
  }

  _switchImage(index) {
    this.activeImageIndex = index;
  }

  _selectAttribute(attributeKey, value) {
    this.selectedAttributes = {
      ...this.selectedAttributes,
      [attributeKey]: value
    };
  }

  _changeQuantity(change) {
    this.quantity = Math.max(1, this.quantity + change);
  }

  _addToCart() {
    if (!this.product.sku) return;
    
    const productForCart = {
      id: parseInt(this.product.sku),
      name: this.product.name,
      price: this.product.price,
      quantity: 1,
      attributes: this.selectedAttributes,
      description: this.product.description,
      rating: this.product.rating,
      category: this.product.category[0],
      type: this.product.category[0]
    };
    
    // Dispatch multiple times for the quantity
    for (let i = 0; i < this.quantity; i++) {
      this.dispatchEvent(new CustomEvent('add-to-cart', {
        detail: { item: productForCart },
        bubbles: true,
        composed: true
      }));
    }
    
    // Reset quantity to 1 after adding
    this.quantity = 1;
  }

  render() {
    if (!this.product.name) return html`<div>Loading product...</div>`;

    const badgeColor = this.product.price > 25 ? 'primary' : 'success';
    const buttonColor = this.product.price > 25 ? 'primary' : 'success';
    
    const thumbnails = this.product.images?.map((img, index) => {
      const label = ['Front', 'Back', 'Side', 'Detail'][index] || `View ${index + 1}`;
      return html`
        <img 
          src="${img.replace('300x300', '60x60')}" 
          class="thumbnail ${index === this.activeImageIndex ? 'active' : ''}"
          @click="${() => this._switchImage(index)}" 
          alt="${label} view"
        >
      `;
    }) || [];

    const attributeElements = [];
    if (this.product.attributes) {
      Object.keys(this.product.attributes).forEach(attributeKey => {
        const attribute = this.product.attributes[attributeKey];
        const options = attribute.options?.map(option => html`
          <button 
            class="btn btn-outline-secondary size-btn ${option === this.selectedAttributes[attributeKey] ? 'active' : ''}"
            @click="${() => this._selectAttribute(attributeKey, option)}"
          >
            ${option}
          </button>
        `) || [];

        if (options.length > 0) {
          attributeElements.push(html`
            <div class="mb-3">
              <label class="form-label fw-bold">${attribute.name || attributeKey}:</label>
              <div class="size-options d-flex gap-2">
                ${options}
              </div>
            </div>
          `);
        }
      });
    }

    return html`
      <div class="card h-100 shadow-sm">
        <div class="card-body p-4">
          <div class="product-row">
            <div class="product-image-section">
              <div class="main-image-container mb-3">
                <img 
                  src="${this.product.images?.[this.activeImageIndex] || ''}" 
                  class="img-fluid rounded" 
                  alt="${this.product.name}"
                >
              </div>
              <div class="thumbnail-gallery d-flex gap-2 justify-content-center">
                ${thumbnails}
              </div>
            </div>
            <div class="product-details-section">
              <div class="d-flex justify-content-between align-items-start mb-3">
                <h5 class="card-title mb-0">${this.product.name}</h5>
                <span class="badge bg-${badgeColor} fs-6">$${this.product.price}</span>
              </div>
              <p class="card-text text-muted mb-3">
                ${this.product.description}
              </p>
              
              ${attributeElements}
              
              <div class="mb-3">
                <label class="form-label fw-bold">Quantity:</label>
                <div class="quantity-controls d-flex align-items-center gap-2">
                  <button class="btn btn-outline-secondary btn-sm" @click="${() => this._changeQuantity(-1)}">−</button>
                  <span class="quantity-display">${this.quantity}</span>
                  <button class="btn btn-outline-secondary btn-sm" @click="${() => this._changeQuantity(1)}">+</button>
                </div>
              </div>
              
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
        </div>
      </div>
    `;
  }
}

customElements.define('complex-product', ComplexProduct);