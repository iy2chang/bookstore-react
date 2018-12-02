import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/books";

export function getBooks() {
  return http.get(apiEndpoint);
}

export function getBookById(bookId) {
  const bookUrl = apiEndpoint + "/" + bookId;
  console.log("bookUrl", bookUrl);
  return http.get(bookUrl);
}

export function addBook(book) {
  return http.post(apiEndpoint, book);
}

export function updateBook(book) {
  const bookId = book.id;
  const bookUrl = apiEndpoint + "/" + bookId;
  console.log("bookUrl", bookUrl);
  const body = { ...book };

  delete body._id;
  console.log("body", body);
  return http.put(bookUrl, body);
}

export function deleteBook(bookId) {
  const bookUrl = apiEndpoint + "/" + bookId;
  return http.delete(bookUrl);
}
