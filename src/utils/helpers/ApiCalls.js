export const getDataFromServer = ({ type, apiUrl, result, data }) => {
  // Define the fetch options
  const fetchOptions = {
    method: type ?? "GET", // Set the HTTP method (GET or POST) if undefined it will set GET by default
    // Include the request data for POST requests (if provided)
    body: type === "POST" ? JSON.stringify(data) : undefined,
  };

  // Fetch data from the API
  return fetch(apiUrl, fetchOptions)
    .then((response) => {
      if (!response.ok) {
        // Handle error response
        throw new Error("Network response was not ok");
      }
      // Parse the response as JSON and return the result
      return response.json();
    })
    .then((data) => {
      // If there is a 'result' callback function provided, pass the data to it
      if (typeof result === "function") {
        result(data);
      }
      // Return the data
      return data;
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch
      console.error("Error fetching data:", error);
      throw error;
    });
};
