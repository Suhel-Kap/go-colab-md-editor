package controllers

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func HealthzController(c *gin.Context) {
	log.Println("Healthz router received request")
	c.JSON(http.StatusOK, gin.H{
		"status": "ok",
	})
}
