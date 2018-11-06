var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazondb"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("\n successful connection to bamazondb! \n")
  transactionFunct();
});

var item = ""

function transactionFunct() {
  inquirer
    .prompt({
      name: "inventory",
      type: "list",
      message: "Here's the list of goods.  What are you buying?",
      choices: [
        "[1]	tire irons",
        "[2]	office chairs",
        "[3]	ice cream pints (lime only)",
        "[4]	red wagon wheels",
        "[5]	used t-shirts",
        "[6]	refurbished screwdrivers",
        "[7]	120 oz dark coffee",
        "[8]	steel cups",
        "[9]	jeans (OSFA)",
        "[10]	red wagons (no wheels)",
        
      ]
    })
    .then(function (answer) {
      switch (answer.inventory) {
        case "[1]	tire irons":
          item = "tire irons";
          purchase();
          break;

        case "[2]	office chairs":
        item = "office chairs";
        purchase();
          break;

        case "[3]	ice cream pints (lime only)":
        item = "ice cream pints (lime only)";
        purchase();
          break;

        case "[4]	red wagon wheels":
        item = "red wagon wheels";
        purchase();
          break;

        case "[5]	used t-shirts":
        item = "used t-shirts";
        purchase();
          break;

        case "[6]	refurbished screwdrivers":
        item = "refurbished screwdrivers";
        purchase();
          break;

        case "[7]	120 oz dark coffee":
        item = "120 oz dark coffee";
        purchase();
          break;

        case "[8]	steel cups":
        item = "steel cups";
        purchase();
          break;

        case "[9] jeans (OSFA)":
        item = "jeans (OSFA)";
        purchase();
          break;

        case "[10] red wagons (no wheels)":
        item = "red wagons (no wheels)";
        purchase();
          break;
      }
    });
}

function purchase() {
  inquirer
    .prompt({
      name: "inventoryIron",
      type: "input",
      message: "How many?",
      validate: function (value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    })

    .then(function (answer) {
      var query = "SELECT stock_quantity FROM bamazondb.products WHERE product_name = " + item;
      connection.query(query, { inventoryIron: answer.inventoryIron }, function (err, res) {
        if (res >= answer.inventoryIron) {
          console.log(answer.inventoryIron);
          query = "UPDATE stock_quantity FROM bamazondb.products SET stock_quantity = stock_quantity - " + answer.inventoryIron + " WHERE product_name = " + item;
         
          connection.query(query, { inventoryIron: answer.inventoryIron }, function (err, res) {
            console.log('\n' + answer.inventoryIron + " test1");
            console.log('\n' + JSON.stringify(res) + " test2");
            
          })
        }
        else { console.log("No can do, we dont have that many!  We have " + JSON.stringify(res) + 'left!') }

        console.log('\n' + res);
        // transactionFunct();
      });
    });
}
