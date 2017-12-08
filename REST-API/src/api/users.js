import {Constants} from "../constants";
import resource from 'resource-router-middleware';
const rp = require('request-promise');

let reqOpts = {
  method: 'POST',
  uri: Constants.dbUrl + 'query',
};

export default ({config}) => resource({
    // /** GET / - List all entities */
    // index({params}, res) {
    //   const queryPost = `
    //     {
    //       var(func: anyoftext(content.title, "${params.query}"), first: ${params.first}, offset: ${params.offset}) {
    //           p as _uid_
    //       }
    //
    //       queryPosts(func: uid(p), orderasc: content.created) {
    //           ${basePost}
    //       }
    //     }`;
    //
    //   reqOpts.body = queryPost;
    //   return rp(reqOpts)
    //     .then((queryRes) => {
    //       res.status(200).json(queryRes.data);
    //     })
    // },

    /** POST / - Create a new top level post */
    create({body}, res) {
      const newUser =
        `mutation {
            set {
                _:newUser <user.name> "${body.name}" .
                _:newUser <user.password> "${body.password}" .
                _:newUser <user.email> "${body.email}" .
                _:newUser <user.invited_by> <${body.invited_by}> .
                _:newUser <user.joined> "${new Date()}" .
                _:newUser <user.reputation> 100 .
            }
        }`;

      reqOpts.body = newUser;
      return rp(reqOpts)
        .then((queryRes) => {
          if (queryRes.data === null) {
            console.error(queryRes.errors);
            res.status(500).json(queryRes.errors);

            return;
          }
          res.status(200).json(queryRes.data);
        })
    },

    /** GET /:id - Return a given entity */
    read({id}, res) {
      const getPostById =
        `{
          fetchUser(func: uid(${id})) {
            name: user.name@.
            email: user.email@.
            joined: user.joined
            reputation: user.reputation
            commented: user.commented {
                content.title@.
            }
            posted: user.posted {
                content.title@.
            }
          }  
        }`;

      reqOpts.body = getPostById;
      return rp(reqOpts)
        .then((queryRes) => {
          if (queryRes.data === null) {
            console.error(queryRes.errors);
            res.status(500).json(queryRes.errors);

            return;
          }
          res.status(200).json(queryRes.data);
        })
    }
    //
    // /** PUT /:id - Update a given entity */
    // update({facet, body}, res) {
    //   for (let key in body) {
    //     if (key !== 'id') {
    //       facet[key] = body[key];
    //     }
    //   }
    //   res.sendStatus(204);
    // },
    //
    // /** DELETE /:id - Delete a given entity */
    // delete({facet}, res) {
    //   facets.splice(facets.indexOf(facet), 1);
    //   res.sendStatus(204);
    // }
});
