import { Command } from "commander";
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
} from "./contacts.js";

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contactsList = await listContacts();
      console.log(`${new Date().toLocaleDateString()}`);
      console.table(contactsList);
      break;

    case "get":
      const contactId = await getContactById(id);
      console.log(`${new Date().toLocaleDateString()} ${id}`);
      console.table(contactId);
      break;

    case "add":
      const newContact = await addContact({ name, email, phone });
      console.log(`${new Date().toLocaleDateString()} ${(name, email, phone)}`);
      console.table(newContact);
      break;

    case "remove":
      const delateContact = await removeContact(id);
      console.log(`${new Date().toLocaleDateString()} ${id}`);
      console.table(delateContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
