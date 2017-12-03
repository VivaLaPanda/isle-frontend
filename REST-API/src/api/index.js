import {version} from '../../package.json';
import {Router} from 'express';
import content from './content'
import users from './users';

export default ({config, db}) => {
  let api = Router();

  // mount the content resource
  api.use('/content', content({config}));
  api.use('/users', users({config}));

  // perhaps expose some API metadata at the root
  api.get('/', (req, res) => {
    res.json({version});
  });

  return api;
}
