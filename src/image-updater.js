const yamlChanger = require("./utils/yaml-changer")
const gitHandler = require("./utils/git-handler")

async function updateImageTag(newImageTag, repository_name, environment) {
    
    console.info("[Info]:: Running the image update")
    
    const folderPath= `manifests/apps/${environment}/${repository_name}/`

    yamlChanger.insertYamlValue(folderPath, newImageTag)
}

async function commitNewImageTag(newImageTag, actor, repository_name, environment) {
    gitHandler.commit(
        `Deploy - Repository:${repository_name} Environment: ${environment} - Tag: ${newImageTag}`
    )
    gitHandler.push()
}

module.exports = {
    updateImageTag,
    commitNewImageTag
}
