## Use model.find() to Search Your Database

In its simplest usage, Model.find() accepts a query document (a JSON object) as the first argument, then a callback. It returns an array of matches. It supports an extremely wide range of search options. Read more in the docs.

Modify the findPeopleByName function to find all the people having a given name, using Model.find() -> [Person]

Use the function argument personName as the search key.

## Solution Link

```javaScript

const findPeopleByName = async (personName, done) => {
  try {
    const personFound = await Person.find({ name: personName });
    done(null, personFound);
  } 
  catch (error) {
    console.error(error);
    done(error);
  }
};

```
