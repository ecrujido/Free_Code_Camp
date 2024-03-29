## Delete One Document Using model.findByIdAndRemove
findByIdAndRemove and findOneAndRemove are like the previous update methods. They pass the removed document to the db. As usual, use the function argument personId as the search key.

Modify the **removeById** function to delete one person by the person's _id. You should use one of the methods **findByIdAndRemove()** or **findOneAndRemove()**.

## Solution

```javaScript

const removeById = async (personId, done) => {
  try {
    const removedDoc = await Person.findByIdAndRemove(personId);
    done(null, removedDoc);
  } 
  catch (error) {
    console.error(error);
    done(error);
  }
};

```
