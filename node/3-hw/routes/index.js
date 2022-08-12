import users from './users.js';
import session from './sessions.js';
import welcome from './welcome.js';
import courses from './courses.js';
import comment from './comment.js';

const controllers = [
  welcome,
  users,
  session,
  courses,
  comment
];

export default (app) => controllers.forEach((f) => f(app));