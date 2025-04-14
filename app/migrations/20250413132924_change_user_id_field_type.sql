-- +goose Up
-- +goose StatementBegin
SELECT 'up SQL query';
ALTER TABLE assignments
ALTER COLUMN user_id TYPE BIGINT;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
-- +goose StatementEnd
