const core = require("@actions/core")

const configutator = require("./src/utils/configurator")
const imageUpdater = require("./src/image-updater")

var githubActor = process.env.GITHUB_ACTOR
var githubRepository = process.env.GITHUB_REPOSITORY

var repositoryName = githubRepository.split("/")[1]

async function main() {
    try {
        var environment = core.getInput("environment").toString()
        if (environment == "") {
            environment = "dev";
        }
        var tag = core.getInput("tag").toString()

        await imageUpdater.updateImageTag(tag, repositoryName, environment)
        await imageUpdater.commitNewImageTag(tag, githubActor, repositoryName, environment)

    } catch (error) {
        throw Error(error)
    }
}

main()