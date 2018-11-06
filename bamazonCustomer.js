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
          itemId = 1;
          item = "tire iron(s)"
          purchase();
          break;

        case "[2]	office chairs":
          itemId = 2;
          item = "office chair(s)";
          purchase();
          break;

        case "[3]	ice cream pints (lime only)":
          itemId = 3;
          item = "pint(s) of lime ice cream";
          purchase();
          break;

        case "[4]	red wagon wheels":
          itemId = 4;
          item = "red wagon wheel(s)... do you have a wheeless wagon? We do if you need it!";
          purchase();
          break;

        case "[5]	used t-shirts":
          itemId = 5;
          item = "used t-shirt(s)";
          purchase();
          break;

        case "[6]	refurbished screwdrivers":
          itemId = 6;
          item = "refurbished screwdriver(s)";
          purchase();
          break;

        case "[7]	120 oz dark coffee":
          itemId = 7;
          item = "120 oz dark coffee(s)";
          purchase();
          break;

        case "[8]	steel cups":
          itemId = 8;
          item = "steel cup(s)";
          purchase();
          break;

        case "[9] jeans (OSFA)":
          itemId = 9;
          item = "jeans (OSFA)";
          purchase();
          break;

        case "[10] red wagons (no wheels)":
          itemId = 10;
          item = "red wagon(s) (no wheels)";
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
      var query = "SELECT stock_quantity, price FROM bamazondb.products WHERE item_id =" + itemId;
          connection.query(query, { inventoryIron: answer.inventoryIron }, function (err, res) {
        if (JSON.stringify(res[0].stock_quantity) >= parseInt(answer.inventoryIron)) {
          console.log("\n" + answer.inventoryIron + " " + item + " coming up!");
          query = "UPDATE bamazondb.products SET stock_quantity=stock_quantity - " + answer.inventoryIron + " WHERE item_id=" + itemId;
          connection.query(query, { inventoryIron: answer.inventoryIron }, function (err, res) {
          })
          console.log("\n\n\n\n That will cost: $" + answer.inventoryIron * JSON.stringify(res[0].price)) + " please.";
          console.log('\n Quantity Now Remaining: ' + JSON.stringify(res[0].stock_quantity));
          console.log("\n\n\n.... It was an absolute pleasure doing business with you!")
        }
        else { console.log("\n\n\n----------------------------\n No can do, we dont have that many!  We have " + JSON.stringify(res[0].stock_quantity) + ' in our inventory!') }

        console.log('\n\n\n ----------------------------');

        transactionFunct2();
      });
    });
}


function transactionFunct2() {
  inquirer
    .prompt({
      name: "toshop_or_nottoshop",
      type: "list",
      message: "Do you want to keep shopping?",
      choices: [
        "Yes",
        "No",
      ]
    })
    .then(function (answer) {
      switch (answer.toshop_or_nottoshop) {
        case "Yes":
          console.log("\n\n\n----------------------------")
          transactionFunct();
          break;

        case "No":
          Console.log("\n---------------------------- Bye! Have a great day!")
          break;
      };
    })
};



