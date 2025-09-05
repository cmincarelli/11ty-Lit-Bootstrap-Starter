import { LitElement, html, css } from 'lit';

class ShoppingCart extends LitElement {
  static properties = {
    isOpen: { type: Boolean },
    items: { type: Array },
    total: { type: Number },
    itemCount: { type: Number }
  };

  static styles = css`
    :host {
      position: fixed;
      top: 0;
      right: 0;
      height: 100vh;
      width: 400px;
      font-family: inherit;
    }
    
    .cart-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0,0,0,0.5);
      z-index: 1040;
      animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .cart-panel {
      background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
      height: 100%;
      display: flex;
      flex-direction: column;
      box-shadow: -5px 0 20px rgba(0,0,0,0.3);
      color: white;
      animation: slideIn 0.3s ease;
      z-index: 1050;
    }
    
    @keyframes slideIn {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
    
    .cart-header {
      padding: 1.5rem;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      display: flex;
      justify-content: between;
      align-items: center;
      background: rgba(255,255,255,0.05);
    }
    
    .cart-title {
      font-size: 1.5rem;
      font-weight: bold;
      color: #ffc107;
      flex: 1;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    
    .cart-count {
      background: #dc3545;
      color: white;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: bold;
    }
    
    .close-btn {
      background: transparent;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 4px;
      transition: background 0.2s ease;
    }
    
    .close-btn:hover {
      background: rgba(255,255,255,0.1);
    }
    
    .cart-body {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
    }
    
    .empty-cart {
      text-align: center;
      padding: 3rem 1rem;
      color: rgba(255,255,255,0.6);
    }
    
    .empty-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
      opacity: 0.3;
    }
    
    .cart-items {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .cart-item {
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);
      border-radius: 12px;
      padding: 1rem;
      border: 1px solid rgba(255,255,255,0.1);
      transition: all 0.3s ease;
    }
    
    .cart-item:hover {
      background: rgba(255,255,255,0.15);
      border-color: rgba(255,193,7,0.3);
    }
    
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.75rem;
    }
    
    .item-info h4 {
      margin: 0 0 0.25rem 0;
      color: #ffc107;
      font-size: 1rem;
      font-weight: 600;
    }
    
    .item-info .item-price {
      color: #28a745;
      font-weight: bold;
      font-size: 0.9rem;
    }
    
    .badge {
      background: rgba(255,193,7,0.2);
      color: #ffc107;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
      margin-right: 0.5rem;
    }
    
    .item-type {
      color: rgba(255,255,255,0.7);
      font-size: 0.8rem;
      font-style: italic;
    }
    
    .remove-btn {
      background: transparent;
      border: 1px solid #dc3545;
      color: #dc3545;
      border-radius: 4px;
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .remove-btn:hover {
      background: #dc3545;
      color: white;
    }
    
    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-top: 0.75rem;
    }
    
    .quantity-btn {
      background: rgba(255,193,7,0.2);
      border: 1px solid #ffc107;
      color: #ffc107;
      width: 32px;
      height: 32px;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      transition: all 0.2s ease;
    }
    
    .quantity-btn:hover:not(:disabled) {
      background: #ffc107;
      color: #2c3e50;
    }
    
    .quantity-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .quantity-display {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      color: white;
      padding: 0.5rem;
      border-radius: 6px;
      min-width: 60px;
      text-align: center;
      font-weight: 600;
    }
    
    .item-subtotal {
      text-align: right;
      margin-top: 0.5rem;
      font-weight: bold;
      color: #17a2b8;
    }
    
    .cart-footer {
      border-top: 1px solid rgba(255,255,255,0.1);
      padding: 1.5rem;
      background: rgba(255,255,255,0.05);
    }
    
    .cart-summary {
      margin-bottom: 1.5rem;
    }
    
    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      padding: 0.25rem 0;
    }
    
    .summary-row.total {
      border-top: 1px solid rgba(255,255,255,0.2);
      padding-top: 0.75rem;
      margin-top: 0.75rem;
      font-size: 1.25rem;
      font-weight: bold;
      color: #ffc107;
    }
    
    .cart-actions {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .action-btn {
      padding: 0.75rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
    
    .checkout-btn {
      background: linear-gradient(45deg, #ffc107, #ff8f00);
      color: #2c3e50;
    }
    
    .checkout-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(255,193,7,0.3);
    }
    
    .clear-btn {
      background: transparent;
      color: #dc3545;
      border: 1px solid #dc3545;
    }
    
    .clear-btn:hover {
      background: #dc3545;
      color: white;
    }
    
    .success-message {
      background: linear-gradient(45deg, #28a745, #20c997);
      color: white;
      padding: 1rem;
      border-radius: 8px;
      text-align: center;
      margin-bottom: 1rem;
      animation: slideIn 0.3s ease;
    }
    
    
    @media (max-width: 480px) {
      :host {
        width: 100vw;
      }
    }
  `;

