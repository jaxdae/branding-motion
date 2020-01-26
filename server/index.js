const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const app = express()

const models = require('./models/index.js')
const sequelize = require('sequelize')

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended : false }))

  // app.post('/api/tags', (req, res) => {
  //   console.log(req.body);
  //   models.tags.create({ name: req.body.name, isCategory: req.body.category})
  // })

  // app.post('/api/animations', (req, res) => {
  //   console.log(req.body);
  //   models.animations.create({ name: req.body.name, description: req.body.desc, video: req.body.video, componentName: req.body.comp })
  // })

  app.get('/api/animations', (req, res) => {
    models.animations.findAll().then(animations => {
      res.send(animations);
    });
  })
  app.get('/api/animations/:id', (req, res) => {
    //console.log(req.params);
    models.animations.findOne({
      where: {
        id: req.params.id
      }
    }).then(animation => {
      res.send(animation);
    });
  })

  app.get('/api/tags/elements', (req, res) => {
    models.tags.findAll({
      where: {
        isCategory: 0
      }
    }).then(tags => {
      res.send(tags);
    });
  })
  app.get('/api/tags/categories', (req, res) => {
    models.tags.findAll({
      where: {
        isCategory: 1
      }
    }).then(tags => {
      res.send(tags);
    });
  })

  app.get('/api/animationtags/:id', (req, res) => {
    models.sequelize.query("SELECT tags.name FROM tags, animationtags WHERE tags.id = animationtags.tagId AND animationtags.animationId =" + req.params.id + ";", { type: models.Sequelize.QueryTypes.SELECT })
    .then(data => {
    res.send(data);
  });
  })

  app.get('/api/crossrefs/:id', (req, res) => {
    models.sequelize.query("SELECT animations.id, name, description, video, componentName FROM animations, crossRefs WHERE animations.id = crossRefs.otherAnimationId AND animationId =" + req.params.id + ";", { type: models.Sequelize.QueryTypes.SELECT })
      .then(data => {
        res.send(data);
      });
  })

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
