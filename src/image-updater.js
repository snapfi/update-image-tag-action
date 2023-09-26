const yamlChanger = require("./utils/yaml-changer")
const gitHandler = require("./utils/git-handler")

async function updateImageTag(newImageTag, repository_name) {
    
    console.info("[Info]:: Running the image update")
    
    const folderPath= `dev/xpto-api/`

    yamlChanger.insertYamlValue(folderPath, newImageTag)
}

async function commitNewImageTag(newImageTag, actor) {
    gitHandler.commit(
        `test`
    )
    gitHandler.push()
}

module.exports = {
    updateImageTag,
    commitNewImageTag
}