  constructor() {
    super();
    this.isOpen = false;
    this.items = [];
    this.total = 0;
    this.itemCount = 0;
    this.storageKey = 'roastcode_cart';
    this.showSuccess = false;
    
    // Load checkout configuration with defaults
    this.checkoutConfig = this.getCheckoutConfig();
    
    this.loadCartFromStorage();
    this.setupEventListeners();
  }

  getCheckoutConfig() {
    // Try to get config from window global (injected by Eleventy)
    if (window.checkoutConfig) {
      return window.checkoutConfig;
    }
    
    // Fallback to default configuration
    return {
      tax: {
        rate: 0.0875,
        percentage: 8.75,
        label: "Tax",
        enabled: true
      },
      currency: {
        symbol: "$",
        decimals: 2
      }
    };
  }

  setupEventListeners() {
    // Listen for add-to-cart events from other components
    document.addEventListener('add-to-cart', (e) => {
      this.addItem(e.detail.item);
    });

    // Listen for open cart events
    document.addEventListener('open-cart', () => {
      this.openCart();
    });

    // Listen for escape key to close cart
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeCart();
      }
    });
  }

  loadCartFromStorage() {
    try {
      const savedCart = localStorage.getItem(this.storageKey);
      if (savedCart) {
        const cartData = JSON.parse(savedCart);
        this.items = cartData.items || [];
        this.calculateTotals();
      }
    } catch (error) {
      console.warn('Failed to load cart from localStorage:', error);
      this.items = [];
    }
  }

  saveCartToStorage() {
    try {
      const cartData = {
        items: this.items,
        total: this.total,
        itemCount: this.itemCount,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(this.storageKey, JSON.stringify(cartData));
      
      // Dispatch event for other components
      this.dispatchEvent(new CustomEvent('cart-updated', {
        detail: { itemCount: this.itemCount, total: this.total },
        bubbles: true,
        composed: true
      }));
    } catch (error) {
      console.warn('Failed to save cart to localStorage:', error);
    }
  }

  calculateTotals() {
    this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.itemCount = this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Helper method to generate unique item keys that include all attributes
  getItemKey(item) {
    if (item.attributes) {
      const attributesStr = Object.entries(item.attributes)
        .sort(([a], [b]) => a.localeCompare(b)) // Sort for consistent keys
        .map(([key, value]) => `${key}:${value}`)
        .join('|');
      return `${item.id}_${attributesStr}`;
    }
    // Fallback for legacy items with size property
    return `${item.id}_${item.size || 'nosize'}`;
  }

  // Helper method to find item by key
  findItemByKey(itemKey) {
    return this.items.find(item => this.getItemKey(item) === itemKey);
  }

  // Helper method to find item index by key
  findItemIndexByKey(itemKey) {
    return this.items.findIndex(item => this.getItemKey(item) === itemKey);
  }

  addItem(newItem) {
    const itemKey = this.getItemKey(newItem);
    const existingItemIndex = this.findItemIndexByKey(itemKey);
    
    if (existingItemIndex >= 0) {
      // Item with same id AND size exists, increment quantity
      this.items[existingItemIndex].quantity += (newItem.quantity || 1);
    } else {
      // New item (different id OR different size), add as new entry
      const cartItem = {
        id: newItem.id,
        name: newItem.name,
        price: newItem.price,
        quantity: newItem.quantity || 1,
        category: newItem.category || 'coffee'
      };

      // Preserve additional properties if they exist
      if (newItem.attributes) cartItem.attributes = newItem.attributes;
      if (newItem.size) cartItem.size = newItem.size; // Legacy support
      if (newItem.type) cartItem.type = newItem.type;
      if (newItem.description) cartItem.description = newItem.description;
      if (newItem.rating) cartItem.rating = newItem.rating;

      this.items.push(cartItem);
    }
    
    this.calculateTotals();
    this.saveCartToStorage();
    
    // Enhanced success message that includes attributes if available
    let attributesText = '';
    if (newItem.attributes) {
      const attrPairs = Object.entries(newItem.attributes)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
      attributesText = ` (${attrPairs})`;
    } else if (newItem.size) {
      attributesText = ` (Size: ${newItem.size})`;
    }
    this.showSuccessMessage(`${newItem.name}${attributesText} added to cart!`);
    
    this.requestUpdate();
    this.openCart();
  }

  removeItem(itemKey) {
    // Support both old itemId format and new itemKey format for backward compatibility
    const indexToRemove = itemKey.includes('_') 
      ? this.findItemIndexByKey(itemKey)
      : this.items.findIndex(item => item.id == itemKey);
      
    if (indexToRemove >= 0) {
      this.items.splice(indexToRemove, 1);
      this.calculateTotals();
      this.saveCartToStorage();
      this.requestUpdate();
    }
  }

  updateQuantity(itemKey, newQuantity) {
    if (newQuantity <= 0) {
      this.removeItem(itemKey);
      return;
    }

    // Support both old itemId format and new itemKey format for backward compatibility
    const itemIndex = itemKey.includes('_') 
      ? this.findItemIndexByKey(itemKey)
      : this.items.findIndex(item => item.id == itemKey);
      
    if (itemIndex >= 0) {
      this.items[itemIndex].quantity = newQuantity;
      this.calculateTotals();
      this.saveCartToStorage();
      this.requestUpdate();
    }
  }

  clearCart() {
    this.items = [];
    this.calculateTotals();
    this.saveCartToStorage();
    this.requestUpdate();
  }

  openCart() {
    console.log('Opening cart');
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
    this.requestUpdate();
    console.log('Cart Open ', this.isOpen);
  }

  closeCart() {
    console.log('Closing cart');
    this.isOpen = false;
    document.body.style.overflow = '';
    this.requestUpdate();
    console.log('Cart Open ', this.isOpen);
  }

  handleOverlayClick(e) {
    // Only close if clicking directly on the overlay, not its children
    if (e.target === e.currentTarget) {
      this.closeCart();
    }
  }

  proceedToCheckout() {
    if (this.items.length === 0) return;
    
    // Save cart data for checkout page
    this.saveCartToStorage();
    
    // Navigate to checkout page
    window.location.href = '/checkout/';
  }

  showSuccessMessage(message) {
    // You could implement a toast notification here
    // For now, we'll just log it
    console.log('Cart Success:', message);
  }

  render() {
    // If cart is not open, render nothing at all
    if (!this.isOpen) {
      return html`<div style="display: none;"></div>`;
    }

    // Refresh configuration in case it wasn't available during constructor
    this.checkoutConfig = this.getCheckoutConfig();

    const tax = (this.checkoutConfig.tax.enabled && this.checkoutConfig.tax.percentage > 0) 
      ? this.total * this.checkoutConfig.tax.rate 
      : 0;
    const finalTotal = this.total + tax;

    return html`
      <!--div class="cart-overlay show" @click=${this.handleOverlayClick}></div-->

      <div class="cart-panel" style="transform: translateX(0); visibility: visible;">
        <div class="cart-header">
          <div class="cart-title">
            <i class="bi bi-cart-fill"></i>
            Your Order
            ${this.itemCount > 0 ? html`<span class="cart-count">${this.itemCount}</span>` : ''}
          </div>
          <button class="close-btn" @click=${this.closeCart}>
            <i class="bi bi-x-lg text-white">X</i>
          </button>
        </div>
        
        <div class="cart-body">
          ${this.showSuccess ? html`
            <div class="success-message">
              <i class="bi bi-check-circle-fill me-2"></i>
              Order placed successfully!
            </div>
          ` : ''}
          
          ${this.items.length === 0 ? html`
            <div class="empty-cart">
              <div class="empty-icon">☕</div>
              <h3>Your cart is empty</h3>
              <p>Add some delicious coffee to get started!</p>
            </div>
          ` : html`
            <div class="cart-items">
              ${this.items.map(item => {
                const itemKey = this.getItemKey(item);
                return html`
                  <div class="cart-item">
                    <div class="item-header">
                      <div class="item-info">
                        <h4>
                          ${item.name}
                        </h4>
                        <div>
                          ${item.attributes ? Object.entries(item.attributes).map(([key, value]) => 
                            html`<span class="${key}-badge badge">${key}: ${value}</span>`
                          ) : ''}
                        </div>
                        <div class="item-price">$${item.price.toFixed(2)} each</div>
                        ${item.type ? html`<div class="item-type">${item.type}</div>` : ''}
                      </div>
                      <button class="remove-btn" @click=${() => this.removeItem(itemKey)}>
                        Remove
                      </button>
                    </div>
                    
                    <div class="quantity-controls">
                      <button 
                        class="quantity-btn" 
                        ?disabled=${item.quantity <= 1}
                        @click=${() => this.updateQuantity(itemKey, item.quantity - 1)}>
                        -
                      </button>
                      <div class="quantity-display">${item.quantity}</div>
                      <button 
                        class="quantity-btn"
                        @click=${() => this.updateQuantity(itemKey, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                    
                    <div class="item-subtotal">
                      Subtotal: $${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                `;
              })}
            </div>
          `}
        </div>
        
        ${this.items.length > 0 ? html`
          <div class="cart-footer">
            <div class="cart-summary">
              <div class="summary-row">
                <span>Subtotal:</span>
                <span>${this.checkoutConfig.currency.symbol}${this.total.toFixed(this.checkoutConfig.currency.decimals)}</span>
              </div>
              ${(this.checkoutConfig.tax.enabled && this.checkoutConfig.tax.percentage > 0) ? html`
                <div class="summary-row">
                  <span>${this.checkoutConfig.tax.label} (${this.checkoutConfig.tax.percentage}%):</span>
                  <span>${this.checkoutConfig.currency.symbol}${tax.toFixed(this.checkoutConfig.currency.decimals)}</span>
                </div>
              ` : ''}
              <div class="summary-row total">
                <span>Total:</span>
                <span>${this.checkoutConfig.currency.symbol}${finalTotal.toFixed(this.checkoutConfig.currency.decimals)}</span>
              </div>
            </div>
            
            <div class="cart-actions">
              <button class="action-btn checkout-btn" @click=${this.proceedToCheckout}>
                <i class="bi bi-credit-card me-2"></i>
                Proceed to Checkout
              </button>
              <button class="action-btn clear-btn" @click=${this.clearCart}>
                <i class="bi bi-trash me-2"></i>
                Clear Cart
              </button>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    
    if (changedProperties.has('isOpen')) {
      if (!this.isOpen) {
        this.classList.remove('open-state');
        this.classList.add('close-state');
      } else {
        this.classList.remove('close-state');
        this.classList.add('open-state');
      }
    }
  }
}

customElements.define('shopping-cart', ShoppingCart);