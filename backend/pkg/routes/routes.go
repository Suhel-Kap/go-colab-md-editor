package routes

import (
	"github.com/Suhel-Kap/go-colab-md-editor/backend/pkg/controllers"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func getRouter() *gin.Engine {
	r := gin.Default()
	// Add CORS middleware
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowCredentials = true
	r.Use(cors.New(config))
	r.SetTrustedProxies([]string{"localhost"})
	return r
}

func SetupRouter() *gin.Engine {
	r := getRouter()

	// health check router
	r.GET("/healthz", controllers.HealthzController)
	r.POST("/register", controllers.RegisterController)
	r.POST("/login", controllers.LoginController)
	r.POST("/logout", controllers.LogoutController)

	protected := r.Group("/app")
	protected.Use(AuthMiddleware())
	{
		protected.GET("/check", controllers.HealthzController)
	}

	return r
}
