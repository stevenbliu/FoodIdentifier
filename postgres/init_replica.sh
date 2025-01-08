#!/bin/bash

# Wait for the primary server to become available
echo "Waiting for primary server..."
until pg_isready -h "$POSTGRES_MASTER_HOST" -p "$POSTGRES_PRIMARY_PORT" -U "$POSTGRES_REPLICATION_USER"; do
  echo "Primary server is not ready yet. Retrying..."
  sleep 2
done

# echo "Primary server is available."

# # Ensure PostgreSQL is stopped before copying the data
# # echo "Stopping the replica server to safely copy data..."
# pg_ctl stop -D /var/lib/postgresql/data || true  # This will stop the PostgreSQL service if it's running.

# # Clear the data directory on the replica
rm -rf /var/lib/postgresql/data/*

# # Use pg_basebackup to copy data from the primary server
echo "Copying data from the primary server..."
pg_basebackup -h "$POSTGRES_MASTER_HOST" -U "$POSTGRES_REPLICATION_USER" -D /var/lib/postgresql/data -Ft -z -P

# # Set the primary connection info
# echo "Setting primary_conninfo in postgresql.conf..."
echo "primary_conninfo = 'host=$POSTGRES_MASTER_HOST port=5432 user=$POSTGRES_REPLICATION_USER password=$POSTGRES_REPLICATION_PASSWORD'" >> /var/lib/postgresql/data/postgresql.conf

# # # Create the 'standby.signal' file to mark this as a replica
# # echo "Creating standby.signal to mark this as a replica..."
touch /var/lib/postgresql/data/standby.signal

# # # Ensure the replica is in read-only mode by adding this to the configuration
# # echo "Setting replica to read-only..."
# # echo "default_transaction_read_only = on" >> /var/lib/postgresql/data/postgresql.auto.conf

# # # Ensure proper permissions for the data directory
# chown -R postgres:postgres /var/lib/postgresql/data

# # # Restart the replica server
# echo "Starting the replica server..."
# pg_ctl start -D /var/lib/postgresql/data

# echo "Replica setup complete."
