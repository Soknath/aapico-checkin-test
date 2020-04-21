// const createBrowserHistory = require("history").createBrowserHistory;
// export default createBrowserHistory({});

import { createHashHistory } from "history";

const history = createHashHistory(); // or createBrowserHistory(); 
export default history;