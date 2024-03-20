import fs from "fs";
import * as http from 'isomorphic-git/http/node/index.js';
import * as git from "isomorphic-git";

let dir = 'hazuki-dies';
let onAuth = () => ({ username: process.env.GITHUB_TOKEN });

(async () => {
  try {
    await git.clone({
      fs,
      http,
      dir,
      url: 'https://github.com/deusprogrammer/hazuki-dies-script.git',
      ref: 'main',
      singleBranch: true,
      depth: 10
    });
    await git.branch({ fs, dir, ref: 'test' });
    await git.checkout({ fs, dir, ref: 'test' });
    await git.push({ fs, http, dir, remote: 'origin', onAuth });
  } catch (e) {
    console.error(e);
  }
})();