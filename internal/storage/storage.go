package storage

import (
	"database/sql"
	"errors"
	_ "github.com/lib/pq"
)

type AssignmentsRepoPostgres struct {
	db *sql.DB
}

func NewAssignmentsRepo(path string) (*AssignmentsRepoPostgres, error) {
	db, err := sql.Open("postgres", path)
	if err != nil {
		return nil, errors.New("unable to connect to sqlite")
	}

	return &AssignmentsRepoPostgres{db: db}, nil
}

func (r *AssignmentsRepoPostgres) Create(userID int) (int, error) {
	result, err := r.db.Exec("INSERT INTO assignments (user_id) VALUES ($1)", userID)
	if err != nil {
		return -1, err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return -1, err
	}

	return int(id), nil
}
