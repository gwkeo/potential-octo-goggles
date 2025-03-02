package chi_server

import (
	"context"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/gwkeo/potential-octo-goggles/internal/http-server/chi-server/handlers"
	"github.com/gwkeo/potential-octo-goggles/internal/http-server/chi-server/middlewares/logger_mw"
	"github.com/gwkeo/potential-octo-goggles/internal/models"
	"go.uber.org/zap"
	"net/http"
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

	s.setRoutes()
	s.router.Method("GET", "/api", handlers.Handler(handlers.NewApi))

	if err := http.ListenAndServe("localhost:8080", s.router); err != nil {
		return err
	}
	return nil
}

func (s *Server) setRoutes() {
	s.router.Use(middleware.RequestID)
	s.router.Use(logger_mw.New(s.logger))
	s.router.Use(middleware.Recoverer)
	s.router.Use(middleware.URLFormat)
}
