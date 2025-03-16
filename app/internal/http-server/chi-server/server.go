package chi_server

import (
	"context"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	handler2 "github.com/gwkeo/potential-octo-goggles/app/internal/http-server/chi-server/handler"
	"github.com/gwkeo/potential-octo-goggles/app/internal/http-server/chi-server/mw"
	"github.com/gwkeo/potential-octo-goggles/app/internal/models"
	assignment2 "github.com/gwkeo/potential-octo-goggles/app/internal/services/assignment"
	math2 "github.com/gwkeo/potential-octo-goggles/app/internal/services/math"
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

	adder := assignment2.NewAddService(s.storage)
	reader := assignment2.NewReadService(s.storage)
	assignmentsController := handler2.NewController(adder, reader)

	generator := math2.NewGenerator("/generate")
	validator := math2.NewValidator("/validate")
	tasksController := handler2.NewTasksController(generator, validator)

	s.setRoutes(assignmentsController, tasksController)

	if err := http.ListenAndServe("localhost:8080", s.router); err != nil {
		return err
	}
	return nil
}

func (s *Server) setRoutes(assignmentsController *handler2.AssignmentsController, tasksController *handler2.TasksController) {
	s.router.Use(middleware.RequestID)
	s.router.Use(mw.New(s.logger))
	s.router.Use(middleware.Recoverer)
	s.router.Use(middleware.URLFormat)

	s.router.Use(middleware.Timeout(60 * time.Second))

	s.router.Route("/assignments", func(r chi.Router) {
		r.Get("/", assignmentsController.HandleGet)
		r.Post("/", assignmentsController.HandlePost)
	})

	s.router.Route("/math", func(r chi.Router) {
		r.Get("/task", tasksController.HandleGet)
		r.Post("/task", tasksController.HandlePost)
	})
}
