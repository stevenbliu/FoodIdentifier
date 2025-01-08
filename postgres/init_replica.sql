
-- Set the primary server connection details for replication
DO
$$
BEGIN
    -- Modify recovery configuration for replication
    IF NOT EXISTS (SELECT 1 FROM pg_settings WHERE name = 'primary_conninfo') THEN
        RAISE NOTICE 'Setting primary connection info';
        PERFORM pg_create_physical_replication_slot('replica_slot');
    END IF;
END
$$;

ALTER SYSTEM SET primary_conninfo = 'host=postgres_primary port=5432 user=replication_user password=replication_password';


-- Optional: Reload configuration to ensure everything is set correctly
SELECT pg_reload_conf();
