export class Schema {
  static get schemaQuery() {
    return `
          type: string @index(hash) .
          
          user.name: string @index(exact) .
          user.password: password .
          user.email: string @index(hash) .
          user.aviImgUri: string .
          user.reputation: int .
          user.spent: int .
          user.role: uid .
          user.invitedBy: uid .
          user.joined: dateTime .
          user.posted: uid @reverse @count .
          user.commented: uid @reverse @count .
          
          role.text: string @index(hash) .
          
          content.title: string @index(fulltext) .
          content.imageUri: string .
          content.body: string @index(fulltext) . 
          content.created: dateTime .
          content.tags: uid @reverse .
          content.score: int .
          content.sentiment: int .
          content.children: uid @reverse @count .
          
          tag.text: string @index(hash) .
          
          sellable.name: string .
          sellable.cost: int .
          
          invite.code: string @index(hash) .
          invite.createdBy: uid .`
  }
}