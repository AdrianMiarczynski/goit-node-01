import { nanoid } from "nanoid";
import fs from "node:fs/promises";
import path from "node:path";

export const contactsPath = path.resolve("db", "contacts.json");

// TODO: udokumentuj każdą funkcję
// pobieranie listy kontaktów
export const listContacts = async () => {
  const response = await fs.readFile(contactsPath);
  const parseResponse = JSON.parse(response);
  return parseResponse;
  // ...twój kod
};

// pobieranie kontaktu z wskazanym id
export const getContactById = async (contactId) => {
  const contactsList = await listContacts();
  const response = contactsList.find((contact) => contact.id === contactId);
  return response || null;
  // ...twój kod
};

// usuwanie kontaktu o podanym Id z lisy kontaktów
export const removeContact = async (contactId) => {
  const contactsList = await listContacts();
  const response = contactsList.findIndex((contac) => contac.id === contactId);
  if (response === -1) {
    return null;
  }
  const data = contactsList.splice(response, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 1));
  return data;
  // ...twój kod
};

// dodawanie kontaktu do listy kontaktów
export const addContact = async ({ name, email, phone }) => {
  const contactsList = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contactsList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 1));
  // ...twój kod
};
