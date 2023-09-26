const checkActionInputs = async (environment, manifestsRepository) => {    
    if (environment !== "development" && environment !== "production") {
        throw new Error("Environment invalid! Set development, staging or production");
    }
}

module.exports = {
    checkActionInputs
}
