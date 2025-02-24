package postgres

import (
	"database/sql"
	"errors"
	"github.com/gwkeo/potential-octo-goggles/internal/models"
)

type Storage struct {
	db *sql.DB
}

func New(path string) (*Storage, error) {
	db, err := sql.Open("postgres", path)
	if err != nil {
		return nil, errors.New("unable to connect to postgres")
	}

	return &Storage{db: db}, nil
}

func (s *Storage) Create(assignment *models.Assignment) (int64, error) {
	stmt, err := s.db.Prepare("INSERT INTO assignments (user_id, formula, grade) VALUES (?, ?, ?)")
	if err != nil {
		return -1, err
	}

	result, err := stmt.Exec(assignment.UserID, assignment.Formula, assignment.Grade)
	if err != nil {
		return -1, err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return -1, err
	}

	return id, nil
}

func (s *Storage) UserAssignments(userID int64) ([]models.Assignment, error) {
	stmt, err := s.db.Prepare("SELECT * FROM assignments WHERE user_id = ?")
	if err != nil {
		return nil, err
	}

	rows, err := stmt.Query(userID)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var result []models.Assignment
	for rows.Next() {
		var assignment models.Assignment
		if err = rows.Scan(&assignment.ID, &assignment.UserID, &assignment.Formula, &assignment.Grade); err != nil {
			return nil, err
		}
		result = append(result, assignment)
	}

	return result, nil
}
