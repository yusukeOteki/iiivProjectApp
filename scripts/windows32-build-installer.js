/* eslint no-console:0 */
var winstaller = require('electron-winstaller');

winstaller.createWindowsInstaller({
  appDirectory: './builds/windows/iiivProject-win32-ia32/',
  outputDirectory: './builds/windows/installer32',
  authors: 'oteki',
  exe: 'iiivProject.exe'
})
  .then(() => console.log('It worked!'))
  .catch(e => console.log(`No dice: ${e.message}`));