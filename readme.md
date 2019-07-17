# viz-starter

This repository serves as very simple boilerplate for creating visualizations and other small web projects. Webcack is configured to allow ES6 sytax, async/await, and local imports of information stored in CSV or JSON files.

## Instructions

1. Download required packages: `npm install`
2. Add data files to `src/data`
3. Run webpack dev server: `npm run serve`
4. To build, change the mode in the Webpack config file to `production` and run `npm run build`

**Notes:**

When referencing local data files (ex., using `d3.csv` to fetch a CSV file), you must import the file into one of the one of JS files that get bundled together by Webpack. Webpack will process the file and add it to `dist/data`, which is how the path should be referenced by your code's fetch request.

For example, this is how you would asyncronously use D3's `csv` method to request a local CSV file:

```javascript
import { csv } from 'd3-fetch'

import '../data/data.csv'

const processCSVFile = async () => {
    const data = await csv('../data/example-data.csv')
    console.log(data)
}

processCSVFile()

```

An example of this process is also included in the base files (see `src/data/example-data.csv` and `src/scripts/index.js`)