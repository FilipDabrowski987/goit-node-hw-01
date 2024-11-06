const { listContacts, getContactById, removeContact, addContact } = require('./contacts');
const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await getContactById(id);
      if (contact) {
        console.log("Znaleziony kontakt:", contact);
      } else {
        console.log(`Kontakt o ID ${id} nie został znaleziony`);
      }
      break;

    case "add":
      await addContact(name, email, phone);
      console.log(`Dodano nowy kontakt: ${name}`);
      break;

    case "remove":
      await removeContact(id);
      console.log(`Kontakt o ID ${id} został usunięty`);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);