package logger_mw

import (
	"github.com/go-chi/chi/v5/middleware"
	"go.uber.org/zap"
	"net/http"
	"time"
)

func New(log *zap.Logger) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		defer log.Sync()
		sugar := log.Sugar()
		sugar.Infow("logger middleware enabled", "component", "middlewares/logger")

		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			wrappedW := middleware.NewWrapResponseWriter(w, r.ProtoMinor)

			t := time.Now()

			defer func() {
				sugar.Infow("request completed",
					"component", "middlewares/logger",
					"method", r.Method,
					"path", r.URL.Path,
					"remote_addr", r.RemoteAddr,
					"user_agent", r.UserAgent(),
					"request_id", middleware.GetReqID(r.Context()),
					"status", wrappedW.Status(),
					"duration", time.Since(t))
			}()

			next.ServeHTTP(wrappedW, r)
		})
	}
}
