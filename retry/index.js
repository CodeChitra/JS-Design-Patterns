function retryOperation(operation, retries, delay) {
  return new Promise((resolve, reject) => {
    function attemptOperation() {
      console.log("Retries Left: ", retries);
      operation()
        .then(resolve)
        .catch(() => {
          if (retries <= 0) {
            reject(new Error("Maximum retries exhausted!"));
          } else {
            retries--;
            setTimeout(attemptOperation, delay);
          }
        });
    }
    attemptOperation();
  });
}

function fetchData() {
  return fetch("https://jsonplaceholder.typicode.com/todos/1").then(
    (response) => response.json()
  );
}

retryOperation(fetchData, 3, 1)
  .then((data) => console.log("Finally Data Is Here: ", data))
  .catch(console.log);
