const cheerio = require('cheerio');

//var adresse = "https://www.relaischateaux.com/fr/destinations/europe/france";
const $ = cheerio.load('https://www.relaischateaux.com/fr/destinations/europe/france')
console.log($);
console.log("hello world");

