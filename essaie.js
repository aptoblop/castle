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

/*
request(adresse,function(err,resp,body){
    
    let tab=[];
var $= cheerio.load(body);
let blop = cheerioAdv.find($,'#countryF ').html();
tab.push(blop);
console.log(tab[0]);
console.log(tab[1]);
});*/

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


//const chief_selector = 'div.node_poi-chef div.node_poi_description div.field:eq(0) div.even';

request('https://www.relaischateaux.com/fr/site-map/etablissements', function (error, response, html) 
{
  if (!error && response.statusCode == 200) {
      console.log("salut à toi brave voyageur");
    var $ = cheerio.load(html);
   // var blop = cheerioAdv.select($,'#countryF');


   var tab=[];

   /* $('#countryF ul[class="listDiamond"] > li > a[href]').each(function getinfo(i,e){
       // console.log("a" + $(this).text());
      // console.log($(this).attr());
        var newval =$(this).text();
        tab.push(newval);
        return tab;

    });
*/


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
       // console.log("le chef c est : "+obj.name_chef);


    });






}

    tabjson=[];
    for(var i=0;i<tab.length;i+=1)
        {




            tabjson.push(jsoniser(tab[i].name_castle,tab[i].name_chef,tab[i].url,0));

         }


         var $2=cheerio.load(tab[0].url)
         //var test=String($2().find('meta[itemprop="priceRange"]').attr("content"));
         var test=String($2("#propertyInfo__ratings").find("meta[itemprop='priceRange']").attr("content"));
         console.log(test);

    console.log(tabjson.length);






    console.log("bon vent !")

    for(var i=0; i<tabjson.length;i+=1)
    {
        console.log(tabjson[i]);
    }
    
  
});

function jsoniser(tab1,tab2,tab3,tab4){
    
    return JSON.stringify({ nom_chateau: tab1, nom_chef: tab2, adresse_url: tab3, prix: tab4 });

}





