package models

type Assignment struct {
	ID      int64
	UserID  int64
	Formula string
	Grade   float64
}
