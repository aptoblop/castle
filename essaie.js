//import { request } from 'https';

//import { SSL_OP_TLS_BLOCK_PADDING_BUG } from 'constants';

/*var request=require("request");
const cheerio = require('cheerio');
const parse5=require('parse5');
const jsdom=require('jsdom');
const rp=require('request-promise');
var listFrance;
//https://www.relaischateaux.com/fr/site-map/etablissements;

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
*/

var request=require("request");
var path=require('path');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const cheerioAdv = require('cheerio-advanced-selectors');
const fs = require('fs');


const adresse = 'https://www.relaischateaux.com/fr/site-map/etablissements';

/*let $ = cheerio.load(adresse);
let blop = cheerioAdv.find($,'#countryF').text();
console.log(blop);
*/

request(adresse,function(err,resp,body){
    
    let tab=[];
var $= cheerio.load(body);
let blop = cheerioAdv.find($,'#countryF');
tab.push(blop);
//console.log(tab[0]);

//let blop3=$('#countryF').find('h3:last').text();
//console.log(blop3);

//let blop2=cheerioAdv.find(blop,)

/*
var html2json = require('html2json').html2json;
var json = html2json(blop);

console.log(json);
console.log(json.length);

for(var i; i<json.length;i+=1){
    console.log();
}*/
//console.log(blop[1]['type']);

});
//const chief_selector = 'div.node_poi-chef div.node_poi_description div.field:eq(0) div.even';
