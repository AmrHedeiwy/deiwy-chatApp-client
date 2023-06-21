const serverURL = 'http://localhost:3000';

export const requestToServer = async (routeURL, method, body) => {
  const params = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };

  try {
    const result = await fetch(serverURL + routeURL, params).then(
      (response) => {
        if (response.ok) return response.json();
        throw response;
      }
    );
    console.log(result);
  } catch (err) {
    const errorObject = JSON.parse(await err.text());

    // For server errors
    if (err.status === 500) {
      return errorObject.message;
    }

    // For validation and constrain errors.
    return errorObject;
  }
};
