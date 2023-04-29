const puppeteer = require("puppeteer");
const prompt = require("prompt-sync")();
const fs = require("fs");
const colors = require("colors");
const logUpdate = require("log-update");
const getData = require("./getData");

const log = logUpdate.create(process.stdout, {
  showCursor: true,
});
console.log("------------------------------------------------------------------------------------------");
console.log(
  "Web Scraping tool for --> https://www.nanotek.lk/ <-- website ".green.bold
);
console.log('Please be sure to use URL followed as https://www.nanotek.lk/categeries..* /search.. ect ')
console.log("------------------------------------------------------------------------------------------");

//https://www.nanotek.lk/category/graphic-cards

const run = async () => {
  
  let folder = ''
  let i2 = 1
  while(i2 > 0){
    folder = prompt('Enter a Folder Name For save Data :'.bold)
    try{
      fs.mkdirSync(folder ,{ flag: "wx" })
      console.log('Created !')
      i2 = 0
    }catch(err){
      console.log('folder already exist or Something went wrong'.bgRed)
      const tryAgainOrCloseProgram = prompt('Do you want to continue("y") or close("c") program :')
      if(tryAgainOrCloseProgram == 'y'){
        i2++
      }else if(tryAgainOrCloseProgram == 'c'){
        i2 = -1
      }else{
        console.log('Something went wrong! Try again'.bgRed)
        i2++
      }
    }
  }
  
  const browser = await puppeteer.launch({ headless: "new" });
  //--
  console.log("---------------->".blue);
  const page = await browser.newPage();

  const pageLink = "https://www.nanotek.lk"; // change when edit

  let i = 1;
  while (i > 0 && i2 == 0) {
    const usrInput = prompt(
      "Enter the URL".bold +
        '(if you want to stop the scraping type "close")' +
        ":".bold
    );
    const pageDomain = usrInput.slice(0, 22); // change when edit

    if (usrInput == "close") {
      i = 0;
    } else if (pageDomain == pageLink) {
      //all the things
      console.log(`reaching: ${usrInput}`.blue);
      // loading animation
      const frames = ["-", "/", "|", "\\"];
      let x = 0;
      const load1 = setInterval(() => {
        const frame = frames[x++ % frames.length];
        log(frame);
      }, 100);

      await page.goto(usrInput);
      clearInterval(load1);
      console.log("Collecting DATA...".blue);
      const details = await getData(page);
      const fileName = `${folder}/data_${i}.json`;
      try {
        fs.writeFileSync(fileName, JSON.stringify(details), { flag: "wx" });
        console.log(`File saved to ${fileName}`.green);
      } catch (err) {
        console.log("can not save the file. Because file already exist".bgRed);
      }
      i++;
    } else if (usrInput == "") {
      console.log(
        "Something went wrong! Please check the URL and try again.".bgRed
      );
    } else {
      console.log(
        "Something went wrong! Please check the URL and try again.".bgRed
      );
    }
  }

  await browser.close();
};
//run the command to start
run();
