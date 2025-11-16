const express = require('express');
const app = express();
const port = 8001;

const URL = require('./models/url');
const urlroute = require('./routes/url');
const { conectToMongoDb } = require('./connect');

conectToMongoDb("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("mongodb started"));

app.use(express.json());

// Redirect route
app.get('/:shortid', async (req, res) => {
  const shortid = req.params.shortid;

  // Find entry
  const entry = await URL.findOneAndUpdate(
    { shortId: shortid },
    {
      $push: {
        visitHistory: { timestamp: new Date() }
      }
    },
    { new: true }
  );

  if (!entry) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  return res.redirect(entry.redirectUrl);
});

app.use('/url', urlroute);

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
