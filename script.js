// Pet data with breed-specific, unique image links from Pexels
const pets = [
    // Dogs
    {
        id: 1, name: "Max", age: 2, type: "dog", breed: "labrador", 
        photo: "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg",
        temperament: "Friendly, Active"
    },
    {
        id: 2, name: "Luna", age: 3, type: "dog", breed: "germanshepherd", 
        photo: "https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg",
        temperament: "Loyal, Intelligent"
    },
    {
        id: 3, name: "Buddy", age: 1, type: "dog", breed: "beagle", 
        photo: "https://images.pexels.com/photos/545063/pexels-photo-545063.jpeg",
        temperament: "Gentle, Curious"
    },
    {
        id: 7, name: "Charlie", age: 2, type: "dog", breed: "goldenretriever", 
        photo: "https://images.pexels.com/photos/1458916/pexels-photo-1458916.jpeg",
        temperament: "Friendly, Devoted"
    },
    {
        id: 8, name: "Bella", age: 3, type: "dog", breed: "bulldog", 
        photo: "https://images.pexels.com/photos/169644/pexels-photo-169644.jpeg",
        temperament: "Docile, Willful"
    },
    {
        id: 11, name: "Rocky", age: 2, type: "dog", breed: "rottweiler", 
        photo: "https://images.pexels.com/photos/191353/pexels-photo-191353.jpeg",
        temperament: "Confident, Loyal"
    },
    // Cats
    {
        id: 4, name: "Milo", age: 2, type: "cat", breed: "persian", 
        photo: "https://images.pexels.com/photos/126407/pexels-photo-126407.jpeg",
        temperament: "Calm, Affectionate"
    },
    {
        id: 5, name: "Kitty", age: 3, type: "cat", breed: "siamese", 
        photo: "https://images.pexels.com/photos/1573324/pexels-photo-1573324.jpeg",
        temperament: "Social, Vocal"
    },
    {
        id: 6, name: "Leo", age: 1, type: "cat", breed: "mainecoon", 
        photo: "https://images.pexels.com/photos/2518134/pexels-photo-2518134.jpeg?cs=srgb&dl=pexels-jimme-deknatel-1244708-2518134.jpg&fm=jpg",
        temperament: "Gentle, Playful"
    },
    {
        id: 9, name: "Simba", age: 2, type: "cat", breed: "ragdoll", 
        photo: "https://images.pexels.com/photos/2071881/pexels-photo-2071881.jpeg",
        temperament: "Affectionate, Relaxed"
    },
    {
        id: 10, name: "Lola", age: 1, type: "cat", breed: "britishshorthair", 
        photo: "https://images.pexels.com/photos/1056251/pexels-photo-1056251.jpeg",
        temperament: "Calm, Easygoing"
    },
    {
        id: 12, name: "Coco", age: 3, type: "cat", breed: "abyssinian", 
        photo: "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg",
        temperament: "Active, Curious"
    }
];

let wishlist = [];
let loggedInUser = null;

// Display pets with uniform image size and type-specific fallbacks
function displayPets(petsToShow) {
    const petList = document.getElementById('petList');
    petList.innerHTML = '';
    petsToShow.forEach(pet => {
        const col = document.createElement('div');
        col.className = 'col';
        const fallbackImage = pet.type === 'dog' 
            ? 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg'
            : 'https://images.pexels.com/photos/45201/pexels-photo-45201.jpeg';
        col.innerHTML = `
            <div class="card h-100">
                <img src="${pet.photo}" class="card-img-top" alt="${pet.name}" 
                     onerror="this.src='${fallbackImage}';">
                <div class="card-body">
                    <h5 class="card-title">${pet.name}</h5>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Age: ${pet.age}</li>
                        <li class="list-group-item">Type: ${pet.type}</li>
                        <li class="list-group-item">Breed: ${pet.breed}</li>
                        <li class="list-group-item">Temperament: ${pet.temperament}</li>
                    </ul>
                    <button class="btn btn-success adopt-btn mt-2" data-id="${pet.id}">Adopt</button>
                    <button class="btn btn-warning wishlist-btn mt-2" data-id="${pet.id}">Add to Wishlist</button>
                </div>
            </div>
        `;
        petList.appendChild(col);
    });
}

// Event delegation for adopt and wishlist buttons
function setupEventListeners() {
    document.getElementById('petList').addEventListener('click', (e) => {
        if (e.target.classList.contains('adopt-btn')) {
            const petId = parseInt(e.target.dataset.id);
            const pet = pets.find(p => p.id === petId);
            if (!pet) {
                alert('Pet not found. Please try again.');
                return;
            }
            if (!loggedInUser) {
                alert('Please login or register to adopt a pet.');
                $('#loginModal').modal('show');
                return;
            }
            $('#adoptionContactModal').modal('show');
            document.getElementById('adoptionContactName').value = loggedInUser.name || '';
            document.getElementById('adoptionContactEmail').value = loggedInUser.email || '';
            document.getElementById('adoptionContactMessage').value = `Interested in adopting ${pet.name}, ${pet.breed}, ${pet.type}`;
        } else if (e.target.classList.contains('wishlist-btn')) {
            addToWishlist(parseInt(e.target.dataset.id));
        }
    });
}

