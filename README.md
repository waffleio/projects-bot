# ProjectsBot

> a GitHub App built with [probot](https://github.com/probot/probot) that automatically moves pull requests into a GitHub Project, based on the `.projectsbot` configuration

## Setup

```
# Install dependencies
npm install

# Run the bot
npm start
```

# Create configuration file
Add a `.github/projectsbot.yml` configuration file in your repository to tell ProjectsBot where to automatically place pull requests:
```
project: 'My Project'
column: 'Review'
```

If ProjectsBot does not find a configuration file it won't automatically move any pull requests.

See [docs/deploy.md](docs/deploy.md) if you would like to run your own instance of this app.
