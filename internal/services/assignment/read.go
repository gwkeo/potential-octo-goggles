package assignment

import (
	"context"
	"errors"
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

func (s *AssignmentsService) Read(ctx context.Context, userID int64) ([]models.Assignment, error) {
	if userID < 0 {
		return nil, errors.New("UserID cannot be negative number")
	}

	return s.reader.UserAssignments(ctx, userID)
}
