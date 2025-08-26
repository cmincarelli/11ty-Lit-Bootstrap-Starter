import { LitElement, html, css } from 'lit';

class StoreLocator extends LitElement {
  static properties = {
    selectedStore: { type: Object },
    stores: { type: Array },
    currentTime: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      font-family: inherit;
    }
    
    .locator-container {
      background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
      border-radius: 16px;
      padding: 2rem;
      color: white;
      position: relative;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(17, 153, 142, 0.3);
    }
    
    .background-pattern {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.1;
      background-image: radial-gradient(circle at 20% 20%, rgba(255,255,255,0.2) 0%, transparent 50%),
                        radial-gradient(circle at 80% 80%, rgba(255,255,255,0.2) 0%, transparent 50%);
    }
    
    .header {
      text-align: center;
      margin-bottom: 2rem;
      position: relative;
    }
    
    .header-icon {
      font-size: 3rem;
      margin-bottom: 0.5rem;
      display: block;
    }
    
    .header-title {
      font-size: 1.75rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
    
    .header-subtitle {
      opacity: 0.9;
      font-size: 1rem;
    }
    
    .store-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
      position: relative;
    }
    
    .store-card {
      background: rgba(255,255,255,0.15);
      backdrop-filter: blur(10px);
      border-radius: 12px;
      padding: 1.5rem;
      border: 1px solid rgba(255,255,255,0.2);
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
    }
    
    .store-card:hover {
      transform: translateY(-3px);
      background: rgba(255,255,255,0.2);
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    }
    
    .store-card.selected {
      background: rgba(255,255,255,0.25);
      border-color: rgba(255,255,255,0.4);
      box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    }
    
