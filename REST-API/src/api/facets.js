import {Constants} from "../constants";
const rp = require('request-promise');

let reqOpts = {
  method: 'POST',
  uri: Constants.dbUrl() + 'query',
  json: true,
};

const makePost = function(body, res) {
  // Add the post
  let createPost = `
        mutation {
          set {
            _:newPost <content.title> "${body.title}" .
            _:newPost <content.imageUri> "${body.imageUri}" .
            _:newPost <content.body> "${body.body}" .
            _:newPost <content.created> "${new Date()}" .
            _:newPost <content.score> 0 .
            <${body.userId}> <user.commented> _:newPost .
          }
        }
      `;

  // TODO: Tags

  reqOpts.body = createPost;
  return rp(reqOpts)
    .then((queryRes) => {
      res.status(204).json(queryRes.data);
    })
};

const buildParentTree = function(parentTree, treeArr) {
  // Flatten the tree
  treeArr.push({
    sentiment: parentTree.sentiment,
    score: parentTree.score,
    poster: parentTree.poster
  });
  if (parentTree.parent) {
    parentTree = parentTree.parent;
    treeArr = buildParentTree(parentTree, treeArr)
  }

  return treeArr;
};

const makeComment = function(body, res) {

  // Get the user's current rep
  const fetchContentFrag = `
        uid: _uid_
        sentiment: content.sentiment
        score: content.score
        poster: ~user.commented {
          uid: _uid_
          rep: user.reputation
          parent: user.invitedBy {
            uid: _uid_ 
            rep: user.reputation
          }
        }`;

  // Depth 3 tree fetch
  const fetchContentTree = `
        {
          fetchContentTree(func: uid(${body.parentId})) {
            ${fetchContentFrag}
            parent: ~content.children {
              ${fetchContentFrag}
              parent: ~content.children {
                ${fetchContentFrag}
              }
            }
          }  
        }`;

  reqOpts.body = fetchContentTree;
  rp(reqOpts)
    .then((parentTree) => {
      let treeArr = [{sentiment: body.sentiment}];
      treeArr = buildParentTree(parentTree, treeArr);

      // Walk the flattened tree and calc reputation/score
      let workingSentiment = body.sentiment;
      treeArr = treeArr.map((post, idx) => {
        if (idx === 0) {return post}
        const delta = (workingSentiment/idx) * treeArr[idx-1].sentiment;
        workingSentiment = workingSentiment * treeArr[idx-1].sentiment;
        post.score = post.score + delta;
        post.poster.rep = post.poster.rep + delta;
        if (post.poster.parent) {
          post.poster.parent.rep = post.poster.parent.rep + (delta / 2);
        }

        return post;
      });

      // Add the post
      let createPost = `
            mutation {
              set {
                _:newPost <content.body> "${body.body}" .
                _:newPost <content.created> "${new Date()}" .
                _:newPost <content.score> 0 .
                <${body.userId}> <user.commented> _:newPost .
              }
            }
          `;

      // Put together the score/rep changes
      treeArr.slice(1).forEach((post) => {
        createPost = createPost.concat(`<${post.uid}> <content.score> ${post.score}`+'\n');
        createPost = createPost.concat(`<${post.poster.uid}> <user.reputation> ${post.poster.rep}`+'\n');
        if (post.poster.parent) {
          createPost = createPost.concat(`<${post.poster.parent.uid}> <user.reputation> ${post.poster.parent.rep}`+'\n');
        }
      });

      // TODO: Tags

      reqOpts.body = createPost;
      return rp(reqOpts);
    })
    .then((queryRes) => {
      res.status(204).json(queryRes.data);
    })
};

export default ({config}) => {
  return {

    /** GET / - List all entities */
    index({params}, res) {
      res.json(facets);
    },

    /** POST / - Create a new top level post */
    create({body}, res) {
      // IMPORTANT NOTE: for now posts and comments are treated mostly the same
      if (body.title) {
        makePost(body, res);
      } else {
        makeComment(body, res);
      }
    },

    /** GET /:id - Return a given entity */
    read({facet}, res) {
      res.json(facet);
    },

    /** PUT /:id - Update a given entity */
    update({facet, body}, res) {
      for (let key in body) {
        if (key !== 'id') {
          facet[key] = body[key];
        }
      }
      res.sendStatus(204);
    },

    /** DELETE /:id - Delete a given entity */
    delete({facet}, res) {
      facets.splice(facets.indexOf(facet), 1);
      res.sendStatus(204);
    }
  };
};
