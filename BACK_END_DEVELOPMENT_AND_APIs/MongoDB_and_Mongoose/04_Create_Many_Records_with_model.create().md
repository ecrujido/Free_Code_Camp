## Create Many Records with model.create()

Sometimes you need to create many instances of your models, e.g. when seeding a database with initial data. Model.create() takes an array of objects like [{name: 'John', ...}, {...}, ...] as the first argument, and saves them all in the db.

Modify the createManyPeople function to create many people using Model.create() with the argument arrayOfPeople.

Note: You can reuse the model you instantiated in the previous exercise.

## Solution Link

```javaScript

const arrayOfPeople = [
  { name: 'Bruce Wayne', age: 30, favoriteFoods: ['Meat Loaf', 'bagel'] },
  { name: 'Dick Grayson', age: 21, favoriteFoods: ['Spaghetti', 'donut'] },
  { name: 'Clark Kent', age: 25, favoriteFoods: ['McDonalds Hamburger', 'KFC'] },
  { name: 'Diana Prince', age: 102, favoriteFoods: ['Wendy Hamburger', 'Cotton Candy', 'Pastries'] },
  { name: 'Barry Allen', age: 19, favoriteFoods: ['Burger King', 'Fillet Mignon', 'M&M Chocolate'] }
];

const createManyPeople = async (arrayOfPeople, done) => {
  try {
    const people = await Person.create(arrayOfPeople);
    done(null, people);
  } 
  catch (error) {
    console.error(error);
    done(error);
  }
};

```
