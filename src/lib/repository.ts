import { cats as seededCats,products as seededProducts } from '../data/seed'; import type { Application,Cat,Product } from '../types';
const KEYS={cats:'wwr_cats',apps:'wwr_applications',products:'wwr_products',forms:'wwr_forms',orders:'wwr_orders'};
const read=<T>(key:string,fallback:T):T=>{try{return JSON.parse(localStorage.getItem(key)??'') as T}catch{return fallback}};
const write=<T>(key:string,value:T)=>localStorage.setItem(key,JSON.stringify(value));
export const repository={
  cats:()=>read<Cat[]>(KEYS.cats,seededCats), saveCat:(cat:Cat)=>{const list=repository.cats(); const i=list.findIndex(x=>x.id===cat.id); if(i>=0)list[i]=cat;else list.unshift(cat);write(KEYS.cats,list);return cat},
  products:()=>read<Product[]>(KEYS.products,seededProducts),
  submitApplication:(input:Omit<Application,'id'|'reference'|'status'|'createdAt'>)=>{const list=read<Application[]>(KEYS.apps,[]);const n=String(list.length+1).padStart(4,'0');const app:Application={...input,id:crypto.randomUUID(),reference:`WWR-${new Date().getFullYear()}-${n}`,status:'Submitted',createdAt:new Date().toISOString()};write(KEYS.apps,[app,...list]);return app},
  applications:()=>read<Application[]>(KEYS.apps,[]), lookupApplication:(reference:string,email:string)=>read<Application[]>(KEYS.apps,[]).find(a=>a.reference.toLowerCase()===reference.trim().toLowerCase()&&a.email.toLowerCase()===email.trim().toLowerCase()),
  updateApplication:(next:Application)=>{const list=repository.applications().map(a=>a.id===next.id?next:a);write(KEYS.apps,list)},
  submitForm:(kind:string,data:Record<string,string>)=>{const list=read<unknown[]>(KEYS.forms,[]);write(KEYS.forms,[{id:crypto.randomUUID(),kind,data,createdAt:new Date().toISOString()},...list])},
  submitOrder:(data:unknown)=>{const list=read<unknown[]>(KEYS.orders,[]);write(KEYS.orders,[{id:crypto.randomUUID(),status:'mock_pending',data,createdAt:new Date().toISOString()},...list])}
};
export const paymentAdapter={checkout:async(kind:'donation'|'store',payload:unknown)=>({mode:'mock' as const,kind,reference:`MOCK-${Date.now()}`,payload})};
export const fulfillmentAdapter={provider:'mock-print-provider',createOrder:async(payload:unknown)=>({providerId:`MOCK-PRINT-${Date.now()}`,payload})};
