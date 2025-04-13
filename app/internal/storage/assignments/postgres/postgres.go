package postgres

import (
	"context"
	"database/sql"
	"errors"
	"github.com/gwkeo/potential-octo-goggles/app/internal/models"
	"github.com/gwkeo/potential-octo-goggles/app/internal/storage/assignments"
	"github.com/jackc/pgx/v5"
)

// Storage служит для подключения к БД
type Storage struct {
	db *pgx.Conn
}

func New(ctx context.Context, connectionString string) (*Storage, error) {
	db, err := pgx.Connect(ctx, connectionString)
	if err != nil {
		return nil, errors.New("unable to connect to postgres" + err.Error())
	}

	return &Storage{db: db}, nil
}

// Create создает новый assignment
func (s *Storage) Create(ctx context.Context, assignments *models.Assignment) (int64, error) {
	id := 0
	err := s.db.QueryRow(ctx,
		"INSERT INTO assignments (user_id, formula, grade, time_start, time_end) "+
			"VALUES ($1, $2, $3, $4, $5) "+
			"RETURNING id",
		assignments.UserID,
		assignments.Formula,
		assignments.Grade,
		assignments.TimeStart,
		assignments.TimeEnd).Scan(&id)
	if err != nil {
		return 0, err
	}

	return int64(id), nil
}

func (s *Storage) UserAssignments(ctx context.Context, userID int64) ([]models.Assignment, error) {
	rows, err := s.db.Query(ctx, "SELECT * FROM assignments WHERE user_id = $1", userID)
	if err != nil {
		return nil, err
	}

	var result []models.Assignment
	for rows.Next() {
		var a models.Assignment
		if err = rows.Scan(&a.ID, &a.UserID, &a.Formula, &a.Grade, &a.Attempts, &a.TimeStart, &a.TimeEnd); err != nil {
			return result, err
		}
		result = append(result, a)
	}
	if err = rows.Err(); err != nil {
		return result, err
	}

	return result, nil
}

func (s *Storage) AssignmentByFormula(ctx context.Context, userID int64, formula string) (*models.Assignment, error) {
	var a models.Assignment
	err := s.db.QueryRow(ctx, "SELECT * FROM assignments WHERE user_id = $1 AND formula = $2", userID, formula).Scan(&a.ID, &a.UserID, &a.Formula, &a.Grade, &a.Attempts, &a.TimeStart, &a.TimeEnd)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, assignments.AssignmentNotFound
		}
		return nil, err
	}

	return &a, nil
}

func (s *Storage) Update(ctx context.Context, assignment *models.Assignment) error {
	rows, err := s.db.Query(ctx, "UPDATE assignments SET attempts = $1, grade = $2 WHERE id = $3", assignment.Attempts, assignment.Grade, assignment.ID)
	defer rows.Close()
	return err
}
