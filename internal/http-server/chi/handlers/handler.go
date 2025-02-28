package handlers

import "net/http"

type Handler func(writer http.ResponseWriter, request *http.Request) error

func (h Handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if err := h(w, r); err != nil {
		w.WriteHeader(http.StatusServiceUnavailable)
		w.Write([]byte("bad"))
	}
}
