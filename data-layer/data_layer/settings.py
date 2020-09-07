import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.join(BASE_DIR, "..", "..", "example.db")
DATABASE_URL = os.getenv("DATABASE_URL", f"sqlite:///{ROOT_DIR}")
# DATABASE_URL = os.getenv("DATABASE_URL", f"postgresql://test_db:test_db@localhost:5432/test_db")
print(DATABASE_URL)
