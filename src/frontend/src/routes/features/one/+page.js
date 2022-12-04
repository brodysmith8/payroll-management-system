/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
    const res = await fetch(`http://localhost:3000/api/branch/highest-pay-per-employee`);
    const item = await res.json();
    
    return item;
  }