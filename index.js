module.exports = (robot) => {
  // Your code here
  console.log('Yay, the app was loaded!')

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/

  robot.on('pull_request.opened', async (context) => {
    let config = {};
    try {
      config = await context.config('projectsbot.yml')
    } catch (err) {
      console.log("We didn't find .github/projectsbot.yml. Look at https://github.com/waffleio/projects-bot/blob/master/README.md for an example.");
      return;
    }

    if(!config.project && !config.column){
      console.log("We didn't find project or column configuration in .github/projectsbot.yml. Look at https://github.com/waffleio/projects-bot/blob/master/README.md for an example.");
      return;
    }

    // Find project
    let project = null;

    //TODO test org projects
    try {
      const orgProjects = await context.github.projects.getOrgProjects({org: context.payload.repository.owner.login})
      project = orgProjects.data.find((project) => project.name.toLowerCase() === config.project.toLowerCase())
    } catch(err) {}

    if(!project) {
      try {
        const repoProjects = await context.github.projects.getRepoProjects({owner: context.payload.repository.owner.login, repo: context.payload.repository.name})
        project = repoProjects.data.find((project) => project.name.toLowerCase() === config.project.toLowerCase())
      } catch(err) {}
    }

    if(!project) {
      console.log(`We didn't find a project named ${config.project}. You should go create one!`);
      return;
    }

    // A project exists! Check if column exists

    let column = null;
    try {
      const projectColumns = await context.github.projects.getProjectColumns({project_id: project.id})
      column = projectColumns.data.find((column) => column.name.toLowerCase() === config.column.toLowerCase())
    } catch (err) {
      console.log(`We didn't find a column named ${config.column} in ${config.project}. You should go create one!`);
      return;
    }

    // add PR to project and put it in the column!

    try {
      await context.github.projects.createProjectCard({column_id: column.id, content_id: context.payload.pull_request.id, content_type: 'PullRequest'})
    } catch (err) {
      console.log(`We were unable to update your project. :(`);
    }

  })

}
