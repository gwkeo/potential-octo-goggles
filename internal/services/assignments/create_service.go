package assignments

import "github.com/gwkeo/potential-octo-goggles/internal/models"

type Creator interface {
	Create(*models.Assignment) (int64, error)
}

type CreateService struct {
	creator Creator
}

func NewCreateService(creator Creator) *CreateService {
	return &CreateService{
		creator: creator,
	}
}
