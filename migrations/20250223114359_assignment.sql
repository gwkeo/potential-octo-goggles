-- +goose Up
-- +goose StatementBegin
CREATE TABLE assignments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    formula VARCHAR(256),
    grade FLOAT
);
-- +goose StatementEnd
