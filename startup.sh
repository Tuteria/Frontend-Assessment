#!/bin/bash

# APP Database URL
export DATABASE_URL=postgresql://test_db:test_db@localhost:5529/app_test_db

# Test Database
export TEST_DATABASE_URL=postgresql://test_db:test_db@localhost:5529/test_db_dev

# Frontend URL
export FRONTEND_URL=http://localhost:3000