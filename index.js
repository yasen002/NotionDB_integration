const { Client } = require("@notionhq/client")
require("dotenv").config();
var faker = require('faker');


// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})
let database_ID = "7bc17afc973a4e4b84edbb5d835d41b6";


//Random User Generator
var UserGenerator = ()=>{
  const Name = faker.name.findName();
  const Email = faker.internet.email();
  const Description = faker.lorem.words(6);
  return[Name,Email,Description];
}


//Post Data to the Database 
(async () => {
  const personData = UserGenerator();
  const namedata = personData[0];
  const emaildata = personData[1];
  const descdata = personData[2];
  const response = await notion.pages.create({
    parent: {
      database_id: "7bc17afc973a4e4b84edbb5d835d41b6",
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: namedata,
            },
          },
        ],
      },
        Description: {
          rich_text: [
            {
              text: {
                content: descdata,
              },
            },
          ],
        },
        Email: {
          email: emaildata
        } 
    }
  });
  
})();


//Getting Data from Notion Database 
(async () => {
  const databaseId = database_ID;
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  //map the response
  const contact = response.results.map( (page)=>{
    var name = page.properties.Name.title[0].text.content;
    var email = page.properties.Email.email;
    var desc = page.properties.Description.rich_text[0].text.content;

    //log the data
    console.log(name);
    console.log(email);
    console.log(desc);
  })
  
})();

