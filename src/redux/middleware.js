import { createLogger } from "redux-logger";

const logger = createLogger();

const middleware = [logger];

export default middleware;
