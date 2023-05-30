package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func LogoutController(c *gin.Context) {
	c.SetCookie("api_key", "", 0, "/", "", false, true)
	c.JSON(http.StatusOK, gin.H{
		"message": "logged out",
	})
}
