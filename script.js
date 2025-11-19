/* Book Haven Bookstore JavaScript with Web Storage */

// ========== SHOPPING CART USING SESSIONSTORAGE ==========

// Function to get cart from sessionStorage
function getCart() {
    const cartData = sessionStorage.getItem('shoppingCart');
    return cartData ? JSON.parse(cartData) : [];
}

// Function to save cart to sessionStorage
function saveCart(cart) {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
}

// Function to add item to cart
function addToCart(productName) {
    // Get current cart from sessionStorage
    let shoppingCart = getCart();
    
    // Add product to cart array
    shoppingCart.push(productName);
    
    // Save updated cart to sessionStorage
    saveCart(shoppingCart);
    
    // Show alert
    alert('Item added to the cart');
}

// Function to view cart (display modal)
function viewCart() {
    // Get cart from sessionStorage
    const shoppingCart = getCart();
    
    // Check if modal already exists, if so remove it
    const existingModal = document.getElementById('cartModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'cartModal';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background-color: #FFF7EE;
        padding: 30px;
        border-radius: 10px;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    `;
    
    // Create modal header
    const modalHeader = document.createElement('h2');
    modalHeader.textContent = 'Shopping Cart';
    modalHeader.style.cssText = `
        color: #2E4057;
        margin-bottom: 20px;
        border-bottom: 2px solid #C7B65E;
        padding-bottom: 10px;
    `;
    
    // Create cart items list
    const cartList = document.createElement('div');
    cartList.style.cssText = `
        margin: 20px 0;
        min-height: 100px;
        max-height: 300px;
        overflow-y: auto;
    `;
    
    if (shoppingCart.length === 0) {
        cartList.innerHTML = '<p style="color: #131C26; font-style: italic;">Your cart is empty</p>';
    } else {
        const itemsList = document.createElement('ul');
        itemsList.style.cssText = `
            list-style: none;
            padding: 0;
        `;
        
        shoppingCart.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.style.cssText = `
                padding: 10px;
                margin: 5px 0;
                background-color: #F7B3CC;
                border-radius: 5px;
                color: #131C26;
            `;
            listItem.textContent = `${index + 1}. ${item}`;
            itemsList.appendChild(listItem);
        });
        
        cartList.appendChild(itemsList);
    }
    
    // Create button container
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = `
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        gap: 10px;
    `;
    
    // Create Clear Cart button
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear Cart';
    clearButton.style.cssText = `
        background-color: #EE583F;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
    `;
    clearButton.onclick = function() {
        clearCart();
        modalOverlay.remove();
    };
    
    // Create Process Order button
    const processButton = document.createElement('button');
    processButton.textContent = 'Process Order';
    processButton.style.cssText = `
        background-color: #2E4057;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
    `;
    processButton.onclick = function() {
        processOrder();
        modalOverlay.remove();
    };
    
    // Create Close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.cssText = `
        background-color: #C7B65E;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
    `;
    closeButton.onclick = function() {
        modalOverlay.remove();
    };
    
    // Assemble modal
    buttonContainer.appendChild(clearButton);
    buttonContainer.appendChild(processButton);
    buttonContainer.appendChild(closeButton);
    
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(cartList);
    modalContent.appendChild(buttonContainer);
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Click outside modal to close
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            modalOverlay.remove();
        }
    });
}

// Function to clear cart
function clearCart() {
    const shoppingCart = getCart();
    
    if (shoppingCart.length === 0) {
        alert('No items to clear');
    } else {
        // Clear sessionStorage
        sessionStorage.removeItem('shoppingCart');
        alert('Cart cleared');
    }
}

// Function to process order
function processOrder() {
    const shoppingCart = getCart();
    
    if (shoppingCart.length === 0) {
        alert('Cart is empty');
    } else {
        alert('Thank you for your order');
        // Clear sessionStorage after processing order
        sessionStorage.removeItem('shoppingCart');
    }
}

// ========== NEWSLETTER SUBSCRIPTION (ALL PAGES) ==========

// Function to handle newsletter subscription
function handleNewsletterSubscription(event) {
    event.preventDefault(); // Prevent form from actually submitting
    
    const emailInput = event.target.querySelector('input[type="email"]');
    const emailValue = emailInput.value.trim();
    
    // Validate email input
    if (emailValue === '') {
        alert('Please enter an email address');
        return false;
    }
    
    // Check for valid email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailValue)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    // Show success message
    alert('Thank you for subscribing');
    
    // Clear the input field
    emailInput.value = '';
    
    return false;
}

// ========== ABOUT US PAGE - CONTACT FORM WITH LOCALSTORAGE ==========

// Function to handle contact form submission
function handleContactFormSubmission(event) {
    event.preventDefault(); // Prevent form from actually submitting
    
    // Get form field values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validate required fields
    if (name === '') {
        alert('Please enter your name');
        return false;
    }
    
    if (email === '') {
        alert('Please enter your email address');
        return false;
    }
    
    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    if (message === '') {
        alert('Please enter a message');
        return false;
    }
    
    // Create customer order object
    const customerOrder = {
        name: name,
        email: email,
        phone: phone,
        message: message,
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    // Get existing orders or create new array
    let orders = localStorage.getItem('customerOrders');
    let ordersArray = orders ? JSON.parse(orders) : [];
    
    // Add new order
    ordersArray.push(customerOrder);
    
    // Save back to localStorage
    localStorage.setItem('customerOrders', JSON.stringify(ordersArray));
    
    // Also save the most recent order separately for easy access
    localStorage.setItem('lastCustomerOrder', JSON.stringify(customerOrder));
    
    // Show success message
    alert('Thank you for your message');
    
    // Clear the form
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('message').value = '';
    
    return false;
}

// ========== EVENT LISTENERS ==========

// Add event listeners when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // Newsletter subscription in footer (all pages)
    const newsletterForms = document.querySelectorAll('footer form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', handleNewsletterSubscription);
    });
    
    // Gallery page - Shopping Cart functionality
    if (document.querySelector('table')) {
        // Get all "Add to Cart" buttons in the table
        const addToCartButtons = document.querySelectorAll('table button');
        
        addToCartButtons.forEach(button => {
            // Check if button text is "Add to Cart"
            if (button.textContent.trim() === 'Add to Cart') {
                button.addEventListener('click', function() {
                    // Get the product name from the h3 in the same td
                    const productCell = this.closest('td');
                    const productName = productCell.querySelector('h3').textContent;
                    addToCart(productName);
                });
            }
        });
        
        // Add event listener to "View Cart" button in header
        const viewCartButton = document.querySelector('header button');
        if (viewCartButton) {
            viewCartButton.addEventListener('click', viewCart);
        }
    }
    
    // About Us page - Contact Form
    const contactForms = document.querySelectorAll('main form');
    contactForms.forEach(form => {
        // Check if this form has the name, email, phone, message fields
        if (form.querySelector('#name') && form.querySelector('#message')) {
            form.addEventListener('submit', handleContactFormSubmission);
        }
    });
});