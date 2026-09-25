// Components import their stylesheets for side effects only; the CSS is
// emitted by scripts/build-css.mjs and resolved by the consumer's bundler.
declare module '*.css';
