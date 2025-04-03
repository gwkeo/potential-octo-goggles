package models

type ValidationResult struct {
	OK      bool   `json:"ok"`
	Message string `json:"message"`
}
