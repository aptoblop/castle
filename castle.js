var request=require("request");
const cheerio = require('cheerio');
const parse5=require('parse5');
const jsdom=require('jsdom');
const rp=require('request-promise');
var listFrance;

//var adresse = "https://www.relaischateaux.com/fr/destinations/europe/france";
rp('https://www.relaischateaux.com/fr/destinations/europe/france').then((html) => {

    var fourChildren=cheerio('#countryF',html).children()

    fourChildren.find('h3').each(function(i,elem){
        if(cheerio(this).text()=="France"){
            listFrance=cheerio(this).next();
        }
    })

    

})
//const $ = cheerio.load('https://www.relaischateaux.com/fr/destinations/europe/france');
//console.log($)
//console.log("hello world");
console.log(listFrance)

