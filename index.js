const core = require("@actions/core")

const configutator = require("./src/utils/configurator")
const imageUpdater = require("./src/image-updater")

var githubSHA = process.env.GITHUB_SHA
var githubActor = process.env.GITHUB_ACTOR
var githubRepository = process.env.GITHUB_REPOSITORY

var repositoryName = githubRepository.split("/")[1]

async function main() {
    try {
        var environment = core.getInput("environment").toString()
        console.info("environment: " + environment)

        environment = environment ? "" : "dev";

        console.info("environment: " + environment)

        await imageUpdater.updateImageTag(githubSHA, repositoryName, environment)
        await imageUpdater.commitNewImageTag(githubSHA, githubActor, repositoryName, environment)

    } catch (error) {
        throw Error(error)
    }
}

main()