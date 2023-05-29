-- name: CreateUser :one

INSERT INTO users
    (
    id,
    username,
    email,
    password,
    created_at,
    updated_at,
    api_key
    )
VALUES
    (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        encode(sha256(random()
::text::bytea), 'hex')
) RETURNING id,
    username,
    email,
    created_at,
    updated_at,
    api_key
;