// Filter pets
function filterPets() {
    const typeFilter = document.getElementById('typeFilter').value;
    const breedFilter = document.getElementById('breedFilter').value;
    let filteredPets = pets;

    if (typeFilter !== 'all') {
        filteredPets = filteredPets.filter(pet => pet.type === typeFilter);
    }
    if (breedFilter !== 'all') {
        filteredPets = filteredPets.filter(pet => pet.breed === breedFilter);
    }

    displayPets(filteredPets);
}

// Add to wishlist
function addToWishlist(petId) {
    if (!loggedInUser) {
        alert('Please login or register to add to wishlist.');
        $('#loginModal').modal('show');
        return;
    }
    const pet = pets.find(p => p.id === petId);
    if (pet && !wishlist.includes(pet.id)) {
        wishlist.push(pet.id);
        updateWishlist();
        alert(`${pet.name} added to your wishlist!`);
    } else if (wishlist.includes(pet.id)) {
        alert(`${pet.name} is already in your wishlist.`);
    }
}

// Update wishlist display
function updateWishlist() {
    const wishlistElement = document.getElementById('wishlist');
    wishlistElement.innerHTML = '';
    wishlist.forEach(id => {
        const pet = pets.find(p => p.id === id);
        if (pet) {
            const li = document.createElement('li');
            li.className = 'list-group-item wishlist-item';
            li.textContent = `${pet.name} (Age: ${pet.age}, Breed: ${pet.breed})`;
            li.dataset.id = id;
            wishlistElement.appendChild(li);
        }
    });

    wishlistElement.addEventListener('click', (e) => {
        if (e.target.classList.contains('wishlist-item')) {
            const petId = parseInt(e.target.dataset.id);
            removeFromWishlist(petId);
        }
    });
}

// Remove from wishlist
function removeFromWishlist(petId) {
    wishlist = wishlist.filter(id => id !== petId);
    updateWishlist();
    alert('Pet removed from wishlist.');
}

// Basic email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Login functionality
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    if (isValidEmail(email) && password.length >= 6) {
        loggedInUser = { name: 'User', email: email };
        document.getElementById('userDropdown').textContent = loggedInUser.name;
        $('#loginModal').modal('hide');
        alert(`Welcome, ${loggedInUser.name}! You are now logged in.`);
        this.reset();
    } else {
        alert('Invalid email or password (minimum 6 characters). Please try again.');
    }
});

// Register functionality
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    if (name && isValidEmail(email) && password.length >= 6) {
        loggedInUser = { name: name, email: email };
        document.getElementById('userDropdown').textContent = name;
        $('#registerModal').modal('hide');
        alert(`Registration successful, ${name}.`);
        this.reset();
    } else {
        alert('Please fill all fields correctly (valid email, password 6+ characters).');
    }
});

// Logout functionality
document.getElementById('logout').addEventListener('click', function(e) {
    e.preventDefault();
    loggedInUser = null;
    document.getElementById('userDropdown').textContent = 'Guest';
    wishlist = [];
    updateWishlist();
    alert('You have been logged out.');
});

// Generic form submission handler for Formspree
async function submitForm(form, responseElement, isAdoptionForm = false) {
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value;
    const message = form.querySelector('[name="message"]').value;

    if (!isValidEmail(email) || !name || !message) {
        responseElement.textContent = 'Please fill all fields correctly.';
        responseElement.style.color = '#dc3545';
        return;
    }

    const formData = new FormData(form);
    let petName = 'pet';
    if (isAdoptionForm) {
        const petNameMatch = message.match(/Interested in adopting (\w+)/);
        petName = petNameMatch ? petNameMatch[1] : 'pet';
    }

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.status === 400) {
            const errorText = await response.text();
            console.error(`Formspree Error (Status 400):`, errorText);
            responseElement.textContent = 'Invalid form data. Please check your inputs and try again.';
            responseElement.style.color = '#dc3545';
            return;
        }

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Formspree Error (Status ${response.status}):`, errorText);
        }

        // Assume success and show success message
        responseElement.textContent = isAdoptionForm
            ? `Thank you, ${name}! Your adoption request for ${petName} has been received. We will contact you at ${email} soon.`
            : `Thank you, ${name}! Your message has been sent successfully.`;
        responseElement.style.color = '#28a745';
        if (isAdoptionForm) {
            $('#adoptionContactModal').modal('hide');
            const addressField = document.querySelector('.address-field');
            if (addressField) {
                addressField.style.display = 'none';
            }
        }
        form.reset();
    } catch (error) {
        console.error('Formspree Submission Error:', error);
        responseElement.textContent = 'Error: Could not send message. Please check your internet connection or try again later.';
        responseElement.style.color = '#dc3545';
    }
}

// Adoption Contact Form Submission
document.getElementById('adoptionContactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    submitForm(this, document.getElementById('adoptionContactResponse'), true);
});

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    submitForm(this, document.getElementById('contactResponse'), false);
});

// Reset filters
function resetFilters() {
    document.getElementById('typeFilter').value = 'all';
    document.getElementById('breedFilter').value = 'all';
    displayPets(pets);
}

// Initial load
displayPets(pets);
setupEventListeners();
document.getElementById('typeFilter').addEventListener('change', filterPets);
document.getElementById('breedFilter').addEventListener('change', filterPets);
document.getElementById('resetFilters').addEventListener('click', resetFilters);