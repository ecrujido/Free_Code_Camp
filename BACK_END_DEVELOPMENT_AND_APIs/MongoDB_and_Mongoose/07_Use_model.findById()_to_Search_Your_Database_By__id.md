## Use model.findById() to Search Your Database By _id

When saving a document, MongoDB automatically adds the field _id, and set it to a unique alphanumeric key. Searching by _id is an extremely frequent operation, so Mongoose provides a dedicated method for it.

Modify the findPersonById to find the only person having a given _id, using Model.findById() -> Person. Use the function argument personId as the search key.

## Solution Link

```javaScript

const findPersonById = async (personId, done) => {
  try {
    const data = await Person.findOne({ _id: personId });
    done(null, data);
  } 
  catch (error) {
    console.error(error);
    done(error);
  }
};

```
