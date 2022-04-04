import { Observable, Observer, Subject } from "rxjs";

const observer: Observer<any> = {
  next: (value) => console.log("next: ", value),
  error: (error) => console.warn("error: ", error),
  complete: () => console.info("completado"),
};

const intervalo$ = new Observable<any>((subscriber) => {
  const int = setInterval(() => subscriber.next(Math.random() * 100), 1000);

  return () => clearInterval(int);
});

/**
 * Características de un Subject:
 * 1 - Casteo múltiple: Puedo emitir la misma información a todos aquellos lugares donde se subscriben a este observable.
 * 2 - Es en sí mismo también un observer, esto significa que lo puedo mandar como argumento a una subscipción.
 * 3 - Puede manejar también el next, error y complete
 */

const subject$ = new Subject();
const subscription = intervalo$.subscribe(subject$);
// const subs1 = intervalo$.subscribe(observer);
// const subs2 = intervalo$.subscribe(observer);

const subs1 = subject$.subscribe(observer);
const subs2 = subject$.subscribe((res) => console.log("Subs2", res));

setTimeout(() => {
  // Al subject le puedo pasar valores desde fuera.
  subject$.next(10);
  subject$.complete();
  subscription.unsubscribe();
}, 3500);
