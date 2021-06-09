const { Client } = require("@notionhq/client");
require("dotenv").config();
var faker = require("faker");

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});
let database_ID = process.env.STOCK_DB_ID;

//Random User Generator
var UserGenerator = () => {
  const Name = faker.name.findName();
  const Email = faker.internet.email();
  const Description = faker.lorem.words(6);
  return [Name, Email, Description];
};

//Post Data to the Database
function storeStockList(stockArray) {
  stockString = stockArray.join();
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
                content: "stock",
              },
            },
          ],
        },
        list: {
          rich_text: [
            {
              text: { content: stockString },
            },
          ],
        },
      },
    });
  })();
}

//store one stock to db
function storeOneStock(stock) {
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
        },
      },
    });
  })();
}

function getStockList() {
  //Getting Data from Notion Database
  return (async () => {
    var tickerStringCollection = "";
    const databaseId = database_ID;
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    //map the response
    let contact = response.results.map((page) => {
      var stockString = page.properties.list.rich_text[0].plain_text;
      tickerStringCollection += stockString;
      
    });
    return tickerStringCollection;
  })();
}

function checkIfDuplicateTickerExists(w) {
  let a = new Set(w).size;
  return new Set(w).size !== w.length;
}

function findDuplicates(arr) {
  
  return arr.filter((item, index) => arr.indexOf(item) != index);
}

function duplicateStockCheck() {
  getStockList().then((list) => {
    list = list.split(",");
    //check if it is nessisary
    if (checkIfDuplicateTickerExists(list) === true) {
      //return duplicate
      let fleg = findDuplicates(list);
      console.log(fleg)
    }
  });
}


let l = ['NVDA','PENN', 'IQV', 'ELAN', 'IDXX', 'SC', 'TROX', 'ETSY', 'OCDX', 'EA', 'ASO', 'HOME', 'NAVI', 'NTAP', 'DQ', 'ONTO', 'TECH', 'NTES', 'DECK', 'KRNT', 'XPEL', 'OMF', 'ERII', 'QFIN', 'FIVE', 'WMT', 'DAVA', 'TBBK', 'FIGS', 'RVLV', 'COWN', 'CROX', 'GS', 'SIVB', 'JEF', 'PTON', 'EXPD', 'ASML', 'TROW', 'TSM', 'PDCE', 'SKY', 'SCHN', 'JYNT', 'CUBI', 'HVT', 'FNKO', 'LULU', 'FRHC', 'OVV', 'LOGI', 'DEN', 'ZBRA', 'DHI', 'GRBK', 'ZS', 'BNTX', 'DELL', 'LRCX', 'ROKU', 'MGA', 'CSTR', 'VALE', 'SNPS', 'HOG', 'BILL', 'MTH', 'PGNY', 'DT', 'UCTT', 'MDB', 'TLS', 'TOL', 'PRFT', 'PYPL', 'DXC', 'COF', 'CRL', 'PLTR', 'XPEV', 'MP', 'DOCU', 'FL', 'JOE', 'CLVT', 'DV', 'ELY', 'BE', 'FUTU', 'AMBA', 'SID', 'YETI', 'CUTR', 'AMN', 'AMD', 'APPS', 'NTST', 'BKE', 'MS', 'INMD', 'DKS', 'UPST', 'POOL', 'SMH', 'PANW', 'WAT', 'ALGN', 'TAN', 'WPM', 'JD', 'MRVI', 'EOG', 'ATKR', 'PHM', 'TIGR', 'CZR', 'WST', 'CRNC', 'FND', 'LGIH', 'REZI', 'RH', 'DDS', 'CRSR', 'LAD', 'LI', 'HAYW', 'PFS', 'MSFT', 'CCK', 'GNRC', 'SNX', 'DKNG', 'SNOW', 'EPAM', 'ABCB', 'HTH', 'ZIM', 'CALX', 'DRVN', 'CBNK', 'VRTS', 'AMAT', 'AGTI', 'CRCT', 'CCS', 'MD', 'FOCS', 'OSTK', 'STLD', 'AAPL', 'WHR', 'MTDR', 'SEMR', 'JBL', 'NUE', 'SMTC', 'NTR', 'HIMX', 'CRWD', 'CAMT', 'MCFE', 'PINS', 'FOXF', 'AVGO', 'SQ', 'BX']



// jut finished duplicate check, try to return with index togather next time
duplicateStockCheck();