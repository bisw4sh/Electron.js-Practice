import { app, BrowserWindow } from "electron/main";
import path from "path";

const __dirname = (() => {
  let x = path.dirname(decodeURI(new URL(import.meta.url).pathname));
  return path.resolve(process.platform == "win32" ? x.substr(1) : x);
})();

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
