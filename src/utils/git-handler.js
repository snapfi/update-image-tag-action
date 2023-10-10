const shell = require("shelljs")

const commit = (commitMessage) => {
    shell.exec('git config --global user.name "devops"')
    shell.exec('git config --global user.email "devops@snap.fi"')

    shell.exec(`git add .`)
    shell.exec(`git commit -m "${commitMessage}"`)
}

const push = () => {

    shell.exec('git pull --rebase')
    const gitPushResult = shell.exec('git push')

    if (gitPushResult.code !== 0) {
        throw Error(`The 'git push' command gave an error code: ${result.code}`)
    }
}

module.exports = {
    commit, push
}
