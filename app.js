const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Shutdown and Restart Button</title>
      </head>
      <body style="background-color: #0093E9;
      background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
       display:grid; place-items:center; margin:0; padding:0;
      ">
        <h2 style="display:flex;justify-content:center;color:white;">Click the button to shut down or restart your PC</h2>
        <div style="display:flex; flex-direction:row; justify-content:center; gap:30px;">
        <form action="/shutdown" method="POST">
          <button style="cursor:pointer;width:100px;height:40px; background-color:black; color:white; border:none;" type="submit;" onmouseover="this.style.backgroundColor='red';" onmouseout="this.style.backgroundColor='blue';">Shutdown</button>
        </form>
        <form action="/restart" method="POST">
          <button style="cursor:pointer;width:100px;height:40px; background-color:black; color:white; border:none;" type="submit" onmouseover="this.style.backgroundColor='red';" onmouseout="this.style.backgroundColor='blue';">Restart</button>
        </form>
        </div>
      </body>
    </html>
  `);
});

app.post('/shutdown', (req, res) => {
  exec('shutdown /s /t 0', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`);
      res.send('Error shutting down.');
    } else {
      console.log('Shutting down...');
      res.send('Shutting down...');
    }
  });
});

app.post('/restart', (req, res) => {
  exec('shutdown /r /t 0', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`);
      res.send('Error restarting.');
    } else {
      console.log('Restarting...');
      res.send('Restarting...');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
