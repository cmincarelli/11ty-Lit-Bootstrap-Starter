import { LitElement, html, css } from 'lit';

class LoyaltyWidget extends LitElement {
  static properties = {
    currentPoints: { type: Number },
    targetPoints: { type: Number },
    userName: { type: String },
    level: { type: String },
    nextReward: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      font-family: inherit;
    }
    
    .loyalty-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 20px;
      padding: 2rem;
      color: white;
      position: relative;
      overflow: hidden;
      box-shadow: 0 15px 35px rgba(102, 126, 234, 0.3);
      min-height: 300px;
    }
    
    .card-pattern {
      position: absolute;
      top: -50px;
      right: -50px;
      width: 200px;
      height: 200px;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
      border-radius: 50%;
    }
    
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 2rem;
      position: relative;
    }
    
    .brand-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    
    .brand-logo {
      width: 40px;
      height: 40px;
      background: rgba(255,255,255,0.2);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }
    
    .brand-text {
      font-size: 1.1rem;
      font-weight: 600;
      opacity: 0.9;
    }
    
    .level-badge {
      background: rgba(255,255,255,0.15);
      backdrop-filter: blur(10px);
      padding: 0.5rem 1rem;
      border-radius: 15px;
      font-weight: 600;
      font-size: 0.85rem;
      border: 1px solid rgba(255,255,255,0.2);
    }
    
    .user-section {
      margin-bottom: 2rem;
      position: relative;
    }
    
    .welcome-text {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 0.25rem;
    }
    
    .user-name {
      color: #ffc107;
      font-size: 1.75rem;
      font-weight: 700;
    }
    
    .points-section {
      position: relative;
    }
    
    .points-display {
      display: flex;
      align-items: baseline;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    
    .current-points {
      font-size: 3rem;
      font-weight: bold;
      color: #ffc107;
      line-height: 1;
    }
    
    .points-label {
      font-size: 1rem;
      opacity: 0.8;
      align-self: flex-end;
      margin-bottom: 0.5rem;
    }
    
    .progress-container {
      margin-bottom: 1.5rem;
    }
    
    .progress-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
      font-size: 0.9rem;
    }
    
    .progress-bar {
      width: 100%;
      height: 8px;
      background: rgba(255,255,255,0.2);
      border-radius: 10px;
      overflow: hidden;
      position: relative;
    }
    
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #ffc107, #ff8f00);
      border-radius: 10px;
      transition: width 0.8s ease;
      position: relative;
    }
    
    .progress-fill::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      animation: shimmer 2s infinite;
    }
    
    @keyframes shimmer {
      0% { left: -100%; }
      100% { left: 100%; }
    }
    
    .reward-info {
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);
      border-radius: 15px;
      padding: 1rem;
      border: 1px solid rgba(255,255,255,0.2);
      text-align: center;
      position: relative;
    }
    
    .reward-icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
      display: block;
    }
    
    .reward-title {
      font-weight: 600;
      margin-bottom: 0.25rem;
      color: #ffc107;
    }
    
    .reward-description {
      font-size: 0.85rem;
      opacity: 0.8;
      line-height: 1.4;
    }
    
    .actions {
      display: flex;
      gap: 1rem;
      margin-top: 1.5rem;
      position: relative;
    }
    
    .action-button {
      flex: 1;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.3);
      color: white;
      padding: 0.75rem 1rem;
      border-radius: 10px;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.9rem;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }
    
    .action-button:hover {
      background: rgba(255,255,255,0.2);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }
    
    .action-button.primary {
      background: #ffc107;
      color: #2c3e50;
      border-color: #ffc107;
    }
    
    .action-button.primary:hover {
      background: #e0a800;
      box-shadow: 0 5px 15px rgba(255, 193, 7, 0.3);
    }
    
    .floating-coffee {
      position: absolute;
      bottom: 20px;
      right: 20px;
      font-size: 2rem;
      opacity: 0.1;
      animation: float 3s ease-in-out infinite;
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(5deg); }
    }
  `;

  constructor() {
    super();
    this.currentPoints = 750;
    this.targetPoints = 1000;
    this.userName = 'Developer';
    this.level = 'Gold Member';
    this.nextReward = 'Free Premium Latte';
  }

  get progressPercentage() {
    return Math.min((this.currentPoints / this.targetPoints) * 100, 100);
  }

  get pointsToNext() {
    return Math.max(this.targetPoints - this.currentPoints, 0);
  }

  addPoints() {
    this.currentPoints = Math.min(this.currentPoints + 50, this.targetPoints);
    this.requestUpdate();
    
    if (this.currentPoints >= this.targetPoints) {
      this.dispatchEvent(new CustomEvent('reward-earned', {
        detail: { reward: this.nextReward },
        bubbles: true,
        composed: true
      }));
    }
  }

  viewHistory() {
    this.dispatchEvent(new CustomEvent('view-history', {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="loyalty-card">
        <div class="card-pattern"></div>
        <div class="floating-coffee">☕</div>
        
        <div class="card-header">
          <div class="brand-info">
            <div class="brand-logo">☕</div>
            <div class="brand-text">Roast & Code</div>
          </div>
          <div class="level-badge">${this.level}</div>
        </div>
        
        <div class="user-section">
          <div class="welcome-text">Welcome back,</div>
          <div class="user-name">${this.userName}!</div>
        </div>
        
        <div class="points-section">
          <div class="points-display">
            <div class="current-points">${this.currentPoints}</div>
            <div class="points-label">points</div>
          </div>
          
          <div class="progress-container">
            <div class="progress-info">
              <span>Progress to next reward</span>
              <span>${this.pointsToNext} points to go</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${this.progressPercentage}%"></div>
            </div>
          </div>
          
          <div class="reward-info">
            <span class="reward-icon">🎁</span>
            <div class="reward-title">Next Reward</div>
            <div class="reward-description">${this.nextReward}</div>
          </div>
        </div>
        
        <div class="actions">
          <button class="action-button" @click=${this.viewHistory}>
            📊 History
          </button>
          <button class="action-button primary" @click=${this.addPoints}>
            ➕ Earn Points
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('loyalty-widget', LoyaltyWidget);