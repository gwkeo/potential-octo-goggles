package logger_mw

import (
	"github.com/go-chi/chi/v5/middleware"
	"github.com/gwkeo/potential-octo-goggles/internal/utils/logger"
	"net/http"
	"time"
)

func New(log *logger.Logger) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		component := map[string]interface{}{
			"component": "middlewares/logger",
		}
		(*log).Info("logger middlewares enabled", component)

		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			request := map[string]interface{}{
				"method":      r.Method,
				"path":        r.URL.Path,
				"remote_addr": r.RemoteAddr,
				"user_agent":  r.UserAgent(),
				"request_id":  middleware.GetReqID(r.Context()),
			}

			wrappedW := middleware.NewWrapResponseWriter(w, r.ProtoMinor)

			t := time.Now()

			defer func() {
				completed := map[string]interface{}{
					"status":   wrappedW.Status(),
					"bytes":    wrappedW.BytesWritten(),
					"duration": time.Since(t),
				}
				(*log).Info("request completed", component, request, completed)
			}()

			next.ServeHTTP(wrappedW, r)
		})
	}
}
