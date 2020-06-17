//Install express server
const express = require('express');
const path = require('path');
 
const app = express();

const PORT = process.env.PORT || 7000;

var app_path = '../dist/visiteRdc';
app.use('/',express.static(path.join(__dirname, app_path)))
.get('*',(req,res)=>res.sendFile(path.join(__dirname,app_path + '/index.html')))
.listen(PORT,()=>console.log(`ecoute sur ${PORT}`));
 
// Serve only the static files form the dist directory
// Replace the '/dist/<to_your_project_name>'
/*app.use(express.static(__dirname + '/dist/visiteRdc'));
 
app.get('*', function(req,res) {
  // Replace the '/dist/<to_your_project_name>/index.html'
  res.sendFile(path.join(__dirname + '/dist/visiteRdc/index.html'));
});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 778);*/