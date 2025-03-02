package handlers

import (
	"context"
	"github.com/gwkeo/potential-octo-goggles/internal/models"
	"net/http"
)

type AssignmentsAdder interface {
	Add(context.Context, *models.Assignment) (int64, error)
}

func NewApi(w http.ResponseWriter, r *http.Request) error {
	w.WriteHeader(http.StatusOK)
	return nil
}
