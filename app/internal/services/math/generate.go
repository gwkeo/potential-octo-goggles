package math

import (
	"context"
	"encoding/json"
	"io"
	"net/http"

	"github.com/gwkeo/potential-octo-goggles/app/internal/models"
)

type Generator struct {
	baseUrl string
	c       *http.Client
}

func NewGenerator(baseUrl string) *Generator {
	return &Generator{
		baseUrl: baseUrl + "/generate",
		c:       &http.Client{},
	}
}

func (g *Generator) Generate(ctx context.Context) (*models.Task, error) {

	request, err := http.NewRequestWithContext(ctx, http.MethodGet, g.baseUrl, nil)
	if err != nil {
		return nil, err
	}

	response, err := g.c.Do(request)
	if err != nil {
		return nil, err
	}

	respBody, err := io.ReadAll(response.Body)
	if err != nil {
		return nil, err
	}
	defer response.Body.Close()

	var task *models.Task
	if err = json.Unmarshal(respBody, &task); err != nil {
		return task, err
	}

	return task, nil
}
