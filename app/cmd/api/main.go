package main

import (
	"context"
	"github.com/gwkeo/potential-octo-goggles/app/internal/http-server/chi"
	"github.com/gwkeo/potential-octo-goggles/app/internal/storage/assignments/postgres"
	"go.uber.org/zap"
	"os"
)

func main() {
	log, err := zap.NewProduction()
	if err != nil {
		panic(err)
	}

	connectionString := os.Getenv("CONNECTION_STRING")
	if connectionString == "" {
		log.Fatal("CONNECTION_STRING not specified")
	}

	mathURL := os.Getenv("MATH_SERVICE_URL")
	if mathURL == "" {
		log.Fatal("MATH_SERVICE_URL not specified")
	}

	ctx := context.TODO()

	assignmentsRepo, err := postgres.New(ctx, connectionString)
	if err != nil {
		log.Fatal(err.Error())
	}

	server := chi.New(assignmentsRepo, log, mathURL)
	if err = server.Start(); err != nil {
		log.Fatal(err.Error())
	}
}
