const bodyParser = require('body-parser');

module.exports = (app) => {
  app.use(bodyParser.json());

  app.post('/marketplace', (req, res, next) => {
    const msg = `Thanks for purchasing the ProjectsBot ${req.body.marketplace_purchase.plan.name} plan!`;
    console.log(msg);
    res.status(200).send(msg);
  });

}
