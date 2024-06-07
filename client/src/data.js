const data = require("./data.json"); // Ensure the path is correct
const fs = require("fs");

const structuredData = {
  types: {},
};

data.data.__schema.types.forEach((type) => {
  if (type.fields) {
    structuredData.types[type.name] = {
      fields: {},
    };
    type.fields.forEach((field) => {
      structuredData.types[type.name].fields[field.name] =
        field.type.name || (field.type.ofType && field.type.ofType.name);
    });
  }
});

fs.writeFile("schema.json", JSON.stringify(structuredData, null, 2), (err) => {
  if (err) {
    console.error("Error writing to file", err);
  } else {
    console.log("Schema written to schema.json");
  }
});
