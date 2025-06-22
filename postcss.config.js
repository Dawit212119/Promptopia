// postcss.config.js
module.exports = {
  plugins: [
    require("@tailwindcss/postcss"), // Use the new package
    require("autoprefixer"), // This is still needed
  ],
};
