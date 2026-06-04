// @ts-check

const noop = () => {};

/**
 * Devuelve la instancia de consola basada en el entorno.
 *
 * @type {Console | {log: () => void, error: () => void}}
 */
const logger =
  process.env.NODE_ENV === "test" ? { log: noop, error: noop } : console;

export { logger };
export default logger;
