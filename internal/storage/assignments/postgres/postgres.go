package postgres

import (
	"context"
	"errors"
	"fmt"
	"github.com/gwkeo/potential-octo-goggles/internal/models"
	"github.com/jackc/pgx/v5"
)

type Storage struct {
	db *pgx.Conn
}

func New(ctx context.Context, host, port, name, user, password string) (*Storage, error) {
	connStr := fmt.Sprintf("postgres://%v:%v@%v:%v/%v", user, password, host, port, name)
	db, err := pgx.Connect(ctx, connStr)
	if err != nil {
		return nil, errors.New("unable to connect to postgres" + err.Error())
	}

	return &Storage{db: db}, nil
}

func (s *Storage) Create(ctx context.Context, assignments *models.Assignment) (int64, error) {
	var id int64
	err := s.db.QueryRow(ctx, "INSERT INTO assignments (user_id, formula, grade) VALUES ($1, $2, $3)", assignments.UserID, assignments.Formula, assignments.Grade).Scan(&id)
	if err != nil {
		return 0, err
	}

	return id, nil
}

func (s *Storage) UserAssignments(ctx context.Context, id int64) ([]models.Assignment, error) {
	rows, err := s.db.Query(ctx, "SELECT FROM assignments WHERE id = $1", id)
	if err != nil {
		return nil, err
	}

	var assignments []models.Assignment
	for rows.Next() {
		var a models.Assignment
		if err = rows.Scan(a.ID, a.UserID, a.Formula, a.Grade); err != nil {
			return assignments, err
		}
		assignments = append(assignments, a)
	}
	if err = rows.Err(); err != nil {
		return assignments, err
	}

	return assignments, nil
}
