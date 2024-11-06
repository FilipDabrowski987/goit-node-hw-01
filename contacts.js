const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath);
        return JSON.parse(data);
        
    } catch (error) {
        console.error('Wystąpił bład podczas odczytu pliku', error);
        return [];
    }
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    return contacts.find(contact => contact.id === contactId) || null;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter(contact => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    console.log(`Kontakt o ID ${contactId} został usunięty`);
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
        id: uuidv4(),
        name,
        email,
        phone
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log(`Dodano nowy kontakt: ${name}`);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};