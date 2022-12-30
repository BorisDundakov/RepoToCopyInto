const core = require('@actions/core');
const github = require('@actions/github');

const name = 'Boris Dundakov'
const email = 'boris.stefan.de@gmail.com'


async function update_readme(){
    const myToken = core.getInput('myToken');
    const octokit = github.getOctokit(myToken)
    const context = github.context;

    const { data: {sha}} = await octokit.request('GET /repos/{owner}/{repo}/contents/README.md/', {
        owner: context.repo.owner,
        repo: context.repo.repo,'
      })

      
      const { data: {content}} = await octokit.request('GET /repos/{owner}/{repo}/contents/README.md/', {
        owner: 'BorisDundakov',
        repo: 'RepoToCopyFrom'
      })
      
      
      const update = await octokit.request('PUT /repos/{owner}/{repo}/contents/README.md', {
                            owner: context.repo.owner,
                            repo: context.repo.repo,
                            //path: 'README.md',
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
