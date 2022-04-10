require("../models/database");
const Category = require("../models/Category");
const Recipe = require("../models/Recipe");

// Homepage
exports.homepage = async (req, res) => {
  try {
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);
    const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);

    const thai = await Recipe.find({ category: "Thai" }).limit(limitNumber);
    const american = await Recipe.find({ category: "American" }).limit(
      limitNumber
    );
    const chinese = await Recipe.find({ category: "Chinese" }).limit(
      limitNumber
    );

    const food = { latest, thai, american, chinese };

    res.render("index", { title: "Cooking Blog - Home", categories, food });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occored" });
  }
};

// Categories

exports.exploreCategories = async (req, res) => {
  try {
    const limitNumber = 20;
    const categories = await Category.find({}).limit(limitNumber);
    res.render("categories", {
      title: "Cooking Blog - Categories",
      categories,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occored" });
  }
};

// Recipes

exports.exploreRecipe = async (req, res) => {
  try {
    let recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);
    res.render("recipe", {
      title: "Cooking Blog - Recipe",
      recipe,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occored" });
  }
};

// Categories By Id

exports.exploreCategoriesById = async (req, res) => {
  try {
    let categoryId = req.params.id;
    const limitNumber = 20;
    const categoryById = await Recipe.find({ category: categoryId }).limit(
      limitNumber
    );

    res.render("categories", {
      title: "Cooking Blog - Categories",
      categoryById,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occored" });
  }
};

// Search

exports.searchRecipe = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;

    let recipe = await Recipe.find({
      $text: { $search: searchTerm, $diacriticSensitive: true },
    });

    res.render("search", { title: "Cooking Blog - Seach", recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occored" });
  }
};

// Explore latest

exports.exploreLatest = async (req, res) => {
  try {
    const limitNumber = 20;
    const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);

    res.render("explore-latest", {
      title: "Cooking Blog - Explore Latest",
      recipe,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occored" });
  }
};

// Explore Random

exports.exploreRandom = async (req, res) => {
  try {
    let count = await Recipe.find().countDocuments();
    let ramdon = Math.floor(Math.random() * count);
    let recipe = await Recipe.findOne().skip(ramdon).exec();

    res.render("explore-randow", {
      title: "Cooking Blog - Explore Randow",
      recipe,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occored" });
  }
};

// Submit Recipe

exports.submitRecipe = async (req, res) => {
  const infoErrorObj = req.flash('infoErrors')
  const infoSubmitObj = req.flash('infoSubmit')

  res.render("submit-recipe", { title: "Cooking Blog - Submit Recipe", infoErrorObj, infoSubmitObj });
};

exports.submitRecipeOnPost = async (req, res) => {
  try {
    
    const newRepice = new Recipe({
      name: "new chokola",
      description: "lorem ipsum this is a fay oh jone when you name my name is ray",
      email: "hello@gmail.com",
      ingredients: 'Water',
      category: "Mexican",
      image: "chocolate-banoffe-whoopie-pies.jpg"
    })

    await newRepice.save();

    res.flash('infoSubmit', 'Recipe has been added')
    res.redirect('/submit-recipe')
  } catch (error) {
    res.flash('infoErrors', error)
    res.redirect('/submit-recipe')
  }

};

