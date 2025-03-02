package assignment

import (
	"context"
	"github.com/gwkeo/potential-octo-goggles/internal/models"
)

type reader interface {
	UserAssignments(context.Context, int64) ([]models.Assignment, error)
}

type AssignmentsService struct {
	reader reader
}

func NewReadService(reader reader) *AssignmentsService {
	return &AssignmentsService{
		reader: reader,
	}
}

func (s *AssignmentsService) ReadUserAssignments(ctx context.Context, userID int64) ([]models.Assignment, error) {
	return s.reader.UserAssignments(ctx, userID)
}
