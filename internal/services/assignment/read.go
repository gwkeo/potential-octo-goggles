package assignment

import "github.com/gwkeo/potential-octo-goggles/internal/models"

type storage interface {
	UserAssignments(userID int64) ([]models.Assignment, error)
}

type AssignmentsService struct {
	storage storage
}

func NewReadService(storage storage) *AssignmentsService {
	return &AssignmentsService{
		storage: storage,
	}
}

func (s *AssignmentsService) ReadUserAssignments(userID int64) ([]models.Assignment, error) {
	return s.storage.UserAssignments(userID)
}
