const fetch = require('node-fetch');
const cheerio = require('cheerio');
const cheerioAdv = require('cheerio-advanced-selectors')
const fs = require('fs');

const addr_complement = 'https://restaurant.michelin.fr/';
const chief_selector = 'div.node_poi-chef div.node_poi_description div.field:eq(0) div.even';
const cuisines_selector = 'div.node_poi-cooking-types';
const address_selectors = [
  'div.thoroughfare',
  'div.poi_intro-display-address span.postal-code',
  'div.poi_intro-display-address span.locality'
];
const name_selector = 'h1.poi_intro-display-title';
console.log("bloop");

function getChief($) {
  let chief = cheerioAdv.find($, chief_selector).text();
  return chief;
}

function getCuisines($) {
  let cuisines = cheerioAdv.find($, cuisines_selector).text();
  cuisines = cuisines.trim();
  return cuisines;
}

function getStars($) {
  let stars = cheerioAdv.find($, 'div.icon-wrapper').children().length;
  return stars;
}

function getAddress($) {
  let complement = cheerioAdv.find($, address_selectors[0]).text();
  complement = complement.trim();
  let  postal = cheerioAdv.find($, address_selectors[1]).text();
  postal = postal.trim();
  let city = cheerioAdv.find($, address_selectors[2]).text();
  city = city.trim();

  let address = {
    complement: complement,
    city: city,
    postal: postal
  };

  return address;
}

function getName($) {
  let name = cheerioAdv.find($, name_selector).text();
  name = name.trim();
  return name;
}

function getAttribs($) {
  let name = getName($);
  let address = getAddress($);
  let cuisines = getCuisines($);
  let chief = getChief($);
  let stars = getStars($);

  let attribs = {
    name: name,
    address: address,
    stars: stars,
    chief: chief,
    cuisines: cuisines
  };

  return attribs;
}

async function scrapeCard(link) {
  let raw_data = await fetch(link);
  let data = await raw_data.text();
  let $ = cheerio.load(data);
  let card = getAttribs($);
  return await card;
}

async function scrapePage(url, page) {
  console.log("Fetching page: " + page);

  let link = url + page;
  let raw_data = await fetch(link);
  let data = await raw_data.text();
  let $ = cheerio.load(data);

  let no_res = cheerioAdv.find($, 'div.srp-no-results-title');
  if (no_res.length > 0) {
    console.log("No more info on this page.");
    return null;
  }

  let cards_url = cheerioAdv.find($, 'a.poi-card-link');
  let cards = [];

  for (let i = 0; i < cards_url.length; i++) {
    let card_url = cards_url[i]['attribs']['href'];
    let card = await scrapeCard(addr_complement + card_url);
    cards.push(card);
  }

  return cards;
}

async function scrapeAllPages() {
  console.log("debut scraping");
  let json = [];

  let page = 0;
  let url = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-';

  while (true) {
    page ++;
    let cards = await scrapePage(url, page);

    if(cards === null)
      break;

    json =  json.concat(cards);
  }

  console.log("taille json "+ json.length);
  return json;
}


async function scrape() {
  const json = await scrapeAllPages();


for(var i=0;i<json.length;i+=1){console.log(json[i]);}


  console.log('Number of restaurants: ' + json.length);
 /* const new_json = await scrapeIds(json);
  console.log('Got ' + new_json.length + ' deals!');

	fs.writeFile('deals.json', JSON.stringify(new_json, null, 4), 'utf-8', (err) => {
	if (err) throw err;
		console.log('JSON saved!');
	});*/
}

scrape();