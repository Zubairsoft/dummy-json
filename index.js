const fetch = require('node-fetch'); 
const express = require('express');
const app = express()
const port= process.env.port || 8080  // Port number that will run in localhost

// Settig for use ejs

app.set("view engine", "ejs"); // For support ejs in our browser
app.set('views', 'public');// For support puplic folder that run scripts 
app.use(express.static('public'));// Middlware that use for supporting css and js files in our site

// Route for show products page
app.get('/', function (req, res) {
  res.redirect('products')
})
//Route for show products page with data from dummyjson
app.get('/products', async function (req, res) {
  const products = await get_data('https://dummyjson.com/products')
  console.log(products);
  res.render("products", { title: "products", products: products.products });
})

//Route for search and show  data from dummyjson in products page 

app.get('/products/search', async function (req, res) {
  console.log('one',req.query.blue);
  const products = await get_data(('https://dummyjson.com/products/search?q='+req.query.q))
  console.log(products)
  res.render("products", { title: "products", products: products.products });
})
//Route for show catagory page with data from dummyjson
app.get('/products/categories', async function (req, res) {
  const products = await get_data('https://dummyjson.com/products/categories')
  console.log(products);
  res.render("categories", { title: "categories", products: products });
})

// Route for search by parameter and show  data from dummyjson in products page 
app.get('/products/:i', async function (req, res) {
  const product = await get_data(('https://dummyjson.com/products/'+req.params.i))
  console.log(product)
  res.render("product", { title: "product", product: product });
})


// Route for search by parameter and show  data from dummyjson in products page 

app.get('/products/category/:i', async function (req, res) {
  const products = await get_data('https://dummyjson.com/products/category/'+req.params.i)
  console.log(products);
  res.render("products", { title: "products", products: products.products });
})

async function get_data(url) {
  const data = await fetch(url).then(res => res.json())
  return data
}
app.listen(port,()=>{console.log("server working ...")})