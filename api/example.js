exports.get = async function(req, res) {
  await saveData();

  res.send({
    id: 1234,
    moreData: {
      name: "This is an example"
    }
  });
}

async function saveData() {
  // Dummy function
}