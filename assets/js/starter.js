// Importing JavaScript
//
// You have two choices for including Bootstrap's JS files—the whole thing,
// or just the bits that you need.


// Option 1
//
// Import Bootstrap's bundle (all of Bootstrap's JS + Popper.js dependency)

// import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";


// Option 2
//
// Import just what we need

// If you're importing tooltips or popovers, be sure to include our Popper.js dependency
// import "../../node_modules/popper.js/dist/popper.min.js";

import "../../node_modules/bootstrap/js/dist/util.js";
import "../../node_modules/bootstrap/js/dist/modal.js";

const contactForm = document.querySelector('form[name="contact"]');
const contactSuccess = document.querySelector('#contact-success');

if (contactForm && contactSuccess) {
	contactForm.addEventListener('submit', async (event) => {
		event.preventDefault();

		const submitButton = contactForm.querySelector('button[type="submit"]');
		submitButton.disabled = true;
		submitButton.textContent = 'Sending...';

		try {
			const response = await fetch('/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: new URLSearchParams(new FormData(contactForm)).toString()
			});

			if (!response.ok) {
				throw new Error('Form submission failed');
			}

			contactForm.classList.add('d-none');
			contactSuccess.classList.remove('d-none');
			contactSuccess.classList.add('contact-success-visible');
			contactSuccess.focus();
		} catch (error) {
			submitButton.disabled = false;
			submitButton.textContent = 'Send message';
			submitButton.insertAdjacentHTML('afterend', '<small class="form-text text-danger" role="alert">Unable to send your message. Please try again.</small>');
		}
	});
}
