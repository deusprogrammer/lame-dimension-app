import fs from 'fs';

export let processAssets = (assetsPath) => {
    let emotes = fs.readdirSync(assetsPath + "/sprites", { withFileTypes: true });
    let characterObject = {};

    emotes.filter((file) => file.isDirectory()).forEach((file) => {
        let emoteName = file.name;
        let characters = fs.readdirSync(assetsPath + "/sprites/" + file.name);
        characters.filter(file => !file.startsWith(".")).forEach(characterName => {
            characterName = characterName.replace(emoteName, "").replace("spr_", "");
            if (!characterObject[characterName]) {
                characterObject[characterName] = {
                    name: characterName,
                    emotes: []
                };
            }
            characterObject[characterName].emotes.push(emoteName);
        });
    });

    return characterObject;
}