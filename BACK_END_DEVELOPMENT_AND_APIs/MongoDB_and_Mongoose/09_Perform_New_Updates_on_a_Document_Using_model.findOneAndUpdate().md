## Perform New Updates on a Document Using model.findOneAndUpdate()
Recent versions of Mongoose have methods to simplify documents updating. Some more advanced features (i.e. pre/post hooks, validation) behave differently with this approach, so the classic method is still useful in many situations. **findByIdAndUpdate()** can be used when searching by id.

Modify the findAndUpdate function to find a person by Name and set the person's age to 20. Use the function parameter personName as the search key.

Note: You should return the updated document. To do that, you need to pass the options document { new: true } as the 3rd argument to **findOneAndUpdate()**. By default, these methods return the unmodified object.

## Solution

```javaScript

const findAndUpdate = async (personName, done) => {
  const newAge = 20;

  try {
    const updatedDoc = await Person.findOneAndUpdate(
      { name: personName },
      { age: newAge },
      { new: true }
    );
    done(null, updatedDoc);
  } 
  catch (error) {
    console.error(error);
    done(error);
  }
};

```
