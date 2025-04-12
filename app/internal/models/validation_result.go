package models

type ValidationResult struct {
	OK      bool   `json:"OK"`
	Message string `json:"msg"`
}
