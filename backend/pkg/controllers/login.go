package controllers

import (
	"net/http"

	"github.com/Suhel-Kap/go-colab-md-editor/backend/pkg/config"
	"github.com/Suhel-Kap/go-colab-md-editor/backend/pkg/models"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type LoginData struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func LoginController(c *gin.Context) {
	cfg := config.GetApiConfig()

	var loginData LoginData

	if err := c.ShouldBindJSON(&loginData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
	}

	user, err := cfg.DB.GetUserByEmail(c.Request.Context(), loginData.Email)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{
			"error": err.Error(),
		})
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginData.Password))
	if err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{
			"error": err.Error(),
		})
	}
	c.SetCookie("api_key", user.ApiKey, 30*24*60*60, "/", "", false, true)
	c.JSON(http.StatusAccepted, gin.H{
		"user": models.DbUserToUser(user),
	})
}
