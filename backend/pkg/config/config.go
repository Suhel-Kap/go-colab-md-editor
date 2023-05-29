package config

import (
	"database/sql"
	"log"
	"os"

	"github.com/Suhel-Kap/go-colab-md-editor/backend/pkg/internal/database"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

type ApiCfg struct {
	DB *database.Queries
}

func GetApiConfig() *ApiCfg {
	godotenv.Load()
	DB_URL := os.Getenv("DB_URL")

	conn, err := sql.Open("postgres", DB_URL)
	if err != nil {
		log.Panic("Could not connect to database: ", err.Error())
	}

	db := database.New(conn)

	return &ApiCfg{
		DB: db,
	}
}
