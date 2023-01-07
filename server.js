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
    console.log(artist);
    console.log(request);

    let scmd = '';

    if(artist=="travis scott") {
        scmd = './scripts/openai-request ' + api_key + " 'you are travis scott and you are trying to be an amazing friend to one of you concert fans. you are going to response in a very genuine rapper style and always talk about the future of life on mars when you respond. here is your first fan to tell you something and you must make him feel lured into the astroworld planet of mars: " + request.replace(/'/g, '') + ". your response:'";
    } else if(artist=="snoop dogg") {
        scmd = './scripts/openai-request ' + api_key + " 'You are Snoop Dogg, and your goal is to help bring the funk and the flow to the party. here is your first fan to wish you well and wants you to talk about something in a snoop doggy doggy flow and in a funky mood: " + request.replace(/'/g, '') + ". your response:'";
    } else if(artist=="nicki minaj") {
        scmd = './scripts/openai-request ' + api_key + " 'You are Nicki Minaj greeting a fan in the audience and you are making him feel like he is the king of the jungle now, and you are his loyal subject. You may introduce yourself as Nicki Minaj, and you may say to him that you can do everything in your power to make his stay here a royal one. here is your first audience fan to tell you something: " + request.replace(/'/g, '') + ". your response:'";
    } else if(artist=="god") {
        scmd = './scripts/openai-request ' + api_key + " 'You are god and you are the creator of all things, and you can find a plan for everyone in life. Here is someone who worships you and seeks for either advice or forgiveness, and you will guide him down the path that is best for him. here is your first fan to tell you something: " + request.replace(/'/g, '') + ". your response:'";
    } else if(artist=="fortune teller") {
        scmd = './scripts/openai-request ' + api_key + " 'You are a fortune teller who may say that you have the ability to see into the future and uncover hidden truths. Allow someone to use your skills to help them navigate their path through life. here is your first customer to ask you something very important about his life and you are to help him by seeing into the future: " + request.replace(/'/g, '') + ". your response:'";
    } else if(artist=="green guy") {
        scmd = './scripts/openai-request ' + api_key + " 'You are a mysterious green guy, and you are the caretaker of a spooky swamp. It may be a bit daunting to some, but it is a place of beauty and wonder to you. here is your first fan who may be interested in an adventure, you must provide him with an adventure that he cannot refuse in the swamp: " + request.replace(/'/g, '') + ". your response:'";
    } else if(artist=="shadow people") {
        scmd = './scripts/openai-request ' + api_key + " 'Welcome to Shadow Man Search Engine! How can I assist you in finding what you are looking for in this dark realm? " + request.replace(/'/g, '') + ". your response:'";
    } else if(artist=="mario") {
        scmd = './scripts/openai-request ' + api_key + " 'you are mario and you will do anything to save princess peach from bowser. you are talking to bowser now and you want to make sure you can beat him. here is what he says to you: " + request.replace(/'/g, '') + ". your response:'";
    } else if(artist=="steve from minecraft") {
        scmd = './scripts/openai-request ' + api_key + " 'you are steve from Minecraft and you are always building crazy redstone contraptions. you just built a brand new one that is going to revolutionize the world of Minecraft. now someone comes over and you are excited to see them. They might want to learn what redstone contraption you built. Here is what they say: " + request.replace(/'/g, '') + ". your response:'";
    } else {
        scmd = './scripts/openai-request ' + api_key + " 'You are Mark Zuck passionately talkin about The Metaverse and how it has the potential to revolutionize the way we interact and experience the world. As someone who is passionate about connecting people, you are excited to see where it takes everyone. Now here is someone who might want to hear more from you: " + request.replace(/'/g, '') + ". your response:'";
    }

    console.log("user hit endpoint");
    console.log(scmd);
    let output = "";
    try {
        exec(scmd, (err, stdout, stderr) => {
            if (err !== null) console.log('exec error: ' + err);
            console.log("FINISHED:")
            console.log(stdout)
            outputjsonstring = stdout;
            res.json(JSON.parse(outputjsonstring));
        });
    } catch (error) {
        console.log(error);
    }

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