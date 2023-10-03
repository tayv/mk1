# Overview

The goal of this project was to learn React by creating a visual leaderboard for tracking Mario Kart race results. MK1 is a race league started during the Covid-19 pandemic.

See it in action at [https://mk1racing.netlify.app/](https://mk1racing.netlify.app/).

## Design

- Design is not polished. This was primarily a coding project with minimal time spent refinind visual design or interaction patters.
- Goal: Follow standard race league leaderboards while also allowing users the ability to quickly see rankings by season as well as all-time results.
- Logo designed by Steve A.
- If I ever have time the Avatars will be updated to pixel art.
- Pixel art background created by me using Figma

## Code

- Uses React for the UI and Google Sheets API to host/update data.
- There's a known async rendering issue with season results on initial page load. Can be fixed by triggering a re-render using the season dropdown.

## Examples

https://user-images.githubusercontent.com/48400779/174938723-ad73c9c8-f893-4e85-81ac-c16b88e2bc91.mov

<details>
  <summary>📸 <strong>More Screenshots</strong></summary>
<br>  
  
### Desktop
  
<img width="400" alt="Desktop - MK1 Final Season Standings" src="https://user-images.githubusercontent.com/48400779/174938863-5b683f06-7dcd-484b-8c20-eed5b8720fe0.png">

<img width="400" alt="Desktop - MK1 All-Time Championship Rank" src="https://user-images.githubusercontent.com/48400779/174938869-84048e83-7582-4cb2-bfa1-c59e094d3497.png">

### Mobile

<img width="250" alt="MK1 Mobile View" src="https://user-images.githubusercontent.com/48400779/174939203-4db54aaa-62e0-4d3b-acf6-d2991edf1d74.jpeg">

<br>
</details>

# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It uses Tailwind CSS along with Headless UI and HeroIcons for styling. See [Setting up Tailwind with CRA](https://tailwindcss.com/docs/guides/create-react-app) and [Tailwind Depencies](https://tailwindui.com/documentation#using-react). The data is stored in a Google Sheet which updates the UI via API calls using npm Google Sheet API wrapper package [google-spreadsheet](https://theoephraim.github.io/node-google-spreadsheet/#/).

## Available Scripts

In the project directory, you can run:

### `nvm use`

Switches to the correct node version as specified in `.nvmrc`

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

### If you add racers

If you add racers to a season or all time list then you should update the row limit number in `SeasonResults.js`. Remember Array count starts at 0 so limit should be total rows + 1:

- `const rowsSeasonList = await sheet.getRows({ limit: 15 })`

- `const rowsAllTime = await sheet.getRows({ limit: 24 })`

This will be made dynamic in the future but for now it's hardcoded in to prevent grabbing additional blank rows in the seasonX sheets.

### How to add a new season

1. Duplicate the prev season in Google Sheets

Each season should be its own sheet (copy previous season to use as template) and should follow the `seasonX` naming convention. The `SeasonResults.js` makes use of regex in its logic that depends on this. The latest season also typically has the most current formula logic as bug fixes have not always been completely applied to previous season sheets.

2. Read the comments on the Google Sheet before entering data so you enter data into the correct cells. At first glance there appears to be duplicate fields but this is only because some duplication is necessary to make use of sorting formulas.

3. Add new season to the season dropdown

- In `SeasonFilter.js`:

  Duplicate Listbox.Option and update value to match the season’s Google Sheet name

  ```
  <Listbox.Option value={"season4"}>
    {({ active, selected }) => (
      <span className={ active ? "flex items-center gap-2 py-2 pr-5 pl-3 bg-blue-500 text-white" : "left-0 flex items-center gap-2 py-2 pr-5 pl-3 bg-white"}>
      Season 4
      {selected && <CheckIcon className="w-5 h-5" aria-hidden="true" />}
    </span>
    )}
  </Listbox.Option>
  ```

4. Update the default season (shown on initial load)

e.g. ` Leaderboard.js``:  ` const [season, setSeason] = useState("season5”);`

5. Update Google sheets logic for new season

- Add new season/cell to each racers gold/silver/bronze/TT overall calculation On AllTime page
- Make sure any new racers get their own avatar and their all time leaderboard is tied to their respective cell on the current season sheet

### Google Sheets API

For any API changes refer to [google-spreadsheet documentation](https://theoephraim.github.io/node-google-spreadsheet/#/)

## Other notes

- Pixel art was created by me. The current avatars are screenshots from the Mario Kart 8 Deluxe but those will eventually (hopefully) get replaced by custom pixel art as I have time.

- This is a work in progress and there are several outstanding items. I may or may not get to these depending on whether I have other projects I'm more interested in.

To dos:

- Avatars, trophy emoji, and logo should use pixel art styling
- Team list: Need team specific avatar + text alignment needs fixing
- Add admin area to submit race results
- Add a checkered flag or Lakitu to signify finished seasons
- Auto calculate racer's position change after each race weekend
- Async fetching logic needs a refactor to prevent unnecessary async logic inside nested functions. Also have a bug where season data sometimes fails to display on initial render.
