const { Client } = require("@notionhq/client")
require("dotenv").config();
var faker = require('faker');

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})
let database_ID =process.env.STOCK_DB_ID;


//Random User Generator
var UserGenerator = ()=>{
  const Name = faker.name.findName();
  const Email = faker.internet.email();
  const Description = faker.lorem.words(6);
  return[Name,Email,Description];
}

//Post Data to the Database 
function storeListOfStocks(stockArray){
  stockArray.forEach(element => {
    (async () => {
      const response = await notion.pages.create({
        parent: {
          database_id: process.env.STOCK_DB_ID,
        },
        properties: {
          Ticker: {
            title: [
              {
                text: {
                  content: element,
                },
              },
            ],
          }
            
        }
      });
    })();
  });

}

function storeOneStock(stock){
  //adding stock to db
  (async () => {
    const response = await notion.pages.create({
      parent: {
        database_id: process.env.STOCK_DB_ID,
      },
      properties: {
        Ticker: {
          title: [
            {
              text: {
                content: stock,
              },
            },
          ],
        }    
      }
    });
  })();
}




function getStockList(){
  //Getting Data from Notion Database 
  return (async () => {
    var list=[];
    const databaseId = database_ID;
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    //map the response
    let contact = response.results.map((page)=>{
      var stock = page.properties.Ticker.title[0].text.content;
      list.push(stock);
    })
    return list;
  })();
}

function duplicateStockCheck(){
  getStockList()
  .then(list=>{
    //do some duplication check
  })
}

