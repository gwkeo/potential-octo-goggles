-- +goose Up
-- +goose StatementBegin
CREATE TABLE IF NOT EXISTS assignments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    formula VARCHAR(256),
    grade FLOAT
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin

DROP TABLE assignments;
-- +goose StatementEnd