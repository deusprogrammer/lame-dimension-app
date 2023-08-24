import path from 'path';
import fs from 'fs';
import simpleGit from 'simple-git';

(async () => {
    const remoteDir = path.join(process.cwd(), 'test-clone');
    const localDir = path.join(process.cwd(), 'test-clone-branch');
    fs.mkdirSync(remoteDir);
    fs.mkdirSync(localDir);
    fs.writeFileSync(`${remoteDir}/script.json`, JSON.stringify({
        'foo': 'bar'
    }));
    let remoteGit = simpleGit(remoteDir);
    let localGit = simpleGit(localDir);
    await remoteGit.init().add('.').commit('initial-commit');
    await localGit.clone(remoteDir, '.');
})();