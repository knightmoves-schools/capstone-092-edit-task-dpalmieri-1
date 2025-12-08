const http = require("http");
const fs = require("fs");
const puppeteer = require("puppeteer");
const { assert } = require("console");

let server;
let browser;
let page;

beforeAll(async () => {
  server = http.createServer(function (req, res) {
    fs.readFile(__dirname + "/.." + req.url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  });

  server.listen(process.env.PORT || 3000);
});

afterAll(() => {
  server.close();
});

beforeEach(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto("http://localhost:3000/index.html");
});

afterEach(async () => {
  await browser.close();
});

describe('the index.js file', () => {
  it('should populate the description and the status fields when edit is selected on a task', async function() {
    await page.evaluate(() => {
      document.getElementById('edit-task-0').click();
    });
    
    const description = await page.evaluate(() => {
      return document.getElementById('task-description').value;
    });

    const status = await page.evaluate(() => {
      return document.getElementById('task-status').value;
    });
    
    expect(description).toBe('pack spikes for track meet');
    expect(status).toBe('todo');
  });

  it('should populate a new, hidden form field with the task id', async function() {
    const type = await page.evaluate(() => {
      let id = document.getElementById('task-id');
      return id.getAttribute('type')
    });
    
    expect(type).toBe('hidden');
  });

  it('should change the display text on the add-task button from Add to Update', async function() {
    await page.evaluate(() => {
      document.getElementById('edit-task-0').click();
    });

    const addTaskButtonText = await page.evaluate(() => {
      return document.getElementById('add-task').innerHTML;
    });
    
    expect(addTaskButtonText).toBe('Update');
  });

  it('should update the task by id when the Update button is pressed', async function() {
    const todoCardsBefore = await page.$$eval('#todo-cards > .card', (results) => results );
    expect(todoCardsBefore.length).toBe(3);
    
    const doingCardsBefore = await page.$$eval('#doing-cards > .card', (results) => results );
    expect(doingCardsBefore.length).toBe(2);
    
    await page.evaluate(() => {
      document.getElementById('edit-task-0').click();
      document.getElementById('task-description').value = 'test description';
      document.getElementById('task-status').value = 'doing';
      document.getElementById('add-task').click();
    });
    
    const todoCardsAfter = await page.$$eval('#todo-cards > .card', (results) => results );
    expect(todoCardsAfter.length).toBe(2);
    
    const doingCardsAfter = await page.$$eval('#doing-cards > .card', (results) => results );
    expect(doingCardsAfter.length).toBe(3);
    
    const card = await page.evaluate(() => {
      return document.querySelector('#task-0').innerHTML;
    });
    
    expect(card).toContain('test description');
  });

  it('should clear out all of the form fields after the Update button is pressed', async function() {
    await page.evaluate(() => {
      document.getElementById('edit-task-0').click();
      document.getElementById('task-description').value = 'test description';
      document.getElementById('task-status').value = 'doing';
      document.getElementById('add-task').click();
    });
    
    const id = await page.evaluate(() => {
      return document.getElementById('task-id').value;
    });

    const description = await page.evaluate(() => {
      return document.getElementById('task-description').value;
    });

    const status = await page.evaluate(() => {
      return document.getElementById('task-status').value;
    });
    
    expect(id).toBe('')
    expect(description).toBe('')
    expect(status).toBe('todo');
  });

  it('should reset the add-task button text after the Update button is pressed back to Add', async function() {
    await page.evaluate(() => {
      document.getElementById('edit-task-0').click();
      document.getElementById('task-description').value = 'test description';
      document.getElementById('task-status').value = 'doing';
      document.getElementById('add-task').click();
    });
    
    const addTaskButtonText = await page.evaluate(() => {
      return document.getElementById('add-task').innerHTML;
    });
    
    expect(addTaskButtonText).toBe('Add');
  });
});
