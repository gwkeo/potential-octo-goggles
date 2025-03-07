package models

type Assignment struct {
	ID      int64   `json:"id"`
	UserID  int64   `json:"user_id"`
	Formula string  `json:"formula"`
	Grade   float64 `json:"grade"`
}
