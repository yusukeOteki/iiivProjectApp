/* eslint no-console:0 */
var winstaller = require('electron-winstaller');

winstaller.createWindowsInstaller({
  appDirectory: './builds/windows/iiivProject-win32-x64/',
  outputDirectory: './builds/windows/installer64',
  authors: 'oteki',
  exe: 'iiivProject.exe'
})
  .then(() => console.log('It worked!'))
  .catch(e => console.log(`No dice: ${e.message}`));