package handler

import (
	"context"
	"encoding/json"
	models2 "github.com/gwkeo/potential-octo-goggles/app/internal/models"
	"io"
	"net/http"
)

type Generator interface {
	Generate(ctx context.Context) (*models2.Task, error)
}

type Validator interface {
	Validate(ctx context.Context, solution *models2.Solution) (*models2.ValidationResult, error)
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
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	body, err := json.Marshal(task)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Write(body)
	w.WriteHeader(http.StatusCreated)
}

func (c *TasksController) HandlePost(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	requestBody, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer r.Body.Close()

	var solution *models2.Solution
	if err = json.Unmarshal(requestBody, solution); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	validationResult, err := c.validator.Validate(ctx, solution)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	responseBody, err := json.Marshal(validationResult)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Write(responseBody)
	w.WriteHeader(http.StatusOK)
}
