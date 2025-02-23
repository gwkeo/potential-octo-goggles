-- +goose Up
-- +goose StatementBegin
CREATE TABLE assignments IF NOT EXISTS (
    id INTEGER NOT NULL,
    user_id INTEGER
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE assignments;
-- +goose StatementEnd
