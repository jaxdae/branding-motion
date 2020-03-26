const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const app = express()

const models = require('./models/index.js')
const sequelize = require('sequelize')
const multer = require('multer')
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)

let upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      let type = req.params.type;
      let path = './static/uploads';
      callback(null, path);
    },
    filename: (req, file, callback) => {
      callback(null, Date.now() + '.json');
    }
  })
});

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
  
  app.post('/upload', upload.single('file'), (req,res) => {
    res.json({file: req.file})
  })
  app.delete('/test/:id', (req, res) => {
    fs.unlinkSync('./static/uploads/' + req.params.id, function (err) {
      if (err) {
        return console.log("Delete error: " + err);
      }
      else {
        console.log("file deleted successfully");
      }
    })
    res.send(req.params.id)
  })
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
  app.get('/api/animations/all/limit', (req, res) => {
    models.animations.findAll({
      where: {
        default: 1
      },
      limit: 10
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
  app.get('/api/settags/', (req, res) => {
    models.settags.findAll()
    .then(tags => {
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
    models.sequelize.query("SELECT tags.id, tags.name FROM tags, animationtags WHERE tags.id = animationtags.tagId AND animationtags.animationId =" + req.params.id + ";", { type: models.Sequelize.QueryTypes.SELECT })
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
    models.sequelize.query("SELECT id, name, description, custom FROM sets WHERE sets.id =" + req.params.id + ";", { type: models.Sequelize.QueryTypes.SELECT })
      .then(data => {
        res.send(data);
      });
  })

  app.get('/api/sets/animations/:id', (req, res) => {
    models.sequelize.query("SELECT animations.id, name, description, animations.video, animationId FROM animations, animationsets WHERE setId =" + req.params.id + " AND animations.id = animationId;", { type: models.Sequelize.QueryTypes.SELECT })
      .then(data => {
        res.send(data);
      });
  })
  app.get('/api/sets/animation/:id', (req, res) => {
    models.sequelize.query("SELECT animations.id, animations.name, animations.description, animations.video, componentName, rational, innovative, personal, maskuline, serious, luxurious, delicate, simple, slow, rough, hard, rectilineal, static FROM animations, animationsets WHERE animationsets.setId =" + req.params.id + " AND animations.id = animationsets.animationId" , { type: models.Sequelize.QueryTypes.SELECT })
      .then(data => {
        res.send(data);
      });
  })
  app.get('/api/sets/tags/:id', (req, res) => {
    models.sequelize.query("SELECT name, settagsId FROM settags, setssettags WHERE setssettags.setId=" + req.params.id + " AND setssettags.settagsId = settags.id;", { type: models.Sequelize.QueryTypes.SELECT })
      .then(data => {
        res.send(data);
      });
  })

  app.post('/api/sets/animation/', (req,res) => {
    models.animationsets.create({
      animationId: req.body.animationId,
      setId: req.body.setId
    })
      .then(animation => {
        res.send(animation);
      });

  })

  app.post('/api/sets/add/', (req, res) => {
    models.sets.create({
      name: req.body.name,
      description: req.body.description,
      custom: req.body.custom
    })
      .then(set => {
        res.send(set);
      });
  })

  app.post('/api/setssettags/add/', (req, res) => {
    models.setssettag.create({
      setId: req.body.setId,
      settagsId: req.body.settagsId
    })
      .then(settag => {
        res.send(settag);
      });
  })

  app.post('/api/animations/tags/add/', (req, res) => {
    models.animationtags.create({
      animationId: req.body.animationId,
      tagId: req.body.tagId
    })
      .then(tag => {
        res.send(tag);
      });
  })

  app.post('/api/animationsets/add/', (req, res) => {
    models.animationsets.create({
      animationId: req.body.animationId,
      setId: req.body.setId
    })
      .then(animation => { 
        res.send(animation);
      });
  })
  app.post('/api/animations/add/', (req, res) => {
    models.animations.create({
      name: req.body.name,
      description: req.body.description,
      video: req.body.video,
      componentName: req.body.componentName,
      rational: req.body.rational,
      innovative: req.body.innovative,
      personal: req.body.personal,
      maskuline: req.body.maskuline,
      serious: req.body.serious,
      luxurious: req.body.luxurious,
      delicate: req.body.delicate,
      simple: req.body.simple,
      default: 0,
      slow: req.body.slow,
      rough: req.body.rough,
      hard: req.body.hard,
      rectilineal: req.body.rectilineal,
      static: req.body.static,
    })
      .then(animation => {
        res.send(animation);
      });
  })

  app.delete('/api/animations/tags/remove/:id', (req, res) => {
    models.animationtags.destroy({
      where: {
        animationId: req.params.id
      }
    })
      .then(response => {
        res.send('successfully deleted');
      });
  })

  app.delete('/api/sets/remove/:id', (req, res) => {
    models.sets.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(response => {
        res.send('successfully deleted');
      });
  })

  app.delete('/api/animations/remove/:id', (req, res) => {
    models.animations.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(response => {
        res.send('successfully deleted');
      });
  })

  app.delete('/api/animationsets/remove/:id', (req, res) => {
    models.animationsets.destroy({
      where: {
        setId: req.params.id
      }
    })
      .then(response => {
        res.send('successfully deleted');
      });
  })

  app.delete('/api/setssettags/remove/:id', (req, res) => {
    models.setssettag.destroy({
      where: {
        setId: req.params.id
      }
    })
      .then(response => {
        res.send('successfully deleted');
      });
  })

  app.put('/api/animations/update/:id', (req, res) => {
    models.animations.update({
      default: 0,
      slow: req.body.slow,
      rough: req.body.rough,
      hard: req.body.hard,
      rectilineal: req.body.rectilineal,
      static: req.body.static,
    },{
      where: {
        id: req.params.id
      },
    })
  })

  app.put('/api/sets/update/:id', (req, res) => {
    models.sets.update({
      name: req.body.name,
      description: req.body.description
    },{
      where: {
        id: req.params.id
      }
    })
    .then(response => {
        res.send(response);
      });
  })
  
  // Give nuxt middleware to express
  app.use(nuxt.render)
  // Listen the server
  const newport = process.env.PORT || 3000;
  app.listen(newport)
  consola.ready({
    message: `Server listening on http://${host}:${newport}`,
    badge: true
  })
}
start()
