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

  app.get('/api/animations/all', (req, res) => {
    models.animations.findAll({
      where: {
        default: 1
      }
    })
    .then(animations => {
      res.send(animations);
    });
  })
  app.get('/api/animations/:id', (req, res) => {
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

  app.get('/api/sets/custom', (req, res) => {
    models.sequelize.query("SELECT id, name, description FROM sets WHERE custom = 1;", { type: models.Sequelize.QueryTypes.SELECT })
      .then(data => {
        res.send(data);
      });
  })

  app.get('/api/sets/', (req, res) => {
    models.sequelize.query("SELECT id, name, description FROM sets WHERE custom = 0;", { type: models.Sequelize.QueryTypes.SELECT })
      .then(data => {
        res.send(data);
      });
  })

  app.get('/api/sets/:id', (req, res) => {
    models.sequelize.query("SELECT id, name, description FROM sets WHERE sets.id =" + req.params.id + ";", { type: models.Sequelize.QueryTypes.SELECT })
      .then(data => {
        res.send(data);
      });
  })

  app.get('/api/sets/animations/:id', (req, res) => {
    models.sequelize.query("SELECT name, description, video, animationId FROM animations, animationsets WHERE setId =" + req.params.id + " AND animations.id = animationId;", { type: models.Sequelize.QueryTypes.SELECT })
      .then(data => {
        res.send(data);
      });
  })
  app.get('/api/sets/animation/:id', (req, res) => {
    models.sequelize.query("SELECT animations.id, animations.name, animations.description, animations.video, componentName, rational, innovative, personal, maskuline, serious, luxurious, delicate, simple, slow, rough, hard, sharp, rectilineal, static FROM animations, sets WHERE sets.id =" + req.params.id + ";", { type: models.Sequelize.QueryTypes.SELECT })
      .then(data => {
        res.send(data);
      });
  })
  app.get('/api/sets/tags/:id', (req, res) => {
    models.sequelize.query("SELECT name FROM settags, setssettags WHERE setssettags.setId=" + req.params.id + " AND setssettags.settagsId = settags.id;", { type: models.Sequelize.QueryTypes.SELECT })
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
