package handlers

import "github.com/gwkeo/potential-octo-goggles/internal/models"

type AssignmentsReader interface {
	ReadUserAssignments(int64) ([]models.Assignment, error)
}
