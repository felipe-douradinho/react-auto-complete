# React.js Auto Complete (TypeScript)

This project was developed by Felipe D. because of Hire Otter Test.


## Notes

- No naming conventions or folder structure being observed

## Features

- Local (dummy) search
- Live (remote/api) async fetching
- Debouncing typing

## ScreenShots

![Live](https://github.com/[felipe-douradinho]/react-auto-complete/blob/master/print_live.png?raw=true)
![Dummy](https://github.com/[felipe-douradinho]/react-auto-complete/blob/master/print_dummy.png?raw=true)


## Available Scripts

In the project directory, you can run:

### `npm install` (install all dependencies)

### `npm start` (Runs the app in the development mode.)
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


## Known Issues

- When selecting an option, it returns again to the selection of the 
option (some detail with flag, unfortunately I had little time to dedicate)


## The Test Rules

Please prepare an auto-complete component in React TypeScript.
1. You cannot use any 3rd party libraries - only pure React and internal DOM functions.
2. You should use typescript and write proper interfaces and types.
3. The function to filter the data should be asynchronous. You can use mock data (such as a JSON array), but the function which uses it should be asynchronous (similar to a real REST call).
4. It should have basic working CSS. No need for anything fancy (such as drop- shadows etc), but should look decent.
5. You need to handle all non-standard/edge use-cases - it should have a perfect user-experience.
6. Highlight the matching part of the text, in addition to showing it.
7. No external state management libraries (refer to #1 as well), only native React method.
8. Use only functional component with hooks.
9. Shortcuts and hacks are perfectly ok - but you have to add comments on what are you doing there and why. You should either write production ready code or include comments on what needs to be changed for production.
10. Add a README.md file explaining how to run the project.
11. Bonus #1: load data using a real API call to some resource.