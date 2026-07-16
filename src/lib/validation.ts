export const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function clean(value:FormDataEntryValue|null,max=2000){return String(value??'').replace(/[<>]/g,'').trim().slice(0,max)}
export function validateEmail(value:string){return emailPattern.test(value)}
export function validateRequired(values:Record<string,string>){return Object.entries(values).filter(([,v])=>!v.trim()).map(([k])=>k)}
