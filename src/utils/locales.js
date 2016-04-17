export default (locale) => {
  const Landing = require(`../containers/Landing/locale.${locale}.json`);

  return {
    ...Landing
  };
};
