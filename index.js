const core = require('@actions/core');
const github = require('@actions/github');

async function run(){
    console.log('inside index.js file')
    const myToken = core.getInput('myToken');
    const octokit = github.getOctokit(myToken)
    const context = github.context;


    
}

run()