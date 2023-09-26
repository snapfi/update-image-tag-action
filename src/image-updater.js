const yamlChanger = require("./utils/yaml-changer")
const gitHandler = require("./utils/git-handler")

async function updateImageTag(newImageTag, repository_name) {
    console.info("[Info]:: Running the image update")
    
    //Github repository name
    //Verificar se tem  arquivo deployment, tem deployment? então é deployment se não é cronjob.

    
    // folderPath= `${environment}/${repository_name}/deployment.yaml`
    
    const folderPath= `dev/xpto-api/`
    const key = "newTag"

    yamlChanger.insertYamlValue(folderPath, key, newImageTag)
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
