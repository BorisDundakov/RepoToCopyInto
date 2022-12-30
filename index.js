const core = require('@actions/core');
const github = require('@actions/github');

const name = 'Boris Dundakov'
const email = 'boris.stefan.de@gmail.com'


async function update_readme(){
    //console.log('inside index.js file')
    const myToken = core.getInput('myToken');
    const octokit = github.getOctokit(myToken)
    const context = github.context;

    // connect to current repo via Octokit
    const { data: {sha}} = await octokit.request('GET /repos/BorisDundakov/RepoToCopyInto/contents/README.md/', {
        owner: 'bosch-ecs-career-camp',
        repo: 'homework4-BorisDundakov'
      })
      
      console.log(sha)
      
      const { data: {content}} = await octokit.request('GET /repos/BorisDundakov/RepoToCopyFrom/contents/README.md/', {
        owner: 'BorisDundakov',
        repo: 'RepoToCopyFrom'
      })
      console.log(content)
      
      const update = await octokit.request('PUT /repos/{owner}/{repo}/contents/README.md', {
                            owner: content.repo.owner,
                            repo: content.repo.repo,
                            path: 'README.md',
                            message: 'replace current README with new README from another repo',
                            commiter: {
                              name: 'Boris Dundakov',
                              email: 'boris.stefan.de@gmail.com'
                            },
                            content: content,
                            sha: sha
                            
                            })

    
}

update_readme()