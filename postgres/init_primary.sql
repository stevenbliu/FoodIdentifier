-- Create a replication user
CREATE ROLE replication_user WITH REPLICATION LOGIN PASSWORD '{{DB_PASSWORD}}';
SELECT pg_create_physical_replication_slot('replication_slot');

CREATE USER "user" WITH PASSWORD '{{DB_PASSWORD}}';

-- Grant connection privileges to the replication user (if needed)
GRANT CONNECT ON DATABASE postgres TO replication_user;
GRANT CONNECT ON DATABASE postgres TO "user";

-- Modify necessary configuration parameters for replication
ALTER SYSTEM SET wal_level = 'replica';
ALTER SYSTEM SET max_wal_senders = 10;
ALTER SYSTEM SET wal_keep_size = '64MB';
ALTER SYSTEM SET max_replication_slots = 10;
ALTER SYSTEM SET hot_standby = on;

-- Reload PostgreSQL configuration to apply changes
SELECT pg_reload_conf();