    .store-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }
    
    .store-name {
      font-size: 1.1rem;
      font-weight: bold;
      margin-bottom: 0.25rem;
    }
    
    .store-type {
      font-size: 0.8rem;
      opacity: 0.8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .distance-badge {
      background: rgba(255,255,255,0.2);
      padding: 0.25rem 0.75rem;
      border-radius: 15px;
      font-size: 0.75rem;
      font-weight: 600;
      white-space: nowrap;
    }
    
    .store-address {
      font-size: 0.9rem;
      line-height: 1.4;
      margin-bottom: 1rem;
      opacity: 0.9;
    }
    
    .store-features {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    
    .feature {
      background: rgba(255,255,255,0.2);
      padding: 0.2rem 0.6rem;
      border-radius: 12px;
      font-size: 0.7rem;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
    
    .store-hours {
      font-size: 0.85rem;
      opacity: 0.9;
    }
    
    .status-open {
      color: #4ade80;
      font-weight: 600;
    }
    
    .status-closed {
      color: #fbbf24;
      font-weight: 600;
    }
    
    .selected-store-detail {
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);
      border-radius: 12px;
      padding: 1.5rem;
      border: 1px solid rgba(255,255,255,0.2);
      position: relative;
    }
    
    .detail-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .detail-title {
      font-size: 1.3rem;
      font-weight: bold;
    }
    
    .detail-actions {
      display: flex;
      gap: 0.75rem;
    }
    
    .action-btn {
      background: rgba(255,255,255,0.2);
      border: 1px solid rgba(255,255,255,0.3);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.85rem;
      font-weight: 500;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .action-btn:hover {
      background: rgba(255,255,255,0.3);
      transform: scale(1.05);
    }
    
    .detail-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }
    
    .detail-section {
      display: flex;
      flex-direction: column;
    }
    
    .detail-section h4 {
      margin: 0 0 1rem 0;
      font-size: 1rem;
      font-weight: 600;
      opacity: 0.9;
    }
    
    .hours-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .hours-list li {
      display: flex;
      justify-content: space-between;
      padding: 0.25rem 0;
      font-size: 0.9rem;
      opacity: 0.9;
    }
    
    .hours-list li.today {
      font-weight: bold;
      color: #fbbf24;
    }
    
    .amenities-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5rem;
    }
    
    .amenity {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.85rem;
      opacity: 0.9;
    }
    
    @media (max-width: 768px) {
      .detail-grid {
        grid-template-columns: 1fr;
      }
      
      .store-grid {
        grid-template-columns: 1fr;
      }
    }
  `;

  constructor() {
    super();
    this.currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    this.stores = [
      {
        id: 1,
        name: 'Downtown Tech Hub',
        type: 'Flagship Store',
        address: '123 Developer Street\nTech District, TC 90210',
        distance: '0.3 miles',
        hours: {
          'Monday': '6:00 AM - 11:00 PM',
          'Tuesday': '6:00 AM - 11:00 PM', 
          'Wednesday': '6:00 AM - 11:00 PM',
          'Thursday': '6:00 AM - 11:00 PM',
          'Friday': '6:00 AM - 12:00 AM',
          'Saturday': '7:00 AM - 12:00 AM',
          'Sunday': '7:00 AM - 10:00 PM'
        },
        features: ['📶 Free WiFi', '🖥️ 4K Monitors', '🔌 Power Outlets', '🤫 Quiet Zone'],
        amenities: ['Meeting Rooms', 'Phone Booths', 'Printing Station', '24/7 Access Code', 'Bike Parking', 'Outdoor Seating'],
        isOpen: true,
        phone: '(555) DEV-JAVA'
      },
      {
        id: 2,
        name: 'University Campus',
        type: 'Study Location',
        address: '456 Campus Drive\nUniversity District, TC 90211',
        distance: '1.2 miles',
        hours: {
          'Monday': '6:30 AM - 10:00 PM',
          'Tuesday': '6:30 AM - 10:00 PM',
          'Wednesday': '6:30 AM - 10:00 PM', 
          'Thursday': '6:30 AM - 10:00 PM',
          'Friday': '6:30 AM - 11:00 PM',
          'Saturday': '8:00 AM - 11:00 PM',
          'Sunday': '8:00 AM - 9:00 PM'
        },
        features: ['📚 Study Areas', '👥 Group Tables', '📶 Free WiFi', '🖨️ Printing'],
        amenities: ['Student Discounts', 'Extended Hours', 'Group Study Rooms', 'Presentation Screens', 'Library Partnership'],
        isOpen: true,
        phone: '(555) UNI-CODE'
      },
      {
        id: 3,
        name: 'Startup Incubator',
        type: 'Co-working Space',
        address: '789 Innovation Ave\nStartup Quarter, TC 90212',
        distance: '2.1 miles',
        hours: {
          'Monday': '7:00 AM - 9:00 PM',
          'Tuesday': '7:00 AM - 9:00 PM',
          'Wednesday': '7:00 AM - 9:00 PM',
          'Thursday': '7:00 AM - 9:00 PM',
          'Friday': '7:00 AM - 8:00 PM',
          'Saturday': '8:00 AM - 6:00 PM',
          'Sunday': 'Closed'
        },
        features: ['💼 Meeting Rooms', '📞 Phone Booths', '📶 Enterprise WiFi', '☁️ Cloud Access'],
        amenities: ['Venture Capital Events', 'Pitch Practice Rooms', 'Whiteboard Walls', 'Coffee Subscriptions', 'Networking Events'],
        isOpen: false,
        phone: '(555) NEW-TECH'
      }
    ];
    this.selectedStore = this.stores[0];
  }

  selectStore(store) {
    this.selectedStore = store;
    this.requestUpdate();
  }

  getDirections(store) {
    this.dispatchEvent(new CustomEvent('get-directions', {
      detail: { store },
      bubbles: true,
      composed: true
    }));
  }

  callStore(store) {
    window.open(`tel:${store.phone}`);
  }

  render() {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    
    return html`
      <div class="locator-container">
        <div class="background-pattern"></div>
        
        <div class="header">
          <span class="header-icon">📍</span>
          <div class="header-title">Find Your Coding Sanctuary</div>
          <div class="header-subtitle">Choose from our developer-friendly locations</div>
        </div>
        
        <div class="store-grid">
          ${this.stores.map(store => html`
            <div class="store-card ${store.id === this.selectedStore.id ? 'selected' : ''}" 
                 @click=${() => this.selectStore(store)}>
              <div class="store-header">
                <div>
                  <div class="store-name">${store.name}</div>
                  <div class="store-type">${store.type}</div>
                </div>
                <div class="distance-badge">${store.distance}</div>
              </div>
              
              <div class="store-address">${store.address.replace('\n', '<br>')}</div>
              
              <div class="store-features">
                ${store.features.map(feature => html`
                  <span class="feature">${feature}</span>
                `)}
              </div>
              
              <div class="store-hours">
                <span class="${store.isOpen ? 'status-open' : 'status-closed'}">
                  ${store.isOpen ? '🟢 Open' : '🔴 Closed'}
                </span>
                • ${store.hours[today] || 'Hours vary'}
              </div>
            </div>
          `)}
        </div>
        
        ${this.selectedStore ? html`
          <div class="selected-store-detail">
            <div class="detail-header">
              <div class="detail-title">📍 ${this.selectedStore.name}</div>
              <div class="detail-actions">
                <button class="action-btn" @click=${() => this.getDirections(this.selectedStore)}>
                  🗺️ Directions
                </button>
                <button class="action-btn" @click=${() => this.callStore(this.selectedStore)}>
                  📞 Call
                </button>
              </div>
            </div>
            
            <div class="detail-grid">
              <div class="detail-section">
                <h4>📅 Hours</h4>
                <ul class="hours-list">
                  ${Object.entries(this.selectedStore.hours).map(([day, hours]) => html`
                    <li class="${day === today ? 'today' : ''}">
                      <span>${day}</span>
                      <span>${hours}</span>
                    </li>
                  `)}
                </ul>
              </div>
              
              <div class="detail-section">
                <h4>🏢 Amenities</h4>
                <div class="amenities-grid">
                  ${this.selectedStore.amenities.map(amenity => html`
                    <div class="amenity">
                      <span>✓</span>
                      <span>${amenity}</span>
                    </div>
                  `)}
                </div>
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }
}

customElements.define('store-locator', StoreLocator);