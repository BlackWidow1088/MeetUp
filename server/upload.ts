const IncomingForm = require('formidable').IncomingForm;
const fs = require('fs-extra');    //File System-needed for renaming file etc

module.exports = function upload(req, res) {
  const form = new IncomingForm();

  form.on('file', (field, file) => {
    console.log(file.fileUploaded);

    // Do something with the file
    // e.g. save it to the database
    // you can access it using file.path
    fs.rename(file.name, './user/dummy.txt', function(err) {
      if (err)
        throw err;
      console.log('renamed complete');
    });
  });
  form.on('end', () => {
    res.json();
  });
  form.parse(req);
};
