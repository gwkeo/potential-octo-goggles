package chi

import (
	"context"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/gwkeo/potential-octo-goggles/app/internal/http-server/chi/handler"
	"github.com/gwkeo/potential-octo-goggles/app/internal/http-server/chi/mw"
	"github.com/gwkeo/potential-octo-goggles/app/internal/models"
	"github.com/gwkeo/potential-octo-goggles/app/internal/services/assignment"
	"github.com/gwkeo/potential-octo-goggles/app/internal/services/math"
	"go.uber.org/zap"
)

type storage interface {
	Create(context.Context, *models.Assignment) (int64, error)
	UserAssignments(context.Context, int64) ([]models.Assignment, error)
}

type Server struct {
	router  chi.Router
	storage storage
	logger  *zap.Logger
	mathURL string
}

func New(storage storage, logger *zap.Logger, mathURL string) *Server {
	return &Server{
		router:  chi.NewRouter(),
		storage: storage,
		logger:  logger,
		mathURL: mathURL,
	}
}

func (s *Server) Start() error {

	adder := assignment.NewAddService(s.storage)
	reader := assignment.NewReadService(s.storage)
	assignmentsController := handler.NewController(adder, reader)

	generator := math.NewGenerator(s.mathURL)
	validator := math.NewValidator(s.mathURL)
	tasksController := handler.NewTasksController(generator, validator)

	s.setRoutes(assignmentsController, tasksController)

	if err := http.ListenAndServe("0.0.0.0:8080", s.router); err != nil {
		return err
	}
	return nil
}

func (s *Server) setRoutes(assignmentsController *handler.AssignmentsController, tasksController *handler.TasksController) {
	s.router.Use(middleware.RequestID)
	s.router.Use(mw.NewLoggerMiddleWare(s.logger))
	s.router.Use(middleware.Recoverer)
	s.router.Use(middleware.URLFormat)
	s.router.Use(mw.NewCORSMiddleWare())

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
