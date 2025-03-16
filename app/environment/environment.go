package environment

import (
	"github.com/joho/godotenv"
	"os"
)

type Env struct {
	User     string
	Password string
	DB       string
	Host     string
	Port     string
}

func MustLoad() *Env {
	if err := godotenv.Load(".env"); err != nil {
		panic(".environment file not found")
	}

	return &Env{
		User:     os.Getenv("POSTGRES_USER"),
		Password: os.Getenv("POSTGRES_PASSWORD"),
		DB:       os.Getenv("POSTGRES_DB"),
		Host:     os.Getenv("POSTGRES_HOST"),
		Port:     os.Getenv("POSTGRES_PORT"),
	}
}
