import puppeteer from "puppeteer";

const url = "https://www.crimsonhairsalon.ca/";

const main = async () => {

	const urls = ["https://www.crimsonhairsalon.ca/", "https://fringehair.ca/", "https://zahrasalonandspa.ca/", "https://modsalon.ca/", "https://www.orahspasalon.com/", "https://burkehairlounge.com/"]
	const browser = await puppeteer.launch();
	const pages = await Promise.all(urls.map(async (url) => await browser.newPage()));
	const metaTagsByURL = {};

	for (let i = 0; i < urls.length; i++) {
		const page = pages[i];
		await page.goto(urls[i]);

		const metaTags = await page.$$eval('head meta[name], head meta[property]', metaElements => {
			return metaElements.map(element => {
				const name = element.getAttribute('name');
				const property = element.getAttribute('property');
				const content = element.getAttribute('content');
				return { name, property, content };
			});
		});

		metaTagsByURL[urls[i]] = metaTags;
	}

	localStorage.setItem('tags', metaTagsByURL);
	

	// Convert the object to JSON string
	// const metaTagsByURLJSON = JSON.stringify(metaTagsByURL, null, 2);



	// Write the JSON string to a file
	// fs.writeFile('metaTagsByURL.json', metaTagsByURLJSON, err => {
	// 	if (err) {
	// 		console.error('Error writing file:', err);
	// 		return;
	// 	}
	// 	console.log('metaTagsByURL.json has been saved successfully.');
	// });

	await browser.close();
}
