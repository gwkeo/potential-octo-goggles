package handler

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/gwkeo/potential-octo-goggles/app/internal/models"
	"github.com/gwkeo/potential-octo-goggles/app/internal/utils/message"
)

type Generator interface {
	Generate(ctx context.Context) (*models.Task, error)
}

type TasksController struct {
	generator Generator
	validator Validator
}

func NewTasksController(generator Generator, validator Validator) *TasksController {
	return &TasksController{
		generator: generator,
		validator: validator,
	}
}

func (c *TasksController) HandleGet(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	task, err := c.generator.Generate(ctx)
	if err != nil {
		http.Error(w, message.Wrap("error while generating", err), http.StatusInternalServerError)
		return
	}

	body, err := json.Marshal(task)
	if err != nil {
		http.Error(w, message.Wrap("error while marshaling response", err), http.StatusInternalServerError)
		return
	}

	w.Write(body)
	w.WriteHeader(http.StatusCreated)
}
