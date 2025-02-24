package postgres

import (
	"database/sql"
	"errors"
	_ "github.com/lib/pq"
)

type Assignment struct {
	ID      int
	userID  int
	formula string
	grade   float64
}

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

func (r *AssignmentsRepoPostgres) Create(assignment Assignment) (int, error) {
	stmt, err := r.db.Prepare("INSERT INTO assignments (user_id, formula, grade) VALUES (?, ?, ?)")
	if err != nil {
		return -1, err
	}

	result, err := stmt.Exec(assignment.userID, assignment.formula, assignment.grade)
	if err != nil {
		return -1, err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return -1, err
	}

	return int(id), nil
}

func (r *AssignmentsRepoPostgres) UserAssignments(userID int) ([]Assignment, error) {
	stmt, err := r.db.Prepare("SELECT * FROM assignments WHERE user_id = ?")
	if err != nil {
		return nil, err
	}

	rows, err := stmt.Query(userID)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var assignments []Assignment
	for rows.Next() {
		var assignment Assignment
		if err = rows.Scan(&assignment.ID, &assignment.userID, &assignment.formula, &assignment.grade); err != nil {
			return nil, err
		}
		assignments = append(assignments, assignment)
	}

	return assignments, nil
}
