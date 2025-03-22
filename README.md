
# Viewing the LIVE project:

This project has been deployed, so you can access the live application here:
https://mock-ux.onrender.com/

# Running the project in development mode:


To open up the projec locally in dev mode, there are two options:

You can either:

- open the project in a github codespace (in the cloud)
- clone it and run it locally on your machine


### opening it in a codespace :

1) open up the current active codespace in this repo: (click the green "code" button on the right of ths repo, and click on "codespaces")
2) click on the active codespace (fantastic space trout) and, once the container builds, open up a terminal session in vscode and type
```cd Mock_UX``` 
to go into the source directory.

3) then, in the terminal, type ``` npm run dev``` to run the project in development mode. A prompt should appear asking you if you want to view the the running project in a separate browser tab.

### it locally:
1. Install Prerequisites 🛠️

Before you begin, make sure you have these installed:

✅ Node.js (Download from nodejs.org)
✅ Git (Download from git-scm.com)
✅ A Code Editor (Recommended: VS Code)

1) Open up a terminal/command prompt and navigate to where you want to clone the project.
2) Copy the repository URL from GitHub: https://github.com/Beatrix-droid/mock-ux.git and in that the terminal, run this command:
` https://github.com/Beatrix-droid/mock-ux.git `
3) Move into the project folder: `cd mock-ux/Mock_UX`
4) install the dependencies by running in the terminal `npm install`
5) after the installation is complete, you can start the development server: by running `npm run dev`
6)  This will launch the project, and you should see something like:  VITE vX.X.X ready in Xms
  ➜  Local: http://localhost:5173/
7) Open the link in your browser (http://localhost:5173/) to see the app running

Optionally, if you run into errors:
Ensure you're using the right Node.js version (`node -v to check`).
Try deleting node_modules and reinstalling:


`rm -rf node_modules package-lock.json`  # For Mac/Linux
`del /s /q node_modules package-lock.json`  # For Windows
`npm install`