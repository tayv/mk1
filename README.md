# Overview
The goal of this project was to create a visual leaderboard for tracking Mario Kart race results. It uses React for the UI and Google Sheets API host/update data. See it in action at [https://mk1racing.netlify.app/](https://mk1racing.netlify.app/).



https://user-images.githubusercontent.com/48400779/139181521-399eb58a-7588-40f9-925b-09eac07bd064.mov




# Getting Started 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It uses Tailwind CSS along with Headless UI and HeroIcons for styling. See [Setting up Tailwind with CRA](https://tailwindcss.com/docs/guides/create-react-app) and [Tailwind Depencies](https://tailwindui.com/documentation#using-react). The data is stored in a Google Sheet which updates the UI via API calls using npm Google Sheet API wrapper package [google-spreadsheet](https://theoephraim.github.io/node-google-spreadsheet/#/).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Things to be aware of

1. If you have more than 12 racers in a season then you should update the limit number in the printSeasonRows()   

```
const rowsSeasonList = await sheet.getRows({limit: 13});
```

This will be made dynamic in the future but for now it's hardcoded in to prevent grabbing additional blank rows in the seasonX sheets. Typically the maximum number of racers in a season is 12 since Mario Kart only supports 12 racers and we currently don't track stats for subs.


2. Each season should be its own sheet (copy previous season to use as template) and should follow the `seasonX` naming convention. The SeasonResults.js component makes use of regex in its logic that depends on this. The latest season also typically has the most current formula logic as bug fixes have not always been completely applied to previous season sheets.

3. Read the comments on the Google Sheet before entering data so you enter data into the correct cells. At first glance there appears to be duplicate fields but this is only because some duplication is necessary to make use of sorting formulas.

4. For any API changes refer to [google-spreadsheet documentation](https://theoephraim.github.io/node-google-spreadsheet/#/)

5. Pixel art was created by me. The current avatars are screenshots from the Mario Kart 8 Deluxe but those will eventually (hopefully) get replaced by custom pixel art as I have time.

6. This is a work in progress and there are several outstanding items. I may or may not get to these depending on whether I have other projects I'm more interested in.

To dos:

- Avatars, trophy emoji, and logo should use pixel art styling
- Team list: Need team specific avatar + text alignment needs fixing
- Add admin area to submit race results 
- Add a checkered flag or Lakitu to signify finished seasons
- Auto calculate racer's position change after each race weekend 


