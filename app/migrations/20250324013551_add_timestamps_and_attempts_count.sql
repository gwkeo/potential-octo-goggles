-- +goose Up
-- +goose StatementBegin
SELECT 'up SQL query';
ALTER TABLE assignments
    ADD COLUMN attempts INTEGER DEFAULT 0,
    ADD COLUMN time_start TIMESTAMP,
    ADD COLUMN time_end TIMESTAMP;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
ALTER TABLE assignments
    ALTER COLUMN attempts DROP DEFAULT,
    ALTER COLUMN time_start DROP DEFAULT,
    ALTER COLUMN time_end DROP DEFAULT;
-- +goose StatementEnd
