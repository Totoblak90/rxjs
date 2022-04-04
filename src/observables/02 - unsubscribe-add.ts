import { Observable, Observer } from "rxjs";

const observer: Observer<number> = {
  next: (value) => console.log("next: ", value),
  error: (error) => console.warn("error: ", error),
  complete: () => console.info("completado"),
};

const intervalo$ = new Observable<number>((subsriber) => {
  let num = 0;

  const intervalo = setInterval(() => {
    num++;
    subsriber.next(num);
    if (num === 5) {
      subsriber.complete();
    }
  }, 1000);

  //   El código que pongo enel return es lo que ejecutará el observable en el unsubscribe
  return () => {
    clearInterval(intervalo);
    console.log("Intervalo completado");
  };
});

const subs1 = intervalo$.subscribe(observer);
const subs2 = intervalo$.subscribe(observer);
const subs3 = intervalo$.subscribe(observer);

// setTimeout(() => {
//   subs1.unsubscribe();
//   subs2.unsubscribe();
//   subs3.unsubscribe();
// }, 3000);

// Unsubcribe observables en cadena

// Ver descripción de lo que hace el add
subs1.add(subs2);
subs1.add(subs3);

setTimeout(() => {
  subs1.unsubscribe();
  console.log("Timeout completado");
}, 6000);
