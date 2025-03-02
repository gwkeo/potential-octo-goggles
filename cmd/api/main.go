package main

import (
	"context"
	"github.com/gwkeo/potential-octo-goggles/env"
	"github.com/gwkeo/potential-octo-goggles/internal/http-server/chi-server"
	"github.com/gwkeo/potential-octo-goggles/internal/storage/assignments/postgres"
	"go.uber.org/zap"
)

func main() {
	env := env.MustLoad()

	ctx := context.TODO()

	log, err := zap.NewProduction()
	if err != nil {
		panic(err)
	}

	assignmentsRepo, err := postgres.New(ctx, env.Host, env.Port, env.DB, env.User, env.Password)
	if err != nil {
		log.Fatal(err.Error())
	}

	server := chi_server.New(assignmentsRepo, log)
	if err = server.Start(); err != nil {
		log.Fatal(err.Error())
	}
}
