package math

import (
	"bytes"
	"context"
	"encoding/json"
	models2 "github.com/gwkeo/potential-octo-goggles/app/internal/models"
	"io"
	"net/http"
)

type Validator struct {
	baseUrl string
	c       *http.Client
}

func NewValidator(baseUrl string) *Validator {
	return &Validator{
		baseUrl: baseUrl,
		c:       &http.Client{},
	}
}

func (v *Validator) Validate(ctx context.Context, solution *models2.Solution) (*models2.ValidationResult, error) {
	body, err := json.Marshal(solution)
	if err != nil {
		return nil, err
	}

	request, err := http.NewRequestWithContext(ctx, http.MethodPost, "/validate", bytes.NewBuffer(body))
	if err != nil {
		return nil, err
	}

	response, err := v.c.Do(request)
	if err != nil {
		return nil, err
	}

	responseBody, err := io.ReadAll(response.Body)
	if err != nil {
		return nil, err
	}

	defer response.Body.Close()

	var validationResult *models2.ValidationResult
	if err = json.Unmarshal(responseBody, validationResult); err != nil {
		return nil, err
	}

	return validationResult, nil
}
