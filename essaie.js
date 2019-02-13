

var request=require("request");
var path=require('path');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const cheerioAdv = require('cheerio-advanced-selectors');
const fs = require('fs');


//const adresse = 'https://www.relaischateaux.com/fr/site-map/etablissements';

var tab=[];
var tabjson=[];

const promise1=etape1();
const promise2=etape2();
const promise3=etape3();
promise1.then(promise2,console.log("foiree a l etape 1"));
promise2.then(promise3,console.log("foiree a l etape 2"));
promise2.then(console.log("enfin putain !"),console.log("foiree a l etape 3"));



function etape1 (){
    return new Promise((resolve, reject) => {
        scraping1();
        if (tab.length!=0) {
          resolve("Réussite");
        } else {
          reject("Échec");
        }
      })
}


function etape2 (){
    return new Promise((resolve, reject) => {
        fillPrice();
        if (tab.length!=0) {
          resolve("Réussite");
        } else {
          reject("Échec");
        }
      })
}


function etape3 (){
    return new Promise((resolve, reject) => {  
        faireJson();
        if (tab.length!=0) {
          resolve("Réussite");
        } else {
          reject("Échec");
        }
      })
}


function scraping1()
{
request('https://www.relaischateaux.com/fr/site-map/etablissements', function (error, response, html) 
{
  if (!error && response.statusCode == 200) {
      console.log("salut à toi brave voyageur");
    var $ = cheerio.load(html);


    $('h3:contains("France")').next().find('li').each(function(){

        let data =$(this);
        let adresse=String(data.find("a").first().attr("href"));
        //console.log(adresse);


        let nom_chateau= data.find('a').first().text().trim();
        //console.log(nom_chateau);

        let nom_chef=data.find('a:contains("Chef")').text().trim()
        nom_chef=nom_chef.replace('Chef - ','');


        var obj ={
            name_castle: nom_chateau,
            name_chef: nom_chef,
            url: adresse,
            prix:0
        };

        tab.push(obj);
    });

}

});
}





 async function fillPrice (){
/*
var promise1=new Promise(function (resolve,reject){
});*/
console.log("debut filling price");
for(var i=0;i<tab.length;i+=1)
{
   await request(tab[i].url, async function (error, response, html) 
    {
      if (!error && response.statusCode == 200) {
          console.log("salut à toi brave voyageur");
        var $ = cheerio.load(html);

        var price= await String($("meta[itemprop='priceRange']").attr("content"));

        //tab[i].prix=test;

        console.log("le premier prix est : "+price);
        tab[i].prix= await price;
      }});
    }

}

function faireJson ()
{
    for(var i=0;i<tab.length;i+=1)
    {
        tabjson.push(jsoniser(tab[i].name_castle,tab[i].name_chef,tab[i].url,tab[i].prix));
     }




    console.log(tabjson.length);

    for(var i=0; i<tabjson.length;i+=1)
    {
        console.log(tabjson[i]);
    }

}


function jsoniser(tab1,tab2,tab3,tab4){
    
    return JSON.stringify({ nom_chateau: tab1, nom_chef: tab2, adresse_url: tab3, prix: tab4 });

}



async function scrapePage(url) {
  //  console.log("Fetching page: " + page);
  
  /*  let link = url + page;
    let raw_data = await fetch(link);
    let data = await raw_data.text();*/
    let $ = cheerio.load(url);
  
    let no_res =  String($("meta[itemprop='priceRange']").attr("content"))//cheerioAdv.find($, 'div.srp-no-results-title');
   
  
   // let cards_url = cheerioAdv.find($, 'a.poi-card-link');
    let cards = [];
  
    for (let i = 0; i < cards_url.length; i++) {
      let card_url = cards_url[i]['attribs']['href'];
      let card = await scrapeCard(addr_complement + card_url);
      cards.push(card);
    }
  
    return cards;
}

async function scrapeCard(link) {
    let raw_data = await fetch(link);
    let data = await raw_data.text();
    let $ = cheerio.load(data);
    let card = getAttribs($);
    return await card;
  }








