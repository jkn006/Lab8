describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    let entry = await page.$$('journal-entry');
    const [response] = await Promise.all([
      entry[0].click(),
      page.waitForNavigation()
    ]);
    const urlStr = await page.url();
    let length = urlStr.length;
    expect(urlStr.substring(length - 8, length)).toBe('/#entry1');

  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    await page.waitForSelector('h1');
    const text = await page.evaluate(() => document.querySelector('h1').textContent);
    expect(text).toBe('Entry 1');

  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
    await page.waitForSelector('entry-page');
    let entry = await page.$('entry-page');
    let content = await entry.getProperty('entry');
    let info = await content.jsonValue();

    expect(info.title).toBe('You like jazz?');
    expect(info.date).toBe('4/25/2021');
    expect(info.content).toBe("According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.");
    expect(info.image.alt).toBe('bee with sunglasses');
    expect(info.image.src).toBe('https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455');

  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    await page.waitForSelector('body');
    let bodyClass = await page.evaluate(() => document.querySelector('body').className);
    expect(bodyClass).toBe('single-entry');
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    await page.click('header > img');
    const urlStr = await page.url();
    let length = urlStr.length;
    expect(urlStr.substring(length - 10, length)).toBe('/#settings');
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    await page.waitForSelector('h1');
    const text = await page.evaluate(() => document.querySelector('h1').textContent);
    expect(text).toBe('Settings');

  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    await page.waitForSelector('body');
    let bodyClass = await page.evaluate(() => document.querySelector('body').className);
    expect(bodyClass).toBe('settings');

  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    const urlStr = await page.url();
    let length = urlStr.length;
    expect(urlStr.substring(length - 8, length)).toBe('/#entry1');
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button once, URL should be home page', async() => {
    await page.goBack();
    const urlStr = await page.url();
    let length = urlStr.length;
    expect(urlStr.substring(length-1, length)).toBe('/');
  });


  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('Test12: Home page header title should be Journal Entries', async() => {
    await page.waitForSelector('h1');
    const text = await page.evaluate(() => document.querySelector('h1').textContent);
    expect(text).toBe('Journal Entries');
  });


  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13: On Home page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    await page.waitForSelector('body');
    let bodyClass = await page.evaluate(() => document.querySelector('body').className);
    expect(bodyClass).toBe('');

  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Clicking second <journal-entry>, new URL should contain /#entry2', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    let entry = await page.$$('journal-entry');
    const [response] = await Promise.all([
      entry[1].click(),
      page.waitForNavigation()
    ]);
    const urlStr = await page.url();
    let length = urlStr.length;
    expect(urlStr.substring(length - 8, length)).toBe('/#entry2');

  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: Entry page 2 header title should be Entry 2', async() => {
    await page.waitForSelector('h1');
    const text = await page.evaluate(() => document.querySelector('h1').textContent);
    expect(text).toBe('Entry 2');
  });


  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test 16: Verify content of entry page after clicking on the second entry', async() => {
    await page.waitForSelector('entry-page');
    let entry = await page.$('entry-page');
    let content = await entry.getProperty('entry');
    let info = await content.jsonValue();

    expect(info.title).toBe('Run, Forrest! Run!');
    expect(info.date).toBe('4/26/2021');
    expect(info.content).toBe("Mama always said life was like a box of chocolates. You never know what you're gonna get.");
    expect(info.image.alt).toBe('forrest running');
    expect(info.image.src).toBe('https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg');
  }, 10000);

  // create your own test 17
  it('Test 17: Check clicking on header returns user to home page', async() => {
    await page.click('header > h1');
    const urlStr = await page.url();
    let length = urlStr.length;
    expect(urlStr.substring(length-1, length)).toBe('/');
  });

  // create your own test 18
  it('Test 18: Clicking on the fourth entry takes you to the correct URL', async() => {
    let entry = await page.$$('journal-entry');
    const [response] = await Promise.all([
      entry[3].click(),
      page.waitForNavigation()
    ]);
    const urlStr = await page.url();
    let length = urlStr.length;
    expect(urlStr.substring(length - 8, length)).toBe('/#entry4');
  });

  // create your own test 19
  it('Test 19: Check to see if the content on the page is correct audio included', async() =>{
    await page.waitForSelector('entry-page');
    let entry = await page.$('entry-page');
    let content = await entry.getProperty('entry');
    let info = await content.jsonValue();

    expect(info.title).toBe("You're a wizard, Harry");
    expect(info.date).toBe('4/28/2021');
    expect(info.content).toBe("Hmm, difficult. VERY difficult. Plenty of courage, I see. Not a bad mind, either. There's talent, oh yes. And a thirst to prove yourself. But where to put you? Not Slytherin. Not Slytherin. Not Slytherin, eh? Are you sure? You could be great, you know. It's all here in your head. And Slytherin will help you on the way to greatness, there's no doubt about that. No? Please, please. Anything but Slytherin, anything but Slytherin. Well if you're sure, better be... GRYFFINDOR!");
    expect(info.image.alt).toBe('harry looking up at the sorting hat');
    expect(info.image.src).toBe('https://w7w5t4b3.rocketcdn.me/wp-content/uploads/2019/01/harry-potter-sorting-hat-wrong.jpg');
    expect(info.audio).toBe('https://drive.google.com/uc?export=download&id=1Orwnly-OMhNt83tb-SAWt6Y3S6AYQgkk');
  }, 10000);

  // create your own test 20
  it('Test 20: Check to see if back and forwards buttons are working. Back should send us to home and forward should send us to Entry 4 Again', async() => {
    await page.goBack();
    const urlStr = await page.url();
    let length = urlStr.length;
    expect(urlStr.substring(length-1, length)).toBe('/');
    await page.goForward();
    const newURL = await page.url();
    let length2 = newURL.length;
    expect(newURL.substring(length2 - 8, length2)).toBe('/#entry4');
  });
});
