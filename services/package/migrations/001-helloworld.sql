-- Up
CREATE TABLE notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT,
    ownerId INTEGER REFERENCES users(id),
    title TEXT
);

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT,
    username TEXT
);

INSERT INTO users (name, username) values ('bruno', 'bruno_antunes');
INSERT INTO users (name, username) values ('jack', 'jack_antunes');

INSERT INTO notes (description, title, ownerId) values('This is note 1', 'Note 1', 1);
INSERT INTO notes (description, title, ownerId) values('This is note 2', 'Note 2', 1);
INSERT INTO notes (description, title, ownerId) values('This is note 3', 'Note 3', 2);

-- Down
DROP TABLE notes;
DROP TABLE users;
