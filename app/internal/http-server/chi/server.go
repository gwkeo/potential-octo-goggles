package chi

import (
	"context"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/gwkeo/potential-octo-goggles/app/internal/http-server/chi/handler"
	"github.com/gwkeo/potential-octo-goggles/app/internal/http-server/chi/mw"
	"github.com/gwkeo/potential-octo-goggles/app/internal/models"
	"github.com/gwkeo/potential-octo-goggles/app/internal/services/assignment"
	"github.com/gwkeo/potential-octo-goggles/app/internal/services/math"
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

	generator := math.NewGenerator("/generate")
	validator := math.NewValidator("/validate")
	tasksController := handler.NewTasksController(generator, validator)

	s.setRoutes(assignmentsController, tasksController)

	if err := http.ListenAndServe("0.0.0.0:8080", s.router); err != nil {
		return err
	}
	return nil
}

func (s *Server) setRoutes(assignmentsController *handler.AssignmentsController, tasksController *handler.TasksController) {
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
