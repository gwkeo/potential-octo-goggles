package models

type ValidationResult struct {
	OK           bool   `json:"ok"`
	AssignmentID int64  `json:"assignment_id"`
	Message      string `json:"message"`
}
