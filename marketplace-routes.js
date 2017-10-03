
module.exports = (app) => {

  app.post('/marketplace', (req, res, next) => {

    console.log(`Thanks for purchasing the ProjectsBot ${req.body.marketplace_purchase.plan.name} plan!`);

  });

}
