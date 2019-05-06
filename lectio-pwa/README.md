# Lectio Web Application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Features

**v0.2.0**

- Set a memo's name and content
- Start/pause recording of a new memo
- Auto-transcribe a new memo
- Add/remove tags from a memo
- Create a new tag
- Delete a memo
- Update a memo's name, content and tags
- Play/pause a memo's recording

**Planned**

- View a memo's summary
- Search for memos
- Save data to cloud

## Target Web Browsers

Although we want to support as many web browsers as possible,
Lectio web application utilises some new API's that are not available in some browsers.
As a result, we can only guarantee some browsers that Lectio will run on.

- Chrome 49 or later
- Firefox 65 or later
- Opera 36 or later (_by spec, not tested_)
- Chrome for Android 49 or later
- Firefox for Android 36 or later (_by spec, not tested_)
- Opera for Android 36 or later (_by spec, not tested_)

## Required Web Browser Features

This list is used to specify the target web browsers above.

- Web Speech API
- MediaRecorder
- IndexedDB

## Available Scripts for Development

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Credits

[Realtime-search with React](https://codepen.io/eladrin201/pen/MawMdB). Allisan Betancourt

[Wait for User to Stop Typing, Using JavaScript](https://schier.co/blog/2014/12/08/wait-for-user-to-stop-typing-using-javascript.html). Gregory Schier