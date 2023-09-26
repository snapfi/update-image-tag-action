const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function getResourceNameFromFilename(filePath) {
  const fileName = path.basename(filePath);
  if (fileName === 'deployment.yaml') {
    return 'deployment';
  } else if (fileName === 'cronjob.yaml') {
    return 'cronjob';
  } else {
    return '';
  }
}

function insertYamlValue(folderPath, newImageTag) {
  if (!folderPath || !newImageTag) {
    console.error('Please provide a folder path and a new image tag as arguments.');
    process.exit(1);
  }

  try {
    // Function to recursively find YAML files in the folder
    function findYamlFiles(dir) {
      const files = [];
      fs.readdirSync(dir).forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          files.push(...findYamlFiles(filePath));
        } else if (file === 'deployment.yaml' || file === 'cronjob.yaml') {
          files.push(filePath);
        }
      });
      return files;
    }

    const yamlFiles = findYamlFiles(folderPath);

    if (yamlFiles.length === 0) {
      console.error('No deployment.yaml or cronjob.yaml files found in the specified folder.');
      process.exit(1);
    }

    // Iterate through the found YAML files
    for (const yamlFilePath of yamlFiles) {
      const yamlContent = fs.readFileSync(yamlFilePath, 'utf8');
      const resourceConfig = yaml.load(yamlContent);

      if (!resourceConfig) {
        console.error(`Failed to load the YAML file: ${yamlFilePath}`);
        continue;
      }

      const resourceName = getResourceNameFromFilename(yamlFilePath);

      // Update the image tag based on the resource type
      if (resourceName === 'deployment' || resourceName === 'cronjob') {
        const spec = resourceConfig.spec || resourceConfig.jobTemplate.spec;
        if (spec && spec.template && spec.template.spec && spec.template.spec.containers) {
          spec.template.spec.containers.forEach((container) => {
            container.image = `${container.image.split(':')[0]}:${newImageTag}`;
          });

          // Convert the updated configuration back to YAML
          const updatedYaml = yaml.dump(resourceConfig);

          // Write the updated YAML back to the file
          fs.writeFileSync(yamlFilePath, updatedYaml, 'utf8');

          console.log(`Image tag for ${resourceName} in ${yamlFilePath} updated successfully.`);
        } else {
          console.error(`Failed to update image tag in ${yamlFilePath}. ${resourceName} configuration is invalid.`);
        }
      } else {
        console.error(`Unsupported resource type in ${yamlFilePath}: ${resourceName}`);
      }
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

module.exports = insertYamlValue;