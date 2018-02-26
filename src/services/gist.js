export const retrieveAllSchedules = async (url) => {
  const references = [];

  const data = await (await fetch(url)).json();
  data.content.busEndpoints.forEach(element => {
    references.push(element.reference);
  });

  return references;
}
