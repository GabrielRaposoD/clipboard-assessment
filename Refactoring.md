# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

After a quick look into the code, there was an apparent excess use of if statements with redundant checks and some reusable functions. I got around that creating an initial check for the event parameter; when it is undefined, the code will return the trivialKey, making it easier to understand that the event is a valid value after that line of code. After that, I made a function to determine the candidate based on the validity of the partitionKey key value of the event; if it is undefined, it will use the hashed value of the event - which is created using the hashData function, which is used on the check for the length of the partition key as well - as its return value otherwise it will use the value of the event.partitionKey. Overall the code has fewer if statements and newer utility functions that can be reused while maintaining the same logic as before.
