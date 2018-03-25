/**
 * Parses data fetched from Gist by `constants.gist.DATA_GIST_ENDPOINT`.
 */

/**
 * Get all endpoint references. E.g.: a reference "Humanities Sector" means there's
 * an endpoint at the university's Humanities sector.
 * 
 * @param {object} fullGistObject JSON got from `services.gist.retrieveFullDataObject`.
 * @returns {Array} List of all references names.
 */
export function allEndpointsReferences(fullGistObject) {
  const references = [];
  fullGistObject.content.busEndpoints.forEach(busEndpoint => {
    references.push(busEndpoint.reference);
  });
  return references;
}
