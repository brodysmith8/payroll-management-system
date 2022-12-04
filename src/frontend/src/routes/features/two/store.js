import { writable, derived } from 'svelte/store';
import 'highlight.js/styles/androidstudio.css';

/* Store for data. The returned item will be an object, so we make it an object */
// export const apiData = writable();

/* Data transformation. Do whatever you need to do with the data here */
// example:
// export const drinkNames = derived(apiData, ($apiData) => {
//     if ($apiData.drinks) {
//         return $apiData.drinks.map(drink => drink.strDrink);
//     }
//     return [];
// })