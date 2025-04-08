package math

import (
	"bytes"
	"context"
	"encoding/json"
	"io"
	"net/http"

	"github.com/gwkeo/potential-octo-goggles/app/internal/models"
)

type Validator struct {
	baseUrl string
	c       *http.Client
}

func NewValidator(baseUrl string) *Validator {
	return &Validator{
		baseUrl: baseUrl + "/validate",
		c:       &http.Client{},
	}
}

func (v *Validator) Validate(ctx context.Context, solution *models.Solution) (*models.ValidationResult, error) {
	body, err := json.Marshal(solution)
	if err != nil {
		return nil, err
	}

	request, err := http.NewRequestWithContext(ctx, http.MethodPost, v.baseUrl, bytes.NewBuffer(body))
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

	var validationResult *models.ValidationResult
	if err = json.Unmarshal(responseBody, &validationResult); err != nil {
		return nil, err
	}

	return validationResult, nil
}
