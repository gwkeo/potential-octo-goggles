package models

import "time"

type Assignment struct {
	ID        int64      `json:"id"`
	UserID    int64      `json:"user_id"`
	Formula   string     `json:"formula"`
	Grade     float64    `json:"grade"`
	Attempts  int64      `json:"attempts"`
	TimeStart *time.Time `json:"time_start"`
	TimeEnd   *time.Time `json:"time_end"`
}
