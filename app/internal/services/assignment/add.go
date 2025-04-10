package assignment

import (
	"context"
	"errors"
	"github.com/gwkeo/potential-octo-goggles/app/internal/models"
)

type creator interface {
	Create(context.Context, *models.Assignment) (int64, error)
}

type AddService struct {
	creator creator
}

func NewAddService(creator creator) *AddService {
	return &AddService{creator: creator}
}

func (s *AddService) Add(ctx context.Context, assignment *models.Assignment) (int64, error) {
	if assignment.UserID < 0 {
		return 0, errors.New("UserID cannot be negative")
	}

	return s.creator.Create(ctx, assignment)
}
