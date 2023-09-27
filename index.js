const core = require("@actions/core")

const configutator = require("./src/utils/configurator")
const imageUpdater = require("./src/image-updater")

var githubSHA = process.env.GITHUB_SHA
var githubActor = process.env.GITHUB_ACTOR
var githubRepository = process.env.GITHUB_REPOSITORY

var repositoryName = githubRepository.split("/")[1]


async function main() {
    try {
        const environment = core.getInput("environment").toString()

        await imageUpdater.updateImageTag(githubSHA, repositoryName, environment)
        await imageUpdater.commitNewImageTag(githubSHA, githubActor)

    } catch (error) {
        throw Error(error)
    }
}

main()