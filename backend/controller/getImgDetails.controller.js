const Tesseract = require("tesseract.js");

const getImageDetails = async (req, res) => {
  let imgText = req.body.files;
  await Tesseract.recognize(imgText, "eng")
    .then(({ data: { text } }) => {
      return res.status(200).send(text);
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
};

module.exports = { getImageDetails };
