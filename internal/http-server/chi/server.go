package chi

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/gwkeo/potential-octo-goggles/internal/http-server/chi/handlers"
	"github.com/gwkeo/potential-octo-goggles/internal/http-server/chi/middlewares/logger_mw"
	"github.com/gwkeo/potential-octo-goggles/internal/models"
	"github.com/gwkeo/potential-octo-goggles/internal/utils/logger"
	"net/http"
)

type storage interface {
	Create(assignment *models.Assignment) (int64, error)
	UserAssignments(userID int64) ([]models.Assignment, error)
}

type Server struct {
	router  chi.Router
	storage storage
	logger  *logger.Logger
}

func New(storage storage, logger *logger.Logger) *Server {
	return &Server{
		router:  chi.NewRouter(),
		storage: storage,
		logger:  logger,
	}
}

func (s *Server) Start() error {

	s.setRoutes()
	s.router.Method("GET", "/api", handlers.Handler(handlers.NewApi))

	if err := http.ListenAndServe(":", s.router); err != nil {
	}
}

func (s *Server) setRoutes() {
	s.router.Use(middleware.RequestID)
	s.router.Use(logger_mw.New(s.logger))
	s.router.Use(middleware.Recoverer)
	s.router.Use(middleware.URLFormat)
}
