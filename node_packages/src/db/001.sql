DROP TABLE IF EXISTS customer;
CREATE TABLE IF NOT EXISTS customer (id INTEGER PRIMARY KEY, name TEXT, contact TEXT);
INSERT INTO customer (id, name, contact) VALUES (1, 'Microsoft', 'Bill Gates'), (2, 'Apple', 'Steve Jobs');