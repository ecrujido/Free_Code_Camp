## Use model.findOne() to Return a Single Matching Document from Your Database

Model.findOne() behaves like Model.find(), but it returns only one document (not an array), even if there are multiple items. It is especially useful when searching by properties that you have declared as unique.

Modify the findOneByFood function to find just one person which has a certain food in the person's favorites, using Model.findOne() -> Person. Use the function argument food as search key.

## Solution

```javaScript

const findOneByFood = async (food, done) => {
  try {
    const data = await Person.findOne({ favoriteFoods: food });
    done(null, data);
  } 
  catch (error) {
    console.error(error);
    done(error);
  }
};

```
