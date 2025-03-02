package assignment

import (
	"context"
	"github.com/gwkeo/potential-octo-goggles/internal/models"
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
	return s.creator.Create(ctx, assignment)
}
