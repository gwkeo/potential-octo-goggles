package handlers

import (
	"github.com/gwkeo/potential-octo-goggles/internal/models"
	"net/http"
)

type AssignmentsAdder interface {
	Add(assignment *models.Assignment) (int64, error)
}

func NewApi(w http.ResponseWriter, r *http.Request) error {

	return nil
}
