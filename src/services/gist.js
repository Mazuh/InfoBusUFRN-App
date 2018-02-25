export const retrieveAllSchedules = async (url) => {
  let references = [];

  try {
    let response = await fetch(url);
    const data = await response.json();

    data.content.busEndpoints.forEach(element => {
      references.push(element.reference);
    });

    return references;
  } catch (e) {
    throw(e);
  }
}