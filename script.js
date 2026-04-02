// Initialize localStorage keys
const STORAGE_KEYS = {
    CONTACT: 'portfolio_contact',
    SKILLS: 'portfolio_skills',
    EXPERIENCE: 'portfolio_experience',
    PROFILE_PICTURE: 'portfolio_profile_picture'
};

// Check if running on localhost
const isLocalhost = window.location.hostname === 'localhost' || 
                   window.location.hostname === '127.0.0.1' ||
                   window.location.hostname === '::1';

// Default data
const DEFAULT_DATA = {
    contact: {
        name: 'Your Name',
        email: 'your.email@example.com',
        phone: '(123) 456-7890',
        location: 'Your City, State'
    },
    skills: ['JavaScript', 'React', 'Node.js', 'CSS', 'HTML'],
    experience: [
        {
            title: 'Senior Developer',
            company: 'Tech Company',
            duration: 'Jan 2022 - Present',
            description: 'Lead development of web applications using modern technologies.'
        },
        {
            title: 'Junior Developer',
            company: 'Startup Inc',
            duration: 'Jun 2020 - Dec 2021',
            description: 'Contributed to various projects and learned industry best practices.'
        }
    ]
};

// Global state
let isEditMode = false;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeData();
    renderContact();
    renderSkills();
    renderExperience();
    setupEventListeners();
    updateLocalhostMessage();
    initializeEditMode();
});

// Initialize localStorage with default data if empty
function initializeData() {
    if (!localStorage.getItem(STORAGE_KEYS.CONTACT)) {
        localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(DEFAULT_DATA.contact));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SKILLS)) {
        localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(DEFAULT_DATA.skills));
    }
    if (!localStorage.getItem(STORAGE_KEYS.EXPERIENCE)) {
        localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(DEFAULT_DATA.experience));
    }
}

// Setup event listeners
function setupEventListeners() {
    const editToggle = document.getElementById('editToggle');
    editToggle.addEventListener('click', toggleEditMode);

    // Profile picture upload
    const profilePictureInput = document.getElementById('profilePictureInput');
    if (profilePictureInput) {
        profilePictureInput.addEventListener('change', handleProfilePictureChange);
    }

    // Click profile picture to upload (in edit mode)
    const profilePictureContainer = document.querySelector('.profile-picture-container');
    if (profilePictureContainer) {
        profilePictureContainer.addEventListener('click', triggerProfilePictureUpload);
    }

    // Allow Enter key to add skill
    const inputSkill = document.getElementById('inputSkill');
    if (inputSkill) {
        inputSkill.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addSkill();
            }
        });
    }
}

// Update localhost message
function updateLocalhostMessage() {
    const message = document.getElementById('localhostMessage');
    if (isLocalhost) {
        message.innerHTML = '✓ Local editing enabled';
        message.style.color = 'rgba(255, 255, 255, 0.8)';
    } else {
        message.innerHTML = '🔒 Read-only mode (not on localhost)';
        message.classList.add('localhost-warning');
    }
}

// Initialize edit mode based on localhost
function initializeEditMode() {
    const editToggle = document.getElementById('editToggle');
    if (!isLocalhost) {
        editToggle.disabled = true;
        editToggle.title = 'Edit mode is only available on localhost';
    }
}

// Toggle edit mode
function toggleEditMode() {
    if (!isLocalhost) {
        return;
    }

    isEditMode = !isEditMode;
    const editToggle = document.getElementById('editToggle');
    const editContactForm = document.getElementById('editContactForm');
    const addSkillForm = document.getElementById('addSkillForm');
    const addExperienceForm = document.getElementById('addExperienceForm');

    if (isEditMode) {
        editToggle.classList.add('active');
        editContactForm.classList.remove('hidden');
        addSkillForm.classList.remove('hidden');
        addExperienceForm.classList.remove('hidden');
        populateContactForm();
    } else {
        editToggle.classList.remove('active');
        editContactForm.classList.add('hidden');
        addSkillForm.classList.add('hidden');
        addExperienceForm.classList.add('hidden');
        clearForms();
    }
}

// CONTACT INFORMATION FUNCTIONS
function renderContact() {
    const contact = JSON.parse(localStorage.getItem(STORAGE_KEYS.CONTACT));
    document.getElementById('contactName').textContent = contact.name;
    document.getElementById('contactEmail').textContent = contact.email;
    document.getElementById('contactPhone').textContent = contact.phone;
    document.getElementById('contactLocation').textContent = contact.location;
    
    // Load profile picture
    const profilePicture = localStorage.getItem(STORAGE_KEYS.PROFILE_PICTURE);
    if (profilePicture) {
        document.getElementById('profilePicture').src = profilePicture;
    }
}

function populateContactForm() {
    const contact = JSON.parse(localStorage.getItem(STORAGE_KEYS.CONTACT));
    document.getElementById('inputContactName').value = contact.name;
    document.getElementById('inputContactEmail').value = contact.email;
    document.getElementById('inputContactPhone').value = contact.phone;
    document.getElementById('inputContactLocation').value = contact.location;
}

