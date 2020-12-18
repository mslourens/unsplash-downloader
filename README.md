# Unsplash Downloader
A node.js script to download unsplash pictures

## Required node.js version
This script is a module, so node.js should support that, either by using version `13.2.0` or higher, or adding the `--experimental-module` flag.

## Install 
- Run `npm install`
- Copy example.env and rename it .env
- Add the [Unsplash api key and secret](https://unsplash.com/oauth/applications) to this file

## Run script
```javascript
node index.js <KEYWORD> <AMOUNT_OF_PHOTOS>
```
**Example**

For downloading 10 nature related photos, run this command:
```javascript
node index.js nature 10
```
