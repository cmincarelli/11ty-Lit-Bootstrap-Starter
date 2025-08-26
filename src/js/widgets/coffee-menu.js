import { LitElement, html, css } from 'lit';

class CoffeeMenu extends LitElement {
  static properties = {
    selectedCategory: { type: String },
    menuItems: { type: Array }
  };

  static styles = css`
    :host {
      display: block;
      font-family: inherit;
    }
    
    .menu-container {
      background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
      border-radius: 16px;
      padding: 2rem;
      color: white;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    
    .menu-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .menu-title {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
      background: linear-gradient(45deg, #ffc107, #17a2b8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .category-tabs {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }
    
    .category-tab {
      background: transparent;
      border: 2px solid #ffc107;
      color: #ffc107;
      padding: 0.75rem 1.5rem;
      border-radius: 25px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
      font-size: 0.9rem;
    }
    
    .category-tab:hover {
      background: rgba(255, 193, 7, 0.1);
      transform: translateY(-2px);
    }
    
    .category-tab.active {
      background: #ffc107;
      color: #2c3e50;
      box-shadow: 0 4px 15px rgba(255, 193, 7, 0.3);
    }
    
    .menu-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    
    .menu-item {
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);
      border-radius: 12px;
      padding: 1.5rem;
      border: 1px solid rgba(255,255,255,0.1);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .menu-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 3px;
      background: linear-gradient(90deg, #ffc107, #17a2b8);
      transition: left 0.3s ease;
    }
    
    .menu-item:hover {
      transform: translateY(-5px);
      background: rgba(255,255,255,0.15);
      box-shadow: 0 15px 40px rgba(0,0,0,0.2);
    }
    
    .menu-item:hover::before {
      left: 0;
    }
    
    .item-header {
      display: flex;
      justify-content: between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }
    
    .item-info {
      flex: 1;
    }
    
    .item-name {
      font-size: 1.25rem;
      font-weight: bold;
      margin-bottom: 0.25rem;
      color: #ffc107;
    }
    
    .item-type {
      color: #17a2b8;
      font-size: 0.85rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .item-price {
      font-size: 1.5rem;
      font-weight: bold;
      color: #28a745;
      margin-left: 1rem;
    }
    
    .item-description {
      color: rgba(255,255,255,0.8);
      line-height: 1.5;
      margin-bottom: 1rem;
      font-size: 0.9rem;
    }
    
    .item-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    
    .tag {
      background: rgba(255, 193, 7, 0.2);
      color: #ffc107;
      padding: 0.25rem 0.75rem;
      border-radius: 15px;
      font-size: 0.75rem;
      font-weight: 500;
    }
    
    .item-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .popularity {
      display: flex;
      align-items: center;
      color: rgba(255,255,255,0.6);
      font-size: 0.8rem;
    }
    
    .stars {
      color: #ffc107;
      margin-right: 0.5rem;
    }
    
    .add-button {
      background: linear-gradient(45deg, #ffc107, #ff8f00);
      border: none;
      color: #2c3e50;
      padding: 0.5rem 1.25rem;
      border-radius: 20px;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.85rem;
      transition: all 0.3s ease;
    }
    
    .add-button:hover {
      transform: scale(1.05);
      box-shadow: 0 5px 15px rgba(255, 193, 7, 0.4);
    }
  `;

  constructor() {
    super();
    this.selectedCategory = 'espresso';
    this.menuItems = [
      {
        id: 1,
        name: 'The Debugger',
        category: 'espresso',
        type: 'Double Shot',
        price: 4.99,
        description: 'Double shot espresso with Madagascar vanilla. Perfect for late-night debugging sessions.',
        tags: ['High Caffeine', 'Focus Boost', 'Popular'],
        rating: 4.8,
        popularity: '★★★★★'
      },
      {
        id: 2,
        name: 'Code Review Cortado',
        category: 'espresso',
        type: 'Milk Coffee',
        price: 4.49,
        description: 'Smooth cortado with steamed milk. Ideal for focused code review sessions.',
        tags: ['Smooth', 'Balanced', 'Creamy'],
        rating: 4.6,
        popularity: '★★★★☆'
      },
      {
        id: 3,
        name: 'The Deployment',
        category: 'cold',
        type: 'Cold Brew',
        price: 5.49,
        description: 'Cold brew with caramel syrup and oat milk. Refreshing like a successful production deploy.',
        tags: ['Cold Brew', 'Oat Milk', 'Caramel'],
        rating: 4.7,
        popularity: '★★★★★'
      },
      {
        id: 4,
        name: 'Async Iced Coffee',
        category: 'cold',
        type: 'Iced Coffee',
        price: 3.99,
        description: 'Cold-drip coffee over ice with a hint of vanilla. Non-blocking refreshment.',
        tags: ['Iced', 'Vanilla', 'Light'],
        rating: 4.4,
        popularity: '★★★★☆'
      },
      {
        id: 5,
        name: 'Git Merge Mocha',
        category: 'specialty',
        type: 'Chocolate Coffee',
        price: 5.99,
        description: 'Espresso merged with dark chocolate and steamed milk. Complex flavor profile, no conflicts.',
        tags: ['Chocolate', 'Rich', 'Indulgent'],
        rating: 4.9,
        popularity: '★★★★★'
      },
      {
        id: 6,
        name: 'Stack Overflow Latte',
        category: 'specialty',
        type: 'Flavored Latte',
        price: 5.29,
        description: 'Caramel macchiato with extra foam. When you need help, this delivers answers.',
        tags: ['Caramel', 'Sweet', 'Foam Art'],
        rating: 4.5,
        popularity: '★★★★☆'
      }
    ];
  }

  get filteredItems() {
    return this.menuItems.filter(item => item.category === this.selectedCategory);
  }

  selectCategory(category) {
    this.selectedCategory = category;
    this.requestUpdate();
  }

  addToCart(item) {
    this.dispatchEvent(new CustomEvent('add-to-cart', {
      detail: { item },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const categories = [
      { id: 'espresso', name: 'Espresso', icon: '☕' },
      { id: 'cold', name: 'Cold Brew', icon: '🧊' },
      { id: 'specialty', name: 'Specialty', icon: '✨' }
    ];

    return html`
      <div class="menu-container">
        <div class="menu-header">
          <div class="menu-title">☕ Developer's Menu</div>
          <p style="color: rgba(255,255,255,0.7); margin: 0;">Fuel your code with premium brews</p>
        </div>
        
        <div class="category-tabs">
          ${categories.map(category => html`
            <button 
              class="category-tab ${this.selectedCategory === category.id ? 'active' : ''}"
              @click=${() => this.selectCategory(category.id)}>
              ${category.icon} ${category.name}
            </button>
          `)}
        </div>
        
        <div class="menu-grid">
          ${this.filteredItems.map(item => html`
            <div class="menu-item">
              <div class="item-header">
                <div class="item-info">
                  <div class="item-name">${item.name}</div>
                  <div class="item-type">${item.type}</div>
                </div>
                <div class="item-price">$${item.price}</div>
              </div>
              
              <div class="item-description">${item.description}</div>
              
              <div class="item-tags">
                ${item.tags.map(tag => html`<span class="tag">${tag}</span>`)}
              </div>
              
              <div class="item-actions">
                <div class="popularity">
                  <span class="stars">${item.popularity}</span>
                  ${item.rating}
                </div>
                <button class="add-button" @click=${() => this.addToCart(item)}>
                  Add to Cart
                </button>
              </div>
            </div>
          `)}
        </div>
      </div>
    `;
  }
}

customElements.define('coffee-menu', CoffeeMenu);