package controllers

import (
	"log"
	"net/http"
	"time"

	"github.com/Suhel-Kap/go-colab-md-editor/backend/pkg/config"
	"github.com/Suhel-Kap/go-colab-md-editor/backend/pkg/internal/database"
	"github.com/Suhel-Kap/go-colab-md-editor/backend/pkg/models"
	"github.com/Suhel-Kap/go-colab-md-editor/backend/pkg/utils"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type RegistrationData struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func RegisterController(c *gin.Context) {
	cfg := config.GetApiConfig()

	var registrationData RegistrationData

	if err := c.ShouldBindJSON(&registrationData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
	}

	if valid := utils.ValidateEmail(registrationData.Email); !valid {
		log.Printf("Invalid email %s", registrationData.Email)
		c.JSON(http.StatusNotAcceptable, gin.H{
			"error": "Invalid email",
		})
		return
	}

	hashedPw, err := bcrypt.GenerateFromPassword([]byte(registrationData.Password), bcrypt.DefaultCost)
	if err != nil {
		log.Fatalf("Error hashing password: %s", err)
	}
	user, err := cfg.DB.CreateUser(c.Request.Context(), database.CreateUserParams{
		ID:        uuid.New(),
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
		Username:  registrationData.Username,
		Email:     registrationData.Email,
		Password:  string(hashedPw),
	})

	if err != nil {
		log.Printf("Couldn't register user: %s", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.SetCookie("api_key", user.ApiKey, 30*24*60*60, "/", "", false, true)
	c.JSON(http.StatusAccepted, gin.H{
		"user": models.DbUserRowToUser(user),
	})
}
