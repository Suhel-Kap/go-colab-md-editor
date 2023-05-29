package main

import (
	"log"
	"os"

	"github.com/Suhel-Kap/go-colab-md-editor/backend/pkg/routes"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load("../../.env"); err != nil {
		log.Panic(err.Error())
	}
	PORT := os.Getenv("PORT")
	log.Println(PORT)
	log.Printf("Starting server on port %s\n", PORT)

	r := routes.SetupRouter()
	r.Run(PORT)
}
