package handler

import (
	"context"
	"encoding/json"
	"io"
	"net/http"

	"github.com/gwkeo/potential-octo-goggles/app/internal/models"
	"github.com/gwkeo/potential-octo-goggles/app/internal/utils/message"
)

type Generator interface {
	Generate(ctx context.Context) (*models.Task, error)
}

type Validator interface {
	Validate(ctx context.Context, solution *models.Solution) (*models.ValidationResult, error)
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

func (c *TasksController) HandlePost(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	requestBody, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, message.Wrap("error while reading from body", err), http.StatusInternalServerError)
		return
	}
	defer r.Body.Close()

	var solution *models.Solution
	if err = json.Unmarshal(requestBody, &solution); err != nil {
		http.Error(w, message.Wrap("error while parsing body", err), http.StatusInternalServerError)
		return
	}

	validationResult, err := c.validator.Validate(ctx, solution)
	if err != nil {
		http.Error(w, message.Wrap("error while validating", err), http.StatusBadRequest)
		return
	}

	responseBody, err := json.Marshal(&validationResult)
	if err != nil {
		http.Error(w, message.Wrap("error while marshaling json response", err), http.StatusInternalServerError)
		return
	}

	w.Write(responseBody)
	w.WriteHeader(http.StatusOK)
}
