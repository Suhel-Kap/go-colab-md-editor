package routes

import (
	"github.com/Suhel-Kap/go-colab-md-editor/backend/pkg/controllers"
	"github.com/gin-gonic/gin"
)

func getRouter() *gin.Engine {
	r := gin.Default()
	r.SetTrustedProxies([]string{"localhost"})
	return r
}

func SetupRouter() *gin.Engine {
	r := getRouter()

	// health check router
	r.GET("/healthz", controllers.HealthzController)
	r.POST("/register", controllers.RegisterController)

	return r
}
