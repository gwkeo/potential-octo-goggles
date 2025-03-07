package chi_server

import (
	"context"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/gwkeo/potential-octo-goggles/internal/http-server/chi-server/handler"
	"github.com/gwkeo/potential-octo-goggles/internal/http-server/chi-server/mw"
	"github.com/gwkeo/potential-octo-goggles/internal/models"
	"github.com/gwkeo/potential-octo-goggles/internal/services/assignment"
	"go.uber.org/zap"
	"net/http"
	"time"
)

type storage interface {
	Create(context.Context, *models.Assignment) (int64, error)
	UserAssignments(context.Context, int64) ([]models.Assignment, error)
}

type Server struct {
	router  chi.Router
	storage storage
	logger  *zap.Logger
}

func New(storage storage, logger *zap.Logger) *Server {
	return &Server{
		router:  chi.NewRouter(),
		storage: storage,
		logger:  logger,
	}
}

func (s *Server) Start() error {

	adder := assignment.NewAddService(s.storage)
	reader := assignment.NewReadService(s.storage)
	assignmentsController := handler.NewController(adder, reader)

	s.setRoutes(assignmentsController)

	if err := http.ListenAndServe("localhost:8080", s.router); err != nil {
		return err
	}
	return nil
}

func (s *Server) setRoutes(controller *handler.AssignmentsController) {
	s.router.Use(middleware.RequestID)
	s.router.Use(mw.New(s.logger))
	s.router.Use(middleware.Recoverer)
	s.router.Use(middleware.URLFormat)

	s.router.Use(middleware.Timeout(60 * time.Second))

	s.router.Route("/assignments", func(r chi.Router) {
		r.Get("/", controller.HandleGet)
		r.Post("/", controller.HandlePost)
	})
}
