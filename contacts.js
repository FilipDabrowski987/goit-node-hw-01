const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

async function listContacts() {
    try {const data = await fs.readFile(contactsPath, 'utf8');
        return JSON.parse(data);
        
    } catch (error) {
        
    }


const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);


}

function getContactById(contactId) {
  // ...twój kod
}

function removeContact(contactId) {
  // ...twój kod
}

function addContact(name, email, phone) {
  // ...twój kod
}