import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.join(BASE_DIR, "..", "..", "example.db")
DATABASE_URL = os.getenv("DATABASE_URL", f"sqlite:///{ROOT_DIR}")
print(DATABASE_URL)
print(ROOT_DIR)
print(BASE_DIR)
