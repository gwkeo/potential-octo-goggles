-- +goose Up
-- +goose StatementBegin
CREATE TABLE assignments (
    id INTEGER NOT NULL PRIMARY KEY,
    user_id INTEGER,
    formula VARCHAR(256),
    grade FLOAT
);
-- +goose StatementEnd