function saveContact() {
    const contact = {
        name: document.getElementById('inputContactName').value || 'Your Name',
        email: document.getElementById('inputContactEmail').value || 'your.email@example.com',
        phone: document.getElementById('inputContactPhone').value || '(123) 456-7890',
        location: document.getElementById('inputContactLocation').value || 'Your City, State'
    };

    localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(contact));
    renderContact();
    alert('Contact information updated!');
}

// Profile picture functions
function triggerProfilePictureUpload() {
    if (!isEditMode) return;
    document.getElementById('profilePictureInput').click();
}

function handleProfilePictureChange(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const imageData = e.target.result;
        localStorage.setItem(STORAGE_KEYS.PROFILE_PICTURE, imageData);
        document.getElementById('profilePicture').src = imageData;
        alert('Profile picture updated!');
    };
    reader.readAsDataURL(file);
}

// SKILLS FUNCTIONS
function renderSkills() {
    const skills = JSON.parse(localStorage.getItem(STORAGE_KEYS.SKILLS)) || [];
    const skillsList = document.getElementById('skillsList');

    if (skills.length === 0) {
        skillsList.innerHTML = '<p class="empty-state">No skills added yet. Click Edit Mode to add some!</p>';
        return;
    }

    skillsList.innerHTML = skills.map((skill, index) => `
        <div class="skill-tag">
            <span>${skill}</span>
            ${isEditMode ? `<button class="skill-remove" onclick="removeSkill(${index})">✕</button>` : ''}
        </div>
    `).join('');
}

function addSkill() {
    const inputSkill = document.getElementById('inputSkill');
    const skill = inputSkill.value.trim();

    if (!skill) {
        alert('Please enter a skill');
        return;
    }

    const skills = JSON.parse(localStorage.getItem(STORAGE_KEYS.SKILLS)) || [];
    if (skills.includes(skill)) {
        alert('This skill already exists');
        return;
    }

    skills.push(skill);
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
    inputSkill.value = '';
    renderSkills();
}

function removeSkill(index) {
    const skills = JSON.parse(localStorage.getItem(STORAGE_KEYS.SKILLS)) || [];
    skills.splice(index, 1);
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
    renderSkills();
}

// EXPERIENCE FUNCTIONS
function renderExperience() {
    const experience = JSON.parse(localStorage.getItem(STORAGE_KEYS.EXPERIENCE)) || [];
    const experienceList = document.getElementById('experienceList');

    if (experience.length === 0) {
        experienceList.innerHTML = '<p class="empty-state">No experience added yet. Click Edit Mode to add some!</p>';
        return;
    }

    experienceList.innerHTML = experience.map((exp, index) => `
        <div class="experience-item">
            ${isEditMode ? `<button class="experience-remove" onclick="removeExperience(${index})">Remove</button>` : ''}
            <h3>${exp.title}</h3>
            <div class="company">${exp.company}</div>
            <div class="duration">${exp.duration}</div>
            <div class="description">${exp.description}</div>
        </div>
    `).join('');
}

function addExperience() {
    const title = document.getElementById('inputJobTitle').value.trim();
    const company = document.getElementById('inputCompany').value.trim();
    const duration = document.getElementById('inputDuration').value.trim();
    const description = document.getElementById('inputDescription').value.trim();

    if (!title || !company || !duration || !description) {
        alert('Please fill in all fields');
        return;
    }

    const experience = JSON.parse(localStorage.getItem(STORAGE_KEYS.EXPERIENCE)) || [];
    experience.push({ title, company, duration, description });
    localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(experience));

    // Clear form
    document.getElementById('inputJobTitle').value = '';
    document.getElementById('inputCompany').value = '';
    document.getElementById('inputDuration').value = '';
    document.getElementById('inputDescription').value = '';

    renderExperience();
    alert('Experience added!');
}

function removeExperience(index) {
    if (confirm('Are you sure you want to remove this experience?')) {
        const experience = JSON.parse(localStorage.getItem(STORAGE_KEYS.EXPERIENCE)) || [];
        experience.splice(index, 1);
        localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(experience));
        renderExperience();
    }
}

// Clear all forms
function clearForms() {
    document.getElementById('inputSkill').value = '';
    document.getElementById('inputJobTitle').value = '';
    document.getElementById('inputCompany').value = '';
    document.getElementById('inputDuration').value = '';
    document.getElementById('inputDescription').value = '';
}

// Optional: Function to reset all data to defaults
function resetToDefaults() {
    if (confirm('Are you sure? This will reset all your portfolio data to defaults.')) {
        localStorage.removeItem(STORAGE_KEYS.CONTACT);
        localStorage.removeItem(STORAGE_KEYS.SKILLS);
        localStorage.removeItem(STORAGE_KEYS.EXPERIENCE);
        initializeData();
        renderContact();
        renderSkills();
        renderExperience();
        alert('Data reset to defaults');
    }
}
