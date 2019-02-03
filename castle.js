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

async function scrapeCard(link) {
    console.log(link);
    let raw_data = await fetch(link);
    let data = await raw_data.text();
    let $ = cheerio.load(data);
    let card = getAttribs($);
    return await card;
}


async function scrapePage(url) {
    //console.log("blop");
    //console.log(url);

    let raw_data = await fetch(url);
    let data = await raw_data.text();
    let $ = cheerio.load(data);

    let cards_url = cheerioAdv.find($, '#countryF')[1]; //get france and not fidji
    
    let card_url = cards_url['children']; //get children of this div 

    console.log(card_url.length);
    console.log(card_url);
    for(var i=0;i<card_url.length;i+=1){
        console.log(card_url[i]);
    }

    for(key in card_url[3]){
        console.log()
    }

let blop2=card_url[3]['href'];
console.log(blop2);
    //    let card_url = cards_url[i]['attribs']['href'];

    var node = card_url[3]; 
    console.log(node);
    var childs = node['children']; //child of ul ( 301 childs)
    var child = childs[1];
    console.log(child); //one li child
    console.log("-----------------------------------Content of one child-----------------------------")
    for(key in child){
        console.log(key + " : ");
        console.log(child[key]);
    }
    var a = child['children'][1];
    console.log("---------------------------------Content of A-----------------------------------")
    for(key in a){
        console.log(key + " : ");
        console.log(a[key]);
    }

    var temp;
    for(var i=0;i<7;i+=1){
        temp=child['children'][i];
        for(key in temp){
            console.log(key+" : ");
            console.log(temp[key]);
            
            
        }
    }


    console.log(a['children'][0]);
    
    
    /*
    for(var child in card_url[2]){
        console.log(child);
        //console.log(card_url[child]);
    }*/
}

scrapePage(adresse);




