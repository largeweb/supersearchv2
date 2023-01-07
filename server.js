// simple express server running on port 3000
const app = require('express')();
const puppeteer = require('puppeteer');
app.use(require('body-parser').json());
const cheerio = require('cheerio');
const request = require('request');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT;
const exec = require('child_process').exec;

// let links = 0;
// let progress = 0;
let summaryPrompt = "provide a 3 paragraph summary for the following text as if you are a clown with creative ideas speaking in a wobbly fashion: "
let summarizeBeginPrompt = "summarize the following text: ";
let summarizeMidPrompt = ". [END OF SUMMARY] Now try to answer this following search query: "
let summarizeEndPrompt = "? your response: "

app.use(cors())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Methods', 'POST');
  next();
});

app.post('/ask', async(req, res) => {

    let api_key = process.env.API_KEY;
    let request = req.body.request;
    let artist = req.body.artist;
    let outputjsonstring = "";

    let scmd = '';

    if(artist=="travis_scott") {
        scmd = './scripts/openai-request ' + api_key + " 'you are travis scott and you are trying to be an amazing friend to one of you concert fans. you are going to response in a very genuine rapper style and always talk about the future of technology when you respond. here is your first fan to tell you something: " + request.replace(/'/g, '') + ". your response:'";
    } else if(artist=="kanye_west") {
        scmd = './scripts/openai-request ' + api_key + " 'you are kanye west and you are trying to be an amazing friend to one of you concert fans. you are going to response in a very genuine rapper style and always talk about the future of technology when you respond. here is your first fan to tell you something: " + request.replace(/'/g, '') + ". your response:'";
    } else if(artist=="snoop_dogg") {
        scmd = './scripts/openai-request ' + api_key + " 'you are snoop dogg and you are trying to be an amazing friend to one of you concert fans. you are going to response in a very genuine rapper style and always talk about the future of technology when you respond. here is your first fan to tell you something: " + request.replace(/'/g, '') + ". your response:'";
    } else if(artist=="nicki_minaj") {
        scmd = './scripts/openai-request ' + api_key + " 'you are nicki minaj and you are trying to be an amazing friend to one of you concert fans. you are going to response in a very genuine rapper style and always talk about the future of technology when you respond. here is your first fan to tell you something: " + request.replace(/'/g, '') + ". your response:'";
    } else if(artist=="god") {
        scmd = './scripts/openai-request ' + api_key + " 'you are god and you are trying to be an amazing friend to one of you concert fans. you are going to response in a very genuine rapper style and always talk about the future of technology when you respond. here is your first fan to tell you something: " + request.replace(/'/g, '') + ". your response:'";
    } else if(artist=="fortune_teller") {
        scmd = './scripts/openai-request ' + api_key + " 'you are fortune and you are trying to be an amazing friend to one of you concert fans. you are going to response in a very genuine rapper style and always talk about the future of technology when you respond. here is your first fan to tell you something: " + request.replace(/'/g, '') + ". your response:'";
    } else if(artist=="green_guy") {
        scmd = './scripts/openai-request ' + api_key + " 'you are green guy and you are trying to be an amazing friend to one of you concert fans. you are going to response in a very genuine rapper style and always talk about the future of technology when you respond. here is your first fan to tell you something: " + request.replace(/'/g, '') + ". your response:'";
    } else if(artist=="shadow") {
        scmd = './scripts/openai-request ' + api_key + " 'you are shadow people and you are trying to be an amazing friend to one of you concert fans. you are going to response in a very genuine rapper style and always talk about the future of technology when you respond. here is your first fan to tell you something: " + request.replace(/'/g, '') + ". your response:'";
    } else if(artist=="mario") {
        scmd = './scripts/openai-request ' + api_key + " 'you are mario and you are trying to be an amazing friend to one of you concert fans. you are going to response in a very genuine rapper style and always talk about the future of technology when you respond. here is your first fan to tell you something: " + request.replace(/'/g, '') + ". your response:'";
    } else if(artist=="steve_from_minecraft") {
        scmd = './scripts/openai-request ' + api_key + " 'you are steve from minecraft and you are trying to be an amazing friend to one of you concert fans. you are going to response in a very genuine rapper style and always talk about the future of technology when you respond. here is your first fan to tell you something: " + request.replace(/'/g, '') + ". your response:'";
    }

    console.log("user hit endpoint");
    console.log(request);
    console.log(scmd);
    let output = "";
    exec(scmd, (err, stdout, stderr) => {
        if (err !== null) console.log('exec error: ' + err);
        console.log("FINISHED:")
        console.log(stdout)
        outputjsonstring = stdout;
        res.json(JSON.parse(outputjsonstring));
    });

});

app.post('/scrape', async(req, res) => {
    console.log("user hit scrape endpoint");

    let link = req.body.link;
    let paragraphs1 = [];

    async function scrapeParagraphs(url) {

    // launch a new browser instance
    console.log("launching puppeteer browser")
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'],          ignoreHTTPSErrors: true, dumpio: false}); // create a new page
    const page = await browser.newPage();
    // navigate to the given URL
    await page.goto(url, { waitUntil: 'networkidle2' });
    // get the HTML content of the page
    const html = await page.content();
    // load the HTML into cheerio
    const $ = cheerio.load(html);
    // select all the paragraphs on the page
    const paragraphs = $('p');
    // create an array to store the paragraph text
    const paragraphText = [];
    // iterate over the paragraphs and add the text to the array
    paragraphs.each((i, element) => {
        paragraphText.push($(element).text());
    });
    // close the browser instance
    browser.close();
    // return the array of paragraph text
    return paragraphText;
    }

    await scrapeParagraphs(link).then(async paragraphs => {
        if(paragraphs.length >= 20) {
            console.log(paragraphs);
            paragraphs1.push(paragraphs);
        }
    })
    res.json(paragraphs1);
    console.log("server scrape finished")

});

app.post('/summarize', (req, res) => {
    scrapedData = req.body.scrape;
    if(scrapedData.length <= 20) {
        console.log("no summary");
        res.json(["no summary"]);
        return;
    }
    console.log('we got a summary')
    let request = summaryPrompt + scrapedData.toString().replace(/\s\s+/g, ' ').replace(/[\r\n]/gm, '').replace(/[’'"()]/g, ' ').substring(100,3000) + ".";
    // let request = "provide a summary for the following text: " + scrapedData.toString().replace("'", ' ').replace('"', ' ').replace('(', ' ').replace(')', ' ').substring(0,1000);
    const api_key = process.env.API_KEY;


    const scmd = './scripts/openai-request ' + api_key + " '" + request + "'";
    console.log(scmd);
    console.log("about to exec opai request")
    let output = "";
    exec(scmd, (err, stdout, stderr) => {
        if (err !== null) console.log('exec error: ' + err);
        console.log("FINISHED:")
        console.log(stdout)
        outputjsonstring = stdout;
        res.json(JSON.parse(outputjsonstring));
    });
});

app.post('/aggregate', (req, res) => {
    console.log("endpoint hit");
    let sum1 = req.body.sum1;
    let sum2 = req.body.sum2;
    let sum3 = req.body.sum3;
    let search = req.body.search;
    let request = summarizeBeginPrompt + sum1.toString() + ". " + sum2.toString() + ". "  + sum3.toString() + ".";
    request = request.replace(/\s\s+/g, ' ').replace(/[\r\n]/gm, '').replace(/[’'"()]/g, ' ') + summarizeMidPrompt + search + summarizeEndPrompt;
    const api_key = process.env.API_KEY;
    const scmd = './scripts/openai-request ' + api_key + " '" + request + "'";
    console.log(scmd);
    console.log("about to exec opai request")
    let output = "";
    exec(scmd, (err, stdout, stderr) => {
        if (err !== null) console.log('exec error: ' + err);
        console.log("FINISHED:")
        console.log(stdout)
        outputjsonstring = stdout;
        res.json(JSON.parse(outputjsonstring));
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6