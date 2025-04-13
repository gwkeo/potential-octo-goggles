package assignment

import (
	"context"
	"errors"
	"github.com/gwkeo/potential-octo-goggles/app/internal/models"
	"github.com/gwkeo/potential-octo-goggles/app/internal/storage/assignments"
)

type creator interface {
	Create(ctx context.Context, assignment *models.Assignment) (int64, error)
}

type updater interface {
	Update(ctx context.Context, assignment *models.Assignment) error
}

type assignmentGetter interface {
	AssignmentByFormula(ctx context.Context, id int64, formula string) (*models.Assignment, error)
}

type AddService struct {
	creator creator
	updater updater
	getter  assignmentGetter
}

func NewAddService(creator creator, updater updater, getter assignmentGetter) *AddService {
	return &AddService{
		creator: creator,
		updater: updater,
		getter:  getter,
	}
}

func (s *AddService) Add(ctx context.Context, assignment *models.Assignment, validationResult *models.ValidationResult) (int64, error) {
	if assignment.UserID < 0 {
		return 0, errors.New("UserID cannot be negative")
	}

	if !validationResult.OK {
		assignment.Grade = 0
	} else {
		assignment.Grade = 1
	}

	oldAssignment, err := s.getter.AssignmentByFormula(ctx, assignment.UserID, assignment.Formula)
	if err != nil {
		if errors.Is(err, assignments.AssignmentNotFound) {
			return s.creator.Create(ctx, assignment)
		}
		return 0, err
	}

	assignment.Attempts = oldAssignment.Attempts + 1
	assignment.ID = oldAssignment.ID

	return assignment.ID, s.updater.Update(ctx, assignment)
}
