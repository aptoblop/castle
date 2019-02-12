

var request=require("request");
var path=require('path');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const cheerioAdv = require('cheerio-advanced-selectors');
const fs = require('fs');


const adresse = 'https://www.relaischateaux.com/fr/site-map/etablissements';

request('https://www.relaischateaux.com/fr/site-map/etablissements', function (error, response, html) {
  if (!error && response.statusCode == 200) 
  {
      console.log("salut à toi brave voyageur");
    var $ = cheerio.load(html);
   // var blop = cheerioAdv.select($,'#countryF');
}
var tab=[];
var data= $('h3:contains("France")').next();
$(this).find('li').each(function getinfo(i,e)
{

    console.log("blop");
}
    }));




/*

async function scrapeCard(link) {
    console.log(link);
    let raw_data = await fetch(link);
    let data = await raw_data.text();
    let $ = cheerio.load(data);
    let card = getAttribs($);
    return await card;
}


 function scrapePage(url) {
    //console.log("blop");
    //console.log(url);

   // let raw_data = await fetch(url);
   // let data = await raw_data.text();

    let $ = cheerio.load('https://www.relaischateaux.com/fr/site-map/etablissements');


    var data= $('h3:contains("France")').next();
    $(this).find('li').each(function getinfo(i,e){

        console.log("blop");
    }


    );

 }*/