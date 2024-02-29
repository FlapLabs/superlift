const createURL = (path) => {
  return window.location.origin + path;
};

export const makeDiet = async ({ userData }) => {
  try {
    const res = await fetch(
      new Request(createURL("/api/create-diet"), {
        method: "POST",
        body: JSON.stringify(userData),
      })
    );

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
