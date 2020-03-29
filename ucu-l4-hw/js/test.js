
const nm = "+380(98) 23 96 914";

let cleaned = ('' + nm).replace(/\D/g, '');

console.log(cleaned)

let match = cleaned.match(/^(\d{3})(\d{2})(\d{2})(\d{2})(\d{3})$/);

let final = '+' + match[1] + '(' + match[2] + ')' + ' ' + match[3] + ' ' + match[4] + ' ' + match[5];

console.log(final);
