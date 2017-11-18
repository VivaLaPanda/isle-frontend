export class Schema {
  static get schemaQuery() {
    return `{
        schema {
          # Used to differentiate between the below types
          type: string @index(hash) .
          
          # User
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
          
          # Role
          role.text: string @index(hash) .
          
          # Post/Comment
          content.title: string @index(fulltext) .
          content.imageUri: string .
          content.body: string @index(fulltext) . 
          content.created: dateTime .
          content.tags: uid @reverse .
          content.score: int .
          content.sentiment: int .
          content.children: uid @reverse @count .
          
          # Tag
          tag.text: string @index(hash) .
          
          # Purchasables
          sellable.name: string .
          sellable.cost: int .
          
          # Invites
          invite.code: string @index(hash) .
          invite.createdBy: uid .
        }
      }`
  }
}