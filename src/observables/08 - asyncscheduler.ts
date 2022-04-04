import { asyncScheduler } from "rxjs";
/* Tipos de observables ya creados por RXJS
 * AsyncScheduler. No genera un observable, genera una subscripción.
 * Viene a reemplazar a funcionalidad de javascript del setTimeOut y del setInterval pero otorga más control.
 */

/************************************************************************************************************************************/
/*USO EL ASYNCSCHEDULER PARA EJECUTAR UNA FUNCIÓN LUEGO DE UN TIEMPO PREDETERMINADO (setTimeout(() => {}))*/
/************************************************************************************************************************************/
const time = 2000;
const sinTercerParametro = () =>
  console.log("Soy el async scheduler y me ejecuto en: " + time + "ms");
// El primer argumento que recibe es la función que queremos ejecutar y el segundo el tiempo (en milisegundos) que queremos que transcurra para
// Que se ejecute
// Cuando mande la función al primer parámetro la tengo que mandar como referencia (es decir, sin paréntesis)
asyncScheduler.schedule(sinTercerParametro, time);

const conTercerParametro = (tiempo) =>
  console.log(
    `soy el asyncScheduler y manejo el state. Me ejecuto en ${tiempo}`
  );

// Si el estado requiere más de un argumento tengo que enviar un objeto con muchas propiedades para trabajarlo
asyncScheduler.schedule(conTercerParametro, 5000, "5000ms");

/************************************************************************************************************************************/
/*USO EL ASYNSCHEDULER PARA CREAR UN INTERVALO DE TIEMPO Y EJECUTAR UNA FUNCIÓN REPETIDAS VECES (setInterval(() => {})) */
/************************************************************************************************************************************/

// PAra poder generar el intervalo es importante que el primer parametro sea una funció común. NO PUEDE SER ARROW FUNCTION
// Se le pasan los mismos valores como si fuese un schedule normal pero dentro de la función se vuelve a llamar a la misma función.
// Para finalizar el intervalo uno se debe desuscribir de la llamada.

const subscription = asyncScheduler.schedule(
  function (initialValue: number) {
    console.log("state; ", initialValue);
    this.schedule(initialValue + 1, 1000);
  },
  2000,
  0
);

// Se puede cancelar la suscripción con un set time out o volviendo a usar el asyncScheduler
// setTimeout(() => {
//   subscription.unsubscribe();
// }, 10000);

const endSuscriprtion = () => {
  subscription.unsubscribe();
};

asyncScheduler.schedule(endSuscriprtion, 10000);
