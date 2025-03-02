package handlers

import (
	"context"
	"github.com/gwkeo/potential-octo-goggles/internal/models"
)

type AssignmentsReader interface {
	ReadUserAssignments(context.Context, int64) ([]models.Assignment, error)
}
