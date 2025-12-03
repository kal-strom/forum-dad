CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    date_created DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_profile (
    user_id INTEGER PRIMARY KEY,
    bio TEXT,
    location_name TEXT,
    profile_avatar_url TEXT,
    last_login DATETIME,
    date_created DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS threads (
    thread_id INTEGER PRIMARY KEY,
    user_id INT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    date_created DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS posts (
    post_id INTEGER PRIMARY KEY,
    user_id INT NOT NULL,
    thread_id INT NOT NULL,
    content TEXT NOT NULL,
    date_created DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (thread_id) REFERENCES threads (thread_id) ON DELETE CASCADE
);
