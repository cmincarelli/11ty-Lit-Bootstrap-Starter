// Import Bootstrap JS (tree-shakeable!)
import { Modal, Dropdown, Collapse, Tooltip, Popover } from 'bootstrap';


// Initialize Bootstrap components
document.addEventListener('DOMContentLoaded', function() {
  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new Tooltip(tooltipTriggerEl, {
        placement: tooltipTriggerEl.getAttribute('data-bs-placement') || 'top'
    });
  });

  // Initialize popovers
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  popoverTriggerList.map(function (popoverTriggerEl) {
    return new Popover(popoverTriggerEl, {
        placement: popoverTriggerEl.getAttribute('data-bs-placement') || 'top',
        title: popoverTriggerEl.getAttribute('data-bs-title') || '',
        content: popoverTriggerEl.getAttribute('data-bs-content') || '',
        trigger: popoverTriggerEl.getAttribute('data-bs-trigger') || 'hover',
        delay: popoverTriggerEl.getAttribute('data-bs-delay') || 0,
    });
  });

  // Initialize cart badge on page load
  // Check if there's existing cart data
  try {
    const savedCart = localStorage.getItem('roastcode_cart');
    if (savedCart) {
      const cartData = JSON.parse(savedCart);
      const itemCount = cartData.itemCount || 0;
      
      const badge = document.getElementById('cart-badge');
      if (itemCount > 0) {
        badge.textContent = itemCount;
        badge.style.display = 'block';
      }
    }
  } catch (error) {
    console.warn('Failed to load cart badge data:', error);
  }
});

// Cart badge update functionality
document.addEventListener('cart-updated', (e) => {
  const badge = document.getElementById('cart-badge');
  const { itemCount } = e.detail;
  
  if (itemCount > 0) {
    badge.textContent = itemCount;
    badge.style.display = 'block';
  } else {
    badge.style.display = 'none';
  }
});
  