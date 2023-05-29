-- +goose Up

CREATE TABLE users (
    id UUID PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    api_key VARCHAR(255) UNIQUE NOT NULL DEFAULT (
        encode(sha256(random()::text::bytea), 'hex')
    )
);

-- +goose Down

DROP TABLE users;