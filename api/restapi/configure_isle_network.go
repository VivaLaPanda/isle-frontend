// This file is safe to edit. Once it exists it will not be overwritten

package restapi

import (
	"crypto/tls"
	"net/http"

	errors "github.com/go-openapi/errors"
	runtime "github.com/go-openapi/runtime"
	middleware "github.com/go-openapi/runtime/middleware"
	graceful "github.com/tylerb/graceful"

	"github.com/VivaLaPanda/isle/api/restapi/operations"
	"github.com/VivaLaPanda/isle/api/restapi/operations/comments"
	"github.com/VivaLaPanda/isle/api/restapi/operations/posts"
	"github.com/VivaLaPanda/isle/api/restapi/operations/users"
)

//go:generate swagger generate server --target .. --name isle-network-api --spec ../swagger.json --principal VivaLaPanda

func configureFlags(api *operations.IsleNetworkAPI) {
	// api.CommandLineOptionsGroups = []swag.CommandLineOptionsGroup{ ... }
}

func configureAPI(api *operations.IsleNetworkAPI) http.Handler {
	// configure the api here
	api.ServeError = errors.ServeError

	// Set your custom logger if needed. Default one is log.Printf
	// Expected interface func(string, ...interface{})
	//
	// Example:
	// api.Logger = log.Printf

	api.JSONConsumer = runtime.JSONConsumer()

	api.JSONProducer = runtime.JSONProducer()

	api.ApplicationAuth = func(token string, scopes []string) (*VivaLaPanda, error) {
		return nil, errors.NotImplemented("oauth2 bearer auth (application) has not yet been implemented")
	}

	// Set your custom authorizer if needed. Default one is security.Authorized()
	// Expected interface runtime.Authorizer
	//
	// Example:
	// api.APIAuthorizer = security.Authorized()
	api.GetPingHandler = operations.GetPingHandlerFunc(func(params operations.GetPingParams) middleware.Responder {
		return middleware.NotImplemented("operation .GetPing has not yet been implemented")
	})
	api.CommentsGetCommentsHandler = comments.GetCommentsHandlerFunc(func(params comments.GetCommentsParams, principal *VivaLaPanda) middleware.Responder {
		return middleware.NotImplemented("operation comments.GetComments has not yet been implemented")
	})
	api.CommentsGetCommentsByIDHandler = comments.GetCommentsByIDHandlerFunc(func(params comments.GetCommentsByIDParams, principal *VivaLaPanda) middleware.Responder {
		return middleware.NotImplemented("operation comments.GetCommentsByID has not yet been implemented")
	})
	api.PostsGetPostByIDHandler = posts.GetPostByIDHandlerFunc(func(params posts.GetPostByIDParams, principal *VivaLaPanda) middleware.Responder {
		return middleware.NotImplemented("operation posts.GetPostByID has not yet been implemented")
	})
	api.PostsGetPostsHandler = posts.GetPostsHandlerFunc(func(params posts.GetPostsParams, principal *VivaLaPanda) middleware.Responder {
		return middleware.NotImplemented("operation posts.GetPosts has not yet been implemented")
	})
	api.UsersGetUserByIDHandler = users.GetUserByIDHandlerFunc(func(params users.GetUserByIDParams, principal *VivaLaPanda) middleware.Responder {
		return middleware.NotImplemented("operation users.GetUserByID has not yet been implemented")
	})
	api.UsersGetUsersHandler = users.GetUsersHandlerFunc(func(params users.GetUsersParams, principal *VivaLaPanda) middleware.Responder {
		return middleware.NotImplemented("operation users.GetUsers has not yet been implemented")
	})
	api.CommentsNewCommentHandler = comments.NewCommentHandlerFunc(func(params comments.NewCommentParams, principal *VivaLaPanda) middleware.Responder {
		return middleware.NotImplemented("operation comments.NewComment has not yet been implemented")
	})
	api.PostsNewPostHandler = posts.NewPostHandlerFunc(func(params posts.NewPostParams, principal *VivaLaPanda) middleware.Responder {
		return middleware.NotImplemented("operation posts.NewPost has not yet been implemented")
	})
	api.UsersNewUserHandler = users.NewUserHandlerFunc(func(params users.NewUserParams, principal *VivaLaPanda) middleware.Responder {
		return middleware.NotImplemented("operation users.NewUser has not yet been implemented")
	})
	api.CommentsUpdateCommentHandler = comments.UpdateCommentHandlerFunc(func(params comments.UpdateCommentParams, principal *VivaLaPanda) middleware.Responder {
		return middleware.NotImplemented("operation comments.UpdateComment has not yet been implemented")
	})
	api.PostsUpdatePostHandler = posts.UpdatePostHandlerFunc(func(params posts.UpdatePostParams, principal *VivaLaPanda) middleware.Responder {
		return middleware.NotImplemented("operation posts.UpdatePost has not yet been implemented")
	})
	api.UsersUpdateUserHandler = users.UpdateUserHandlerFunc(func(params users.UpdateUserParams, principal *VivaLaPanda) middleware.Responder {
		return middleware.NotImplemented("operation users.UpdateUser has not yet been implemented")
	})

	api.ServerShutdown = func() {}

	return setupGlobalMiddleware(api.Serve(setupMiddlewares))
}

// The TLS configuration before HTTPS server starts.
func configureTLS(tlsConfig *tls.Config) {
	// Make all necessary changes to the TLS configuration here.
}

// As soon as server is initialized but not run yet, this function will be called.
// If you need to modify a config, store server instance to stop it individually later, this is the place.
// This function can be called multiple times, depending on the number of serving schemes.
// scheme value will be set accordingly: "http", "https" or "unix"
func configureServer(s *graceful.Server, scheme, addr string) {
}

// The middleware configuration is for the handler executors. These do not apply to the swagger.json document.
// The middleware executes after routing but before authentication, binding and validation
func setupMiddlewares(handler http.Handler) http.Handler {
	return handler
}

// The middleware configuration happens before anything, this middleware also applies to serving the swagger.json document.
// So this is a good place to plug in a panic handling middleware, logging and metrics
func setupGlobalMiddleware(handler http.Handler) http.Handler {
	return handler
}
