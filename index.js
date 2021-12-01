const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(async () => {
    try {
      // // Criando e acessando 1 objeto
      // const createdRecipe = await Recipe.create(data[0]);
      // const singleRecipe = await Recipe.findOne({
      //   title: "Asian Glazed Chicken Thighs",
      // });
      // // Criando vários objetos ao mesmo tempo
      const manyRecipe = await Recipe.insertMany(data);

      // Atualizando objeto
      const updatedRecipe = await Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
        { $set: { duration: 100 } },
        { new: true }
      );
      (await updatedRecipe.duration) === 100
        ? console.log(`Sucesso. A nova duração é: ${updatedRecipe.duration}!`)
        : console.log("Operação malsucedida.");

      // Deletando objeto

      const deletedRecipe = await Recipe.deleteOne({ title: "Carrot Cake" });
      console.log(deletedRecipe);
    } catch (err) {
      console.error(err);
    }
    await mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
