const express = require('express')
const app = express()
const path = require('path')
// const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'))
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')));
app.use('/build/', express.static(path.join(__dirname, 'node_modules/dat.gui/build')));
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')));
// app.use('/threed_objects/couch.obj', (path.join(__dirname, 'threed_objects/couch.obj')));
app.use(express.static(__dirname + '/ar_js' ))
app.use(express.static(__dirname + '/hat_filter' ))
app.use(express.static(__dirname + '/ARglassTryOn' ))

let port = process.env.PORT || 8000

app.listen(port);
// app.listen(port, () =>
//   console.log('Visit http://127.0.0.1:3000')
// );

