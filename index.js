const core = require("@actions/core")

const configutator = require("./src/utils/configurator")
const imageUpdater = require("./src/image-updater")

var githubSHA = process.env.GITHUB_SHA
var githubActor = process.env.GITHUB_ACTOR
var githubRepository = process.env.GITHUB_REPOSITORY

async function main() {
    try {
        
        await imageUpdater.updateImageTag(githubSHA, githubRepository)
        await imageUpdater.commitNewImageTag(githubSHA, githubActor)

    } catch (error) {
        throw Error(error)
    }
}

main()
