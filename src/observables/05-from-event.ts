/* Tipos de observables ya creados por RXJS
 * eventTarget(): Sirve para manejar eventos del DOM
 */

import { fromEvent } from "rxjs";

const src1 = fromEvent<MouseEvent>(document, "click");
const src2 = fromEvent<KeyboardEvent>(document, "keyup");

const observer = {
  next: (value) => console.log(value),
};
src1.subscribe(observer);

// src2.subscribe({
//   next: (event) => console.log(event.key),
// });

// Con destructuring
src2.subscribe({
  next: ({ key }) => console.log(key),
});